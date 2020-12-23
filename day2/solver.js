const fs = require ('fs');

let inputArr = fs.readFileSync('day2/input.txt').toString().split('\n');
inputArr = inputArr.map(el => el.split(' '));
console.log('inputArr:', inputArr);

let cleanArr = [];

// Split each string into an array: [range-bottom, range-top, letter, password]
for (el of inputArr) {
  let cleanedEl = el[0].split('-').map(num => Number(num));
  cleanedEl.push(el[1][0]);
  cleanedEl.push(el[2]);
  cleanArr.push(cleanedEl);
}

let solution = 0;

function calc1 (arr) {
  arr.forEach(el => {
    const letter = new RegExp(el[2], 'g');
    // Count the number of matching letters in the password
    let numLetter = 0;
    if (el[3].match(letter)) numLetter = el[3].match(letter).length;
    if (numLetter >= el[0] && numLetter <= el[1]) {
      console.log(el[3], ' matches');
      solution++;
    }
  });
}

function calc2 (arr) {
  arr.forEach(el => {
    const letter = el[2];
    const first = el[3][el[0] - 1];
    const second = el[3][el[1] - 1]
    if ((first === letter || second === letter) && (first != second)) {
      solution++;
    }
  });
}

console.log('calc2(cleanArr):', calc2(cleanArr));

console.log('solution:', solution);