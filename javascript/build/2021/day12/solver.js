"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = utils_1.readFile("2021", "day12")
    .toString()
    .split("\n")
    .map(x => x.split("-"));
// console.log(inputArr);
// Note: none of the examples or input have connections between two "big caves" (name in capitals)
// so this solution will ignore the scenario of infinite back-and-forth between two revisitable nodes
// List each cave and its possible destinations
const listDestinationsPerCave = (connections) => {
    let caves = {};
    connections.forEach(connection => {
        connection.forEach((cave, i) => {
            const connectedCave = connection[i === 0 ? 1 : 0];
            // If the cave has not been listed yet, add it to the list with the other cave as destination
            if (!caves[cave]) {
                caves[cave] = [connectedCave];
            }
            else {
                // Otherwise, just add the other cave to the list of possible destinations
                caves[cave].push(connectedCave);
            }
        });
    });
    return caves;
};
const solver = (connections) => {
    const destinationsPerCave = listDestinationsPerCave(connections);
    let possiblePaths = [];
    const mapPathFromCave = (currentCave, currentPath, smallCaveAlreadyVisited = false) => {
        if (currentCave === "end") {
            possiblePaths.push(currentPath);
            return;
        }
        destinationsPerCave[currentCave].forEach(destination => {
            const isDestinationSmall = destination.toLowerCase() === destination;
            const hasDestinationBeenVisited = currentPath.includes(destination);
            // If the new cave has never been visited or is big, use the new cave as new origin point
            if (destination !== "start" &&
                (!hasDestinationBeenVisited ||
                    !isDestinationSmall ||
                    !smallCaveAlreadyVisited)) {
                mapPathFromCave(destination, [...currentPath, destination], smallCaveAlreadyVisited ||
                    (hasDestinationBeenVisited && isDestinationSmall));
            }
        });
    };
    mapPathFromCave("start", ["start"]);
    return possiblePaths.length;
};
console.log(solver(inputArr));
//# sourceMappingURL=solver.js.map