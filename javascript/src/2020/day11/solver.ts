import * as fs from 'fs';

const inputArr: string[][] = fs
  .readFileSync('src/day11/input.txt')
  .toString()
  .split('\n')
  .map((x) => x.replace(/L/g,'#').split(''));

console.log('inputArr:', inputArr.map(x => x.join('')+'\n'));
const numRows = inputArr.length;
const numCols = inputArr[0].length;

function solver1 (layoutArr: string[][]): number {
  let stable = false;
  let newState = [...layoutArr];
  while (!stable) {
    const stateAfterChanged = applyRules(newState);
    if (stateAfterChanged === true) {
      stable = true;
    } else {
      newState = [...stateAfterChanged];
      // console.log('newState:', newState.map(x => x.join('')+'\n'));
    }
  }

  // Count the number of occupied seats
  let solution = 0;
  newState.forEach(row => {
    row.forEach(space => {
      if (space === '#') solution++;
    });
  });
  return solution;
}

function applyRules (layoutArr: string[][]): string[][] | true {
  let stable = true;
  // Make deep copy of the original array
  let newLayout:string[][] = [];
  layoutArr.forEach(x => newLayout.push(x.join('').split('')));

  // Go through the new layout and apply the rules on each seat
  for (let rowI = 0; rowI < numRows; rowI++) {
    for (let colI = 0; colI < numCols; colI++) {
      let space = layoutArr[rowI][colI];
      if (space === '.') continue;
      let occupiedNum = 0;
      // Check adjacent seats and count the number of occupied seats
      // Using Math.max/min to take care of edge cases (seat on the first/last row/column)
      for (let i = Math.max(0, rowI - 1); i < Math.min(numRows, rowI + 2); i++) {
        for (let j = Math.max(0, colI - 1); j < Math.min(numCols, colI + 2); j++) {
          // console.log('rowI, colI, i, j, layoutArr[i][j]:', rowI, colI, i, j, layoutArr[i][j]);
          if (layoutArr[i][j] === '#') occupiedNum++;
        }
      }
      if (space === 'L' && occupiedNum === 0) {
        newLayout[rowI][colI] = '#';
        stable = false;
      } else if (space === '#' && occupiedNum >= 5) { // 5 and not 4 to include the seat itself
        newLayout[rowI][colI] = 'L';
        stable = false;
      }
    }
  }
  if (stable) return stable;
  return newLayout;
}

console.log('solver1(inputArr):', solver1(inputArr));