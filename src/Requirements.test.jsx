import { roundUpToHalfPoint } from "./Requirements";

test.each([
  {input: 0, output: 0},
  {input: 3.49, output: 3.5},
  {input: 6.51, output: 7},
  {input: -1.49, output: -1},
  {input: -1.51, output: -1.5},
])("round up to half: [$input, $output]", ({input, output}) => {
  expect(roundUpToHalfPoint(input)).toBe(output);
});
