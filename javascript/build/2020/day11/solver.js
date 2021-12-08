"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const inputArr = fs
    .readFileSync('src/day11/input.txt')
    .toString()
    .split('\n')
    .map((x) => x.replace(/L/g, '#').split(''));
console.log('inputArr:', inputArr.map(x => x.join('') + '\n'));
const numRows = inputArr.length;
const numCols = inputArr[0].length;
function solver1(layoutArr) {
    let stable = false;
    let newState = [...layoutArr];
    while (!stable) {
        const stateAfterChanged = applyRules(newState);
        if (stateAfterChanged === true) {
            stable = true;
        }
        else {
            newState = [...stateAfterChanged];
            // console.log('newState:', newState.map(x => x.join('')+'\n'));
        }
    }
    // Count the number of occupied seats
    let solution = 0;
    newState.forEach(row => {
        row.forEach(space => {
            if (space === '#')
                solution++;
        });
    });
    return solution;
}
function applyRules(layoutArr) {
    let stable = true;
    // Make deep copy of the original array
    let newLayout = [];
    layoutArr.forEach(x => newLayout.push(x.join('').split('')));
    // Go through the new layout and apply the rules on each seat
    for (let rowI = 0; rowI < numRows; rowI++) {
        for (let colI = 0; colI < numCols; colI++) {
            let space = layoutArr[rowI][colI];
            if (space === '.')
                continue;
            let occupiedNum = 0;
            // Check adjacent seats and count the number of occupied seats
            // Using Math.max/min to take care of edge cases (seat on the first/last row/column)
            for (let i = Math.max(0, rowI - 1); i < Math.min(numRows, rowI + 2); i++) {
                for (let j = Math.max(0, colI - 1); j < Math.min(numCols, colI + 2); j++) {
                    // console.log('rowI, colI, i, j, layoutArr[i][j]:', rowI, colI, i, j, layoutArr[i][j]);
                    if (layoutArr[i][j] === '#')
                        occupiedNum++;
                }
            }
            if (space === 'L' && occupiedNum === 0) {
                newLayout[rowI][colI] = '#';
                stable = false;
            }
            else if (space === '#' && occupiedNum >= 5) { // 5 and not 4 to include the seat itself
                newLayout[rowI][colI] = 'L';
                stable = false;
            }
        }
    }
    if (stable)
        return stable;
    return newLayout;
}
console.log('solver1(inputArr):', solver1(inputArr));
//# sourceMappingURL=solver.js.map