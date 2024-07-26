import {
  roundUpToHalfPoint,
  getRequiredTotalRating,
  getMinRequiredScore,
  getLowestRating,
} from "./Requirements";

test.each([
  { input: 0, output: 0 },
  { input: 3.49, output: 3.5 },
  { input: 6.51, output: 7 },
  { input: -1.49, output: -1 },
  { input: -1.51, output: -1.5 },
])("round up to half: [$input]", ({ input, output }) => {
  expect(roundUpToHalfPoint(input)).toBe(output);
});

test.each([
  // dp @ .5 = 0, 2599.5 * 9 = 23395.5
  { nRounds: 9, score: 4.5, normType: "GM", output: 23395.5 },
  // Check if it outputs the minimum required average rating.
  { nRounds: 7, score: 7, normType: "IM", output: 15606.5 },
  // dp @ .75 = 193, (2399.5 - 193) * 8 = 17652
  { nRounds: 8, score: 6, normType: "WGM", output: 17652 },
  // dp @ .4 = -72, (2249.5 + 72) * 10 = 23215
  { nRounds: 10, score: 4, normType: "WIM", output: 23215 },
])(
  "requiredTotalRating: [$nRounds, $score, $normType]",
  ({ nRounds, score, normType, output }) => {
    expect(getRequiredTotalRating(nRounds, score, normType)).toBe(output);
  }
);

test.each([
  { nRounds: 10, requiredScore: 3.5 },
  { nRounds: 9, requiredScore: 3.5 },
  { nRounds: 13, requiredScore: 5 },
])("calculateMinRequiredScore: [$nRounds]", ({ nRounds, requiredScore }) => {
  expect(getMinRequiredScore(nRounds)).toBe(requiredScore);
});

test.each([
  { opponents: [{ rating: 2500 }, { rating: 2400 }], lowest: 2400 },
  { opponents: [{ rating: 2400 }, { rating: 2500 }], lowest: 2400 },
  { opponents: [{ rating: 2500 }, {}], lowest: 2500 },
  { opponents: [{}, {}], lowest: null },
  { opponents: [], lowest: null },
])("lowestRating: [$opponents]", ({ opponents, lowest }) => {
  expect(getLowestRating(opponents)).toBe(lowest);
});
