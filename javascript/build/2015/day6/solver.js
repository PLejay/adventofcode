"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const getCommand = (line) => {
    if (line.includes("toggle"))
        return "toggle";
    if (line.includes("off"))
        return "turn off";
    return "turn on";
};
const getCoordsFromString = (coordString) => [
    Number(coordString.split(",")[0]),
    Number(coordString.split(",")[1]),
];
const parseLine = (line) => {
    const splitLine = line.split(" ");
    const lineLength = splitLine.length;
    return {
        startCoords: getCoordsFromString(splitLine[lineLength - 3]),
        endCoords: getCoordsFromString(splitLine[lineLength - 1]),
        command: getCommand(line),
    };
};
const inputArr = utils_1.readFile("2015", "day6")
    .toString()
    .split("\n")
    .map(parseLine);
const part1Solver = () => {
    // -1 is off, 1 is on
    const grid = utils_1.createGrid(1000, 1000, -1);
    inputArr.forEach(({ command, startCoords, endCoords }) => {
        const [startX, startY] = startCoords;
        const [endX, endY] = endCoords;
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (command === "turn off") {
                    grid[i][j] = -1;
                }
                else if (command === "turn on") {
                    grid[i][j] = 1;
                }
                else {
                    grid[i][j] *= -1;
                }
            }
        }
    });
    return {
        litLightSum: grid.flat().filter(a => a === 1).length,
    };
};
const part2Solver = () => {
    const grid = utils_1.createGrid(1000, 1000, 0);
    inputArr.forEach(({ command, startCoords, endCoords }) => {
        const [startX, startY] = startCoords;
        const [endX, endY] = endCoords;
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (command === "turn off") {
                    grid[i][j] = Math.max(grid[i][j] - 1, 0);
                }
                else if (command === "turn on") {
                    grid[i][j] += 1;
                }
                else {
                    grid[i][j] += 2;
                }
            }
        }
    });
    return {
        litLightSum: grid.flat().reduce((a, b) => a + b),
    };
};
console.log(part1Solver());
console.log(part2Solver());
//# sourceMappingURL=solver.js.map