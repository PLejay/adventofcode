"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const digits = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg", // length 6
];
const characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g", // frequency: 7
];
const inputArr = (0, utils_1.readFile)("2021", "day8")
    .toString()
    .split("\n")
    .map(note => {
    let splitNote = note.split(" | ");
    return {
        signalPatterns: splitNote[0].split(" "),
        output: splitNote[1].split(" "),
    };
});
const solver = (notes) => {
    let sumOfOutputs = 0;
    notes.forEach(note => {
        // Map through the signals. Direction: {[received signal]: [corresponding segment]}
        let signalMap = {};
        // First find the unique segments
        let segments = new Array(10).fill("");
        const sortedPatterns = note.signalPatterns.sort((a, b) => a.length - b.length);
        segments[1] = sortedPatterns[0];
        segments[7] = sortedPatterns[1];
        segments[4] = sortedPatterns[2];
        segments[8] = sortedPatterns[9];
        // Get the signal for "a" by comparing 1 and 7
        [...segments[7]].forEach((c) => {
            if (!segments[1].includes(c)) {
                signalMap[c] = "a";
            }
        });
        // Get the signal for "f"
        // "f" is one of the two signals of 1 and is present in all of the length-6 patterns
        [...segments[1]].forEach((c) => {
            if (sortedPatterns.slice(6, 9).every(pattern => pattern.includes(c))) {
                signalMap[c] = "f";
            }
        });
        // Get the signal for "e" (only signal to be present 4 times in total)
        characters.forEach(c => {
            if (sortedPatterns.filter(pattern => pattern.includes(c)).length === 4) {
                signalMap[c] = "e";
            }
        });
        // Get the signal for "c" (only signal in 7 not yet accounted for)
        [...segments[7]].forEach((c) => {
            if (!signalMap[c]) {
                signalMap[c] = "c";
            }
        });
        // Get the signal for "d" (only signal found in 4 and in every length-5 pattern;
        characters.forEach(c => {
            if (sortedPatterns.slice(2, 6).every(pattern => pattern.includes(c))) {
                signalMap[c] = "d";
            }
        });
        // Get the signal for "b" (only signal in 4 not yet accounted for)
        [...segments[4]].forEach((c) => {
            if (!signalMap[c]) {
                signalMap[c] = "b";
            }
        });
        // Get the signal for "g" (final signal not yet accounted for)
        characters.forEach(c => {
            if (!signalMap[c]) {
                signalMap[c] = "g";
            }
        });
        // Translate the output digits and get the final number
        const outputValue = Number(note.output
            .map(digit => {
            const translatedOutput = [...digit]
                .map(c => signalMap[c])
                .sort()
                .join("");
            console.log(translatedOutput);
            return digits.findIndex(d => d === translatedOutput);
        })
            .join(""));
        sumOfOutputs += outputValue;
        console.log(signalMap);
        console.log(outputValue);
    });
    return sumOfOutputs;
};
console.log(solver(inputArr));
// console.log(solver(inputArr, true));
//# sourceMappingURL=solver.js.map