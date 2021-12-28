"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const pairs = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
];
const scores = {
    ")": { syntax: 3, autocomplete: 1 },
    "]": { syntax: 57, autocomplete: 2 },
    "}": { syntax: 1197, autocomplete: 3 },
    ">": { syntax: 25137, autocomplete: 4 },
};
const inputArr = (0, utils_1.readFile)("2021", "day10")
    .toString()
    .split("\n")
    .map(line => line.split(""));
const getMatchingPair = (char) => pairs.filter(pair => pair.includes(char))[0];
const solver = (subsystem) => {
    let illegalCharacters = [];
    let missingClosingCharacters = [];
    for (let line of subsystem) {
        let isCorrupted = false;
        let currentlyOpenChunks = [];
        for (let char of line) {
            if (isCorrupted)
                break;
            const matchingPair = getMatchingPair(char);
            // If the character is an opening, add to the list of currently open chunks
            if (char === matchingPair[0]) {
                currentlyOpenChunks.push(char);
            }
            else {
                // Otherwise, check if the character matches the last open chunk
                if (currentlyOpenChunks.length > 0 &&
                    matchingPair[0] ===
                        currentlyOpenChunks[currentlyOpenChunks.length - 1]) {
                    // If so, close the chunk
                    currentlyOpenChunks.pop();
                }
                else {
                    // Otherwise, the character is illegal and the line is corrupted
                    isCorrupted = true;
                    illegalCharacters.push(char);
                }
            }
        }
        // Log the missing closing characters
        // Traversing the array in reverse so the closing and opening chars are symmetrical
        if (!isCorrupted)
            missingClosingCharacters.push(currentlyOpenChunks.map((char, i) => getMatchingPair(currentlyOpenChunks[currentlyOpenChunks.length - i - 1])[1]));
    }
    console.log(missingClosingCharacters);
    // Calculate the middle score
    let autoCompleteScores = missingClosingCharacters
        .map(chars => chars.reduce((a, b) => a * 5 + scores[b].autocomplete, 0))
        .sort((a, b) => a - b);
    console.log(autoCompleteScores);
    return {
        syntaxErrorScore: illegalCharacters.reduce((a, b) => a + scores[b].syntax, 0),
        middleScore: autoCompleteScores[(autoCompleteScores.length - 1) / 2],
    };
};
console.log(solver(inputArr));
//# sourceMappingURL=solver.js.map