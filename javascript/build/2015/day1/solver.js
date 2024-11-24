"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputString = utils_1.readFile("2015", "day1").toString();
const solver = () => {
    let floor = 0;
    let positionOfBasementChar = 0;
    inputString.split("").forEach((char, i) => {
        const increment = char === "(" ? 1 : -1;
        floor += increment;
        if (floor === -1 && positionOfBasementChar === 0)
            positionOfBasementChar = i + 1;
    });
    return { floor, positionOfBasementChar };
};
console.log(solver());
//# sourceMappingURL=solver.js.map