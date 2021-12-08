const fs = require ('fs');

let inputArr = fs.readFileSync('day5/input.txt').toString().split('\n');
// console.log('inputArr:', inputArr);

const numRows = 128;
const numSeats = 8;

function calc (str, min = 0, max, step = 0) {
  // console.log('min, max, step, str[step]:', min, max, step, str[step]);
  const newMin = min;
  const newMax = max;
  const maxOfBottomHalf = newMin + Math.floor((newMax - newMin) / 2);
  const minOfTopHalf = maxOfBottomHalf + 1;
  // console.log('newMin, newMax, maxOfBottomHalf, minOfTopHalf:', newMin, newMax, maxOfBottomHalf, minOfTopHalf);

  if (step === str.length - 1) {
    return (str[step] === 'F' || str[step] === 'L') ? min : max;
  }
  if (str[step] === 'F' || str[step] === 'L') {
    step++;
    return calc(str, newMin, maxOfBottomHalf, step);
  } else {
    step++;
    return calc(str, minOfTopHalf, newMax, step);
  }
}

function solver1 (arr) {
  let res = 0;
  arr.forEach (str => {
    const row = calc(str.slice(0, 7), 0, numRows - 1);
    const seat = calc(str.slice(-3), 0, numSeats - 1);
    const id = row * 8 + seat;
    res = Math.max(res, id);
  });
  return res;
}

function solver2 (arr) {
  let ids = [];
  arr.forEach (str => {
    const row = calc(str.slice(0, 7), 0, numRows - 1);
    const seat = calc(str.slice(-3), 0, numSeats - 1);
    const id = row * 8 + seat;
    ids.push(id);
  });
  ids.sort((a, b) => a - b);
  for (i = ids[0]; i < ids[ids.length - 1]; i++) {
    if (i != ids[i - ids[0]]) return i;
  }
  console.log('ids:', ids);
}

// console.log('calc(inputArr):', solver1(inputArr));
console.log('calc(inputArr):', solver2(inputArr));