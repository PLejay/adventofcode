import * as fs from "fs";

const inputArr: number[] = fs
  .readFileSync("src/day10/input.txt")
  .toString()
  .split("\n")
  .map(x => Number(x))
  .sort((a, b) => a - b);

function solver1(arr: number[]): number {
  let currentJolt = 0;
  let numOf1Diff = 0;
  let numOf3Diff = 1;
  arr.forEach(num => {
    if (num - currentJolt === 1) numOf1Diff++;
    if (num - currentJolt === 3) numOf3Diff++;
    currentJolt = num;
  });
  return numOf1Diff * numOf3Diff;
}

function solver2(inputArr: number[]): number {
  // Break the input array into multiple subarrays to improve efficiency
  // The numbers are split wherever there is a difference of 3 between numbers
  // (only one possible path)
  const subArrays = splitBy3(inputArr);
  console.log("inputArr:", inputArr);

  let solution = 1;
  for (const subArray of subArrays) {
    solution *= solveEachArray(subArray);
    console.log(
      "subArray, solveEachArray(subArray):",
      subArray,
      solveEachArray(subArray)
    );
  }

  return solution;
}

function splitBy3(arr: number[]): number[][] {
  let startIndex = 0;
  const splitArr = [];
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i + 1] - arr[i] === 3) {
      splitArr.push(arr.slice(startIndex, i + 1));
      startIndex = i + 1;
    }
  }
  splitArr.push(arr.slice(startIndex));
  return splitArr;
}

function solveEachArray(subArray: number[]): number {
  if (subArray.length < 3) return 1; // only one possible path for arrays of length 1 or 2
  let validSolutions = 0;
  const maxNum = subArray[subArray.length - 1]; //final number of the input list
  const minNum = subArray[0];

  // Recursively simulate valid solutions by adding values to an array from the initial input
  // until it can no longer accept values (next number too more than 3 above the latest one)
  // or until it reaches the final number of the initial input
  function looper(
    arr: number[],
    newArr: number[],
    nextIndex: number
  ): number | undefined {
    // console.log('looper launched! newArr, nextIndex:', newArr, nextIndex);
    const lastNum = newArr[newArr.length - 1];
    // The new array represents a valid solution if its last value is the same as the final number of the input list
    if (lastNum === maxNum) {
      validSolutions++;
      // console.log('reached the end!');
      return 0;
    }
    for (let i = 0; i < 3; i++) {
      if (nextIndex + i < arr.length && arr[nextIndex + i] - lastNum <= 3) {
        const nextArr = [...newArr];
        // console.log('nextArr before the push:', nextArr, i);
        nextArr.push(arr[nextIndex + i]);
        // console.log('nextArr after the push:', nextArr, i);
        looper(arr, nextArr, nextIndex + i + 1);
      }
    }
  }

  looper(subArray, [Math.max(minNum - 3, 0)], 0);

  return validSolutions;
}

// console.log(solver1(inputArr));
console.log(solver2(inputArr));
