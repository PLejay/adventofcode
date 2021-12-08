"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = (0, utils_1.readFile)("2021", "day2")
    .toString()
    .split("\n")
    .map(x => {
    const split = x.split(" ");
    return {
        direction: split[0],
        distance: Number(split[1]),
    };
});
const solver1 = (instructions) => {
    let position = { horizontalPos: 0, depth: 0 };
    instructions.forEach(inst => {
        switch (inst.direction) {
            case "forward":
                position.horizontalPos += inst.distance;
                break;
            case "up":
                position.depth -= inst.distance;
                break;
            case "down":
                position.depth += inst.distance;
        }
    });
    return position.horizontalPos * position.depth;
};
const solver2 = (instructions) => {
    let position = { horizontalPos: 0, depth: 0, aim: 0 };
    instructions.forEach(inst => {
        switch (inst.direction) {
            case "forward":
                position.horizontalPos += inst.distance;
                position.depth += inst.distance * position.aim;
                break;
            case "up":
                position.aim -= inst.distance;
                break;
            case "down":
                position.aim += inst.distance;
        }
    });
    return position.horizontalPos * position.depth;
};
console.log(solver1(inputArr));
console.log(solver2(inputArr));
//# sourceMappingURL=solver.js.map