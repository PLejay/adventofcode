"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = (0, utils_1.readFile)("2021", "day1")
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