"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputDimensionsArr = utils_1.readFile("2015", "day2")
    .toString()
    .split("\n")
    .map(row => row
    .split("x")
    .map(x => Number(x))
    .sort((a, b) => (a > b ? 1 : -1)));
const solver = () => {
    let squareFeetSum = 0;
    let ribbonLengthSum = 0;
    inputDimensionsArr.forEach(dimensions => {
        const [length, width, height] = dimensions;
        let localSquareFeetSum = 0;
        const smallestArea = length * width;
        const wrappedRibbonLength = length * 2 + width * 2;
        const bowLength = length * width * height;
        ribbonLengthSum += wrappedRibbonLength + bowLength;
        [
            [length, width],
            [length, height],
            [width, height],
        ].forEach(surfaceDimensions => {
            const surfaceArea = surfaceDimensions[0] * surfaceDimensions[1];
            localSquareFeetSum += 2 * surfaceArea;
        });
        squareFeetSum += localSquareFeetSum + smallestArea;
    });
    return { squareFeetSum, ribbonLengthSum };
};
console.log(solver());
//# sourceMappingURL=solver.js.map