import { readFile } from "../../utils/utils";

const inputArr: number[] = readFile("2021", "day1")
  .toString()
  .split("\n")
  .map(x => Number(x));

const solver1 = (measurements: number[]): number => {
  let depthIncreasesNum = 0;

  for (let i = 0; i < measurements.length - 1; i++) {
    if (measurements[i] < measurements[i + 1]) depthIncreasesNum++;
  }

  return depthIncreasesNum;
};

const solver2 = (measurements: number[]): number => {
  let sumsLargerThanPrevious = 0;

  for (let i = 0; i < measurements.length - 3; i++) {
    const sum1 = measurements[i] + measurements[i + 1] + measurements[i + 2];
    const sum2 =
      measurements[i + 1] + measurements[i + 2] + measurements[i + 3];
    if (sum2 > sum1) sumsLargerThanPrevious++;
  }

  return sumsLargerThanPrevious;
};

console.log(solver1(inputArr));
console.log(solver2(inputArr));
