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
    .readFileSync('src/day9/input.txt')
    .toString()
    .split('\n')
    .map((x) => Number(x));
const preambleSize = 25;
function solver1(arr) {
    const previousNums = arr.slice(0, preambleSize);
    for (let i = preambleSize; i < arr.length; i++) {
        const num = arr[i];
        if (!isValidSum(previousNums, num)) {
            return num;
        }
        previousNums.push(num);
        previousNums.shift();
    }
    return 1;
}
function solver2(arr) {
    const invalidNum = solver1(arr);
    for (let i = 0; i < arr.length - 1; i++) {
        let sum = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            sum += arr[j];
            if (sum === invalidNum) {
                const nums = arr.slice(i, j).sort();
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
    for (let i = 0; i < previousNums.length - 1; i++) {
        for (let j = i + 1; j < previousNums.length; j++) {
            if (previousNums[i] + previousNums[j] === num)
                return true;
        }
    }
    return false;
}
console.log(solver1(inputArr));
console.log(solver2(inputArr));
//# sourceMappingURL=solver.js.map