const fs = require ('fs');

let inputArr = fs.readFileSync('day3/input.txt').toString().split('\n');
// console.log('inputArr:', inputArr);

const height = inputArr.length;
const width = inputArr[0].length;

function calc (rightSlope, downSlope) {
  let numTrees = 0;
  let verPos = downSlope; // Vertical position
  let horPos = rightSlope; // Horizontal position

  while (verPos < height) {
    if (inputArr[verPos][horPos] === '#') numTrees++;
    horPos += rightSlope;
    // Repeat the horizontal pattern by making the index loop back around
    if (horPos >= width) horPos = horPos - width;
    verPos+= downSlope;
  }
  console.log('rightSlope, downSlope, numTrees:', rightSlope, downSlope, numTrees);
  return numTrees;
}

let res = calc(1,1)*calc(3,1)*calc(5,1)*calc(7,1)*calc(1,2);

// console.log('calc(3, 1):', calc(3, 1));
console.log('res:', res);