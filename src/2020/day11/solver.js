"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var inputArr = fs
    .readFileSync('src/day11/input.txt')
    .toString()
    .split('\n')
    .map(function (x) { return x.replace(/L/g, '#').split(''); });
console.log('inputArr:', inputArr.map(function (x) { return x.join('') + '\n'; }));
var numRows = inputArr.length;
var numCols = inputArr[0].length;
function solver1(layoutArr) {
    var stable = false;
    var newState = __spreadArray([], layoutArr, true);
    while (!stable) {
        var stateAfterChanged = applyRules(newState);
        if (stateAfterChanged === true) {
            stable = true;
        }
        else {
            newState = __spreadArray([], stateAfterChanged, true);
            // console.log('newState:', newState.map(x => x.join('')+'\n'));
        }
    }
    // Count the number of occupied seats
    var solution = 0;
    newState.forEach(function (row) {
        row.forEach(function (space) {
            if (space === '#')
                solution++;
        });
    });
    return solution;
}
function applyRules(layoutArr) {
    var stable = true;
    // Make deep copy of the original array
    var newLayout = [];
    layoutArr.forEach(function (x) { return newLayout.push(x.join('').split('')); });
    // Go through the new layout and apply the rules on each seat
    for (var rowI = 0; rowI < numRows; rowI++) {
        for (var colI = 0; colI < numCols; colI++) {
            var space = layoutArr[rowI][colI];
            if (space === '.')
                continue;
            var occupiedNum = 0;
            // Check adjacent seats and count the number of occupied seats
            // Using Math.max/min to take care of edge cases (seat on the first/last row/column)
            for (var i = Math.max(0, rowI - 1); i < Math.min(numRows, rowI + 2); i++) {
                for (var j = Math.max(0, colI - 1); j < Math.min(numCols, colI + 2); j++) {
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
