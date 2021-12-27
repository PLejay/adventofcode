import { readFile } from "../../utils/utils";

type Outcome = {
  position: number;
  fuelCost: number;
};

const inputArr: number[] = readFile("2021", "day7")
  .toString()
  .split(",")
  .map(x => Number(x));

console.log(inputArr);

const solver = (
  initialPositions: number[],
  increasingCosts = false
): number => {
  const minPosition = Math.min(...initialPositions);
  const maxPosition = Math.max(...initialPositions);

  let outcomes = new Array(maxPosition).fill(0);

  for (let i = minPosition; i <= maxPosition; i++) {
    let cost = 0;
    initialPositions.forEach(pos => {
      let distance = Math.abs(pos - i);
      if (increasingCosts) {
        // See https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
        cost += (distance * (distance + 1)) / 2;
      } else {
        cost += distance;
      }
    });

    outcomes[i] = cost;
  }

  console.log(outcomes);
  return Math.min(...outcomes);
};

console.log(solver(inputArr));
console.log(solver(inputArr, true));
