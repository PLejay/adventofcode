import { readFile } from "../../utils/utils";
import bigInt from "big-integer";

type AgeCounter = {
  age: number;
  number: number;
};

const inputArr: number[] = readFile("2021", "day6")
  .toString()
  .split(",")
  .map(x => Number(x));

console.log(inputArr.length);

const solver = (ages: number[], numDays: number) => {
  const loop = (currentAges: number[], currentDay: number): number => {
    if (currentDay === numDays) return currentAges.length;

    let newFishNum = bigInt(0);
    currentAges.forEach((age, i) => {
      if (age === 0) newFishNum = newFishNum.add(1);
      currentAges[i] = age > 0 ? age - 1 : 6;
    });
    for (let i = 0; i < newFishNum.toJSNumber(); i++) {
      currentAges.push(8);
    }

    return loop(currentAges, currentDay + 1);
  };

  const maxAge = Math.max(...ages);

  let initialAgeDistribution = new Array(maxAge + 1).fill(0);

  // Get the number of fish for each initial age
  initialAgeDistribution.forEach((age, i) => {
    initialAgeDistribution[i] = ages.filter(a => a === i).length;
  });

  let sumOfFish = bigInt(0);

  // Run the loop for each initial age and multiply by the number of fish of that initial age
  // initialAgeDistribution.forEach((fishNum, i) => {
  //   if (fishNum > 0) {
  //     sumOfFish = sumOfFish + BigInt(loop([i], 0) * fishNum);
  //   }
  // });

  console.log(`loop[1]: ${loop([1], 0)}`);
  return sumOfFish;
};

console.log(solver(inputArr, 80));
console.log(solver(inputArr, 256));
