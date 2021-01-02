"use strict";
exports.__esModule = true;
var fs = require("fs");
var inputArr = fs
    .readFileSync('src/day9/input.txt')
    .toString()
    .split('\n')
    .map(function (x) { return Number(x); });
var preambleSize = 25;
function solver1(arr) {
    var previousNums = arr.slice(0, preambleSize);
    for (var i = preambleSize; i < arr.length; i++) {
        var num = arr[i];
        if (!isValidSum(previousNums, num)) {
            return num;
        }
        previousNums.push(num);
        previousNums.shift();
    }
    return 1;
}
function solver2(arr) {
    var invalidNum = solver1(arr);
    for (var i = 0; i < arr.length - 1; i++) {
        var sum = arr[i];
        for (var j = i + 1; j < arr.length; j++) {
            sum += arr[j];
            if (sum === invalidNum) {
                var nums = arr.slice(i, j).sort();
                return nums[0] + nums[nums.length - 1];
            }
            else if (sum > invalidNum) {
                break;
            }
        }
    }
    return 1;
}
function isValidSum(previousNums, num) {
    for (var i = 0; i < previousNums.length - 1; i++) {
        for (var j = i + 1; j < previousNums.length; j++) {
            if (previousNums[i] + previousNums[j] === num)
                return true;
        }
    }
    return false;
}
console.log(solver1(inputArr));
console.log(solver2(inputArr));
