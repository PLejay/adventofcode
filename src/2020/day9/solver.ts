import * as fs from 'fs';

const inputArr: number[] = fs
  .readFileSync('src/day9/input.txt')
  .toString()
  .split('\n')
  .map((x) => Number(x));

const preambleSize = 25;

function solver1 (arr: number[]): number {
  const previousNums: number[] = arr.slice(0, preambleSize);
  for (let i = preambleSize; i < arr.length; i++) {
    const num = arr[i];
    if (!isValidSum(previousNums, num)) {
      return num;
    }
    previousNums.push(num);
    previousNums.shift();
  }
  return 1;
}

function solver2 (arr: number[]): number {
  const invalidNum = solver1(arr);
  for (let i = 0; i < arr.length - 1; i++) {
    let sum = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      sum += arr[j];
      if (sum === invalidNum) {
        const nums = arr.slice(i, j).sort();
        return nums[0] + nums[nums.length - 1];
      } else if (sum > invalidNum) {
        break;
      }
    }
  }
  return 1;
}

function isValidSum (previousNums: number[],num: number): boolean {
  for (let i = 0; i < previousNums.length - 1; i++) {
    for (let j = i + 1; j < previousNums.length; j++) {
      if (previousNums[i] + previousNums[j] === num) return true;
    }
  }
  return false;
}

console.log(solver1(inputArr));
console.log(solver2(inputArr));
