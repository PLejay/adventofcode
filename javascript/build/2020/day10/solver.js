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
    .readFileSync("src/day10/input.txt")
    .toString()
    .split("\n")
    .map(x => Number(x))
    .sort((a, b) => a - b);
function solver1(arr) {
    let currentJolt = 0;
    let numOf1Diff = 0;
    let numOf3Diff = 1;
    arr.forEach(num => {
        if (num - currentJolt === 1)
            numOf1Diff++;
        if (num - currentJolt === 3)
            numOf3Diff++;
        currentJolt = num;
    });
    return numOf1Diff * numOf3Diff;
}
function solver2(inputArr) {
    // Break the input array into multiple subarrays to improve efficiency
    // The numbers are split wherever there is a difference of 3 between numbers
    // (only one possible path)
    const subArrays = splitBy3(inputArr);
    console.log("inputArr:", inputArr);
    let solution = 1;
    for (const subArray of subArrays) {
        solution *= solveEachArray(subArray);
        console.log("subArray, solveEachArray(subArray):", subArray, solveEachArray(subArray));
    }
    return solution;
}
function splitBy3(arr) {
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
function solveEachArray(subArray) {
    if (subArray.length < 3)
        return 1; // only one possible path for arrays of length 1 or 2
    let validSolutions = 0;
    const maxNum = subArray[subArray.length - 1]; //final number of the input list
    const minNum = subArray[0];
    // Recursively simulate valid solutions by adding values to an array from the initial input
    // until it can no longer accept values (next number too more than 3 above the latest one)
    // or until it reaches the final number of the initial input
    function looper(arr, newArr, nextIndex) {
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
//# sourceMappingURL=solver.js.map