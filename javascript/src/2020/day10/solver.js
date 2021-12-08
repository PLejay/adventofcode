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
    .readFileSync('src/day10/input.txt')
    .toString()
    .split('\n')
    .map(function (x) { return Number(x); })
    .sort(function (a, b) { return a - b; });
function solver1(arr) {
    var currentJolt = 0;
    var numOf1Diff = 0;
    var numOf3Diff = 1;
    arr.forEach(function (num) {
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
    var subArrays = splitBy3(inputArr);
    console.log('inputArr:', inputArr);
    var solution = 1;
    for (var _i = 0, subArrays_1 = subArrays; _i < subArrays_1.length; _i++) {
        var subArray = subArrays_1[_i];
        solution *= solveEachArray(subArray);
        console.log('subArray, solveEachArray(subArray):', subArray, solveEachArray(subArray));
    }
    return solution;
}
function splitBy3(arr) {
    var startIndex = 0;
    var splitArr = [];
    for (var i = 0; i < arr.length - 2; i++) {
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
    var validSolutions = 0;
    var maxNum = subArray[subArray.length - 1]; //final number of the input list
    var minNum = subArray[0];
    // Recursively simulate valid solutions by adding values to an array from the initial input
    // until it can no longer accept values (next number too more than 3 above the latest one)
    // or until it reaches the final number of the initial input
    function looper(arr, newArr, nextIndex) {
        // console.log('looper launched! newArr, nextIndex:', newArr, nextIndex);
        var lastNum = newArr[newArr.length - 1];
        // The new array represents a valid solution if its last value is the same as the final number of the input list
        if (lastNum === maxNum) {
            validSolutions++;
            // console.log('reached the end!');
            return 0;
        }
        for (var i = 0; i < 3; i++) {
            if (nextIndex + i < arr.length && arr[nextIndex + i] - lastNum <= 3) {
                var nextArr = __spreadArray([], newArr, true);
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
