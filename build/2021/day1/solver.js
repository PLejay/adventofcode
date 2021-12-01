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
const path = __importStar(require("path"));
const inputArr = fs
    .readFileSync(path.resolve(__dirname, "../../../src/2021/day1/input.txt"))
    .toString()
    .split("\n")
    .map(x => Number(x));
const solver1 = (measurements) => {
    let depthIncreasesNum = 0;
    for (let i = 0; i < measurements.length - 1; i++) {
        if (measurements[i] < measurements[i + 1])
            depthIncreasesNum++;
    }
    return depthIncreasesNum;
};
const solver2 = (measurements) => {
    let sumsLargerThanPrevious = 0;
    for (let i = 0; i < measurements.length - 3; i++) {
        const sum1 = measurements[i] + measurements[i + 1] + measurements[i + 2];
        const sum2 = measurements[i + 1] + measurements[i + 2] + measurements[i + 3];
        if (sum2 > sum1)
            sumsLargerThanPrevious++;
    }
    return sumsLargerThanPrevious;
};
console.log(solver1(inputArr));
console.log(solver2(inputArr));
//# sourceMappingURL=solver.js.map