"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = (0, utils_1.readFile)("2021", "day11")
    .toString()
    .split("\n")
    .map(row => row.split("").map(x => Number(x)));
const { gridHeight, gridWidth } = (0, utils_1.getGridDimensions)(inputArr);
const solver = (initialValues, stepGoalNumber = 100) => {
    let numberOfFlashes = 0;
    let firstSimultaneousStep = 0;
    let currentValues = initialValues.map(row => [...row]);
    const getNeighbourCoordinates = (startingPoint) => {
        const { x, y } = startingPoint;
        let availableNeighbourCoords = [];
        if (x !== 0) {
            availableNeighbourCoords.push({ x: x - 1, y }); // top
            if (y !== 0)
                availableNeighbourCoords.push({ x: x - 1, y: y - 1 }); // top left
            if (y !== gridWidth - 1)
                availableNeighbourCoords.push({ x: x - 1, y: y + 1 }); // top right
        }
        if (y !== 0)
            availableNeighbourCoords.push({ x, y: y - 1 }); // left
        if (y !== gridWidth - 1)
            availableNeighbourCoords.push({ x, y: y + 1 }); // right
        if (x !== gridHeight - 1) {
            availableNeighbourCoords.push({ x: x + 1, y }); // bottom
            if (y !== gridWidth - 1)
                availableNeighbourCoords.push({ x: x + 1, y: y + 1 }); // bottom right
            if (y !== 0)
                availableNeighbourCoords.push({ x: x + 1, y: y - 1 }); // bottom left
        }
        return availableNeighbourCoords;
    };
    const step = (stepNumber) => {
        const raiseEnergy = (point) => {
            const { x, y } = point;
            let currentEnergy = currentValues[x][y];
            if (currentEnergy < 9) {
                currentValues[x][y]++;
            }
            else if (currentEnergy === 9) {
                currentValues[x][y] = 10;
                // Flash
                getNeighbourCoordinates({ x, y }).forEach(coords => {
                    raiseEnergy(coords);
                });
            }
            // If the energy level is already > 9, do nothing
        };
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                raiseEnergy({ x: i, y: j });
            }
        }
        // At the end of each step, count the number of 10 in the grid
        // Each 10 is one flash that occurred during the step
        // Also bring the 10 down to 0
        let sumOfFlashesForCurrentStep = 0;
        currentValues.forEach((row, i) => {
            row.forEach((x, j) => {
                if (x === 10) {
                    sumOfFlashesForCurrentStep++;
                    currentValues[i][j] = 0;
                }
            });
        });
        // Add the number of flashes for the current step to the global sum
        numberOfFlashes += sumOfFlashesForCurrentStep;
        // If all octopuses have flashed, pass the step number
        if (sumOfFlashesForCurrentStep === gridWidth * gridHeight) {
            firstSimultaneousStep = stepNumber + 1;
        }
        // printGrid(currentValues);
    };
    let currentStepNumber = 0;
    let numberOfFlashesAtStepGoal = 0;
    while (currentStepNumber < 1000 && !firstSimultaneousStep) {
        if (currentStepNumber === stepGoalNumber)
            numberOfFlashesAtStepGoal = numberOfFlashes;
        step(currentStepNumber);
        currentStepNumber++;
    }
    return { numberOfFlashesAtStepGoal, firstSimultaneousStep };
};
console.log(solver(inputArr));
// console.log(solver(inputArr, true));
//# sourceMappingURL=solver.js.map