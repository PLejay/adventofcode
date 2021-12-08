const fs = require ('fs');

let inputArr = fs.readFileSync('day1/input.txt').toString().split('\n');
inputArr = inputArr.map(num => Number(num));

function calc (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j; k < arr.length; k++) {
        if (arr[i] + arr[j]+ arr[k] === 2020) return arr[i] * arr[j] * arr[k];
      }
    }
  }
}

console.log(calc(inputArr));