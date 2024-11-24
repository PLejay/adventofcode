"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const inputString = utils_1.readFile("2015", "day3").toString();
const solver = () => {
    const initialCoordinates = "0-0";
    const visitedCoordinates = new Set([initialCoordinates]);
    return {
        numVisitedHouses: visitedCoordinates.size,
    };
};
console.log(solver());
//# sourceMappingURL=solver.js.map