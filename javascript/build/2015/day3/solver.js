"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = utils_1.readFile("2015", "day3").toString().split("");
const convertCoordToString = (coord) => coord.join("-");
const getUpdatedCoords = (coords, direction) => {
    const [x, y] = coords;
    switch (direction) {
        case "^":
            return [x, y + 1];
        case "v":
            return [x, y - 1];
        case "<":
            return [x - 1, y];
        case ">":
            return [x + 1, y];
    }
};
const part1Solver = () => {
    let currentCoordinates = [0, 0];
    const visitedCoordinates = new Set([
        convertCoordToString(currentCoordinates),
    ]);
    inputArr.forEach(direction => {
        const updatedCoords = getUpdatedCoords(currentCoordinates, direction);
        visitedCoordinates.add(convertCoordToString(updatedCoords));
        currentCoordinates = updatedCoords;
    });
    return {
        numVisitedHouses: visitedCoordinates.size,
    };
};
const part2Solver = () => {
    const initialCoordinates = [0, 0];
    let currentSantaCoordinates = initialCoordinates;
    let currentRoboSantaCoordinates = initialCoordinates;
    const visitedCoordinates = new Set([
        convertCoordToString(initialCoordinates),
    ]);
    inputArr.forEach((direction, i) => {
        const isRoboTurn = i % 2 === 1;
        const currentCoords = isRoboTurn
            ? currentRoboSantaCoordinates
            : currentSantaCoordinates;
        const updatedCoords = getUpdatedCoords(currentCoords, direction);
        visitedCoordinates.add(convertCoordToString(updatedCoords));
        if (isRoboTurn) {
            currentRoboSantaCoordinates = updatedCoords;
        }
        else {
            currentSantaCoordinates = updatedCoords;
        }
    });
    return {
        numVisitedHouses: visitedCoordinates.size,
    };
};
console.log("part 1: ", part1Solver());
console.log("part 2: ", part2Solver());
//# sourceMappingURL=solver.js.map