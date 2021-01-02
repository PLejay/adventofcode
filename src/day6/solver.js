const fs = require ('fs');

let inputArr = fs.readFileSync('day6/input.txt').toString().split('\n');
let cleanArr = [];
let groupSizes = [];

function cleanData1 (arr) {
  let group = new Set();
  arr.forEach (str => {
    if (str === '') {
      // console.log('group:', group.values());
      const values = [...group]
      cleanArr.push(values);
      group.clear();
    } else {
      for (let c of str) {
        group.add(c);
      }
    }
  });
  const values = [...group]
  cleanArr.push(values);
}

function calc1 (arr) {
  return arr.reduce((a, b) => a + b.length, 0);
}

function cleanData2 (arr) {
  let questions = {};
  let groupSize = 0;
  arr.forEach (str => {
    if (str === '') {
      cleanArr.push(questions);
      questions = {};
      groupSizes.push(groupSize);
      groupSize = 0;
    } else {
      groupSize++;
      for (let c of str) {
        if (!questions[c]) questions[c] = 1;
        else questions[c]++;
      }
    }
  });
  cleanArr.push(questions);
  groupSizes.push(groupSize);
}

function calc2 (arr) {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let ans in arr[i]) {
      if (arr[i][ans] === groupSizes[i]) {
        res++;
        // console.log('res, arr[i], ans, arr[i][ans]:', res, arr[i], ans, arr[i][ans]);
      }
    }
  }
  return res;
}

cleanData2(inputArr);
// console.log('cleanArr:', cleanArr);
console.log('groupSizes:', groupSizes);
console.log('calc2(cleanArr):', calc2(cleanArr));
