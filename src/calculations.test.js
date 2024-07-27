import {
  calculatePerformanceRating,
  getRequiredTotalRating,
} from "./calculations.js";


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
  {
    opponents: [
      { round: 1, rating: 2441, result: "loss" },
      { round: 2, rating: 2381, result: "loss" },
      { round: 3, rating: 2409, result: "win" },
      { round: 4, rating: 2313, result: "draw" },
      { round: 5, rating: 2357, result: "draw" },
      { round: 6, rating: 2314, result: "win" },
      { round: 7, rating: 2410, result: "win" },
      { round: 8, rating: 2515, result: "draw" },
    ],
    performanceRating: 2436,
  },
  {
    opponents: [
      { round: 1, rating: 2180, result: "loss" },
      { round: 2, rating: 2185, result: "loss" },
    ],
    performanceRating: 1383,
  },
  {
    opponents: [
      { round: 1, rating: 2277, result: "win" },
      { round: 2, rating: 2180, result: "draw" },
      { round: 3, rating: 2322, result: "win" },
      { round: 4, rating: 2185, result: "draw" },
      { round: 5, rating: 2308, result: "loss" },
      { round: 6, rating: 1864, result: "win" },
      { round: 7, rating: 2388, result: "draw" },
    ],
    performanceRating: 2320,
  },
])(
  "performanceRatingNoRaising: [$opponents, $performanceRating]",
  ({ opponents, performanceRating }) => {
    expect(Math.round(calculatePerformanceRating(opponents))).toBe(
      performanceRating
    );
  }
);
