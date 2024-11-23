"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = utils_1.readFile("2021", "day14").toString().split("\n\n");
const startingTemplate = inputArr[0];
const instructions = inputArr[1]
    .split("\n")
    .map(instruction => instruction.split(" -> "));
// // Old non-scalable solution
// const insertPairs = (currentPolymer: string): string => {
//   let newPolymer: string[] = [];
//   currentPolymer.split("").forEach((char, i) => {
//     // Insert the current character in the new polymer
//     newPolymer.push(char);
//     // If char is not the last character of the string, look to the next character for possible pairs
//     if (i !== currentPolymer.length - 1) {
//       const pair = char + currentPolymer[i + 1]; // js string concatenation
//       const matchingInstruction = instructions.find(inst => inst[0] === pair);
//       // If an instruction matches this pair, insert the relevant character into the new polymer
//       if (matchingInstruction) {
//         newPolymer.push(matchingInstruction[1]);
//       }
//     }
//   });
//   return newPolymer.join("");
// };
const listFrequency = (polymer) => {
    let frequencyMap = {};
    polymer.split("").forEach(char => {
        if (!frequencyMap[char]) {
            frequencyMap[char] = 1;
        }
        else {
            frequencyMap[char]++;
        }
    });
    return frequencyMap;
};
const calculateInitialStats = () => {
    // Calculate how often a character appears in the initial template
    const initialCharFrequency = listFrequency(startingTemplate);
    const initialPairFrequency = {};
    instructions.forEach(inst => {
        // Add any characters that may be inserted later on, at initial frequency 0
        if (!initialCharFrequency[inst[1]])
            initialCharFrequency[inst[1]] = 0;
        // Add any existing pairs, or any possible pairs at frequency 0
        const regex = new RegExp(inst[0], "g");
        initialPairFrequency[inst[0]] = [
            ...startingTemplate.matchAll(regex),
        ].length;
    });
    return {
        charFrequency: initialCharFrequency,
        pairFrequency: initialPairFrequency,
    };
};
const updateInstructionsWithRelevantPairs = () => {
    let updatedInstructions = [];
    instructions.forEach(inst => {
        let updatedInstruction = {
            pair: inst[0],
            charToInsert: inst[1],
        };
        // Two new pairs created by inserting a new character in the initial pair
        const newPairs = [inst[0][0] + inst[1], inst[1] + [inst[0][1]]];
        // If inserting a new character introduces a relevant pair, specificy the new pair
        newPairs.forEach(newPair => {
            if (instructions.find(instruction => instruction[0] === newPair)) {
                // Either add to the existing createdPairs array or create a new one
                updatedInstruction.createdPairs = [
                    ...(updatedInstruction.createdPairs || []),
                    newPair,
                ];
            }
        });
        updatedInstructions.push(updatedInstruction);
    });
    return updatedInstructions;
};
const updateStats = (existingStats, instructions) => {
    // Make shallow copy of stats
    // Because all changes are happening simultaneously, this is to avoid making changes to the original object
    // that we may then need to reference for later instructions
    let statCopy = {
        charFrequency: Object.assign({}, existingStats.charFrequency),
        pairFrequency: Object.assign({}, existingStats.pairFrequency),
    };
    // Loop through the instructions and make the necessary changes
    instructions.forEach(instruction => {
        const numberOfInsertions = existingStats.pairFrequency[instruction.pair];
        // For every matching pair, increase the frequency of the character and relevant new pairs
        statCopy.charFrequency[instruction.charToInsert] += numberOfInsertions;
        if (instruction.createdPairs) {
            instruction.createdPairs.forEach(createdPair => {
                statCopy.pairFrequency[createdPair] += numberOfInsertions;
            });
        }
        // Drop the frequency of the initial pair (now broken due to insertion)
        statCopy.pairFrequency[instruction.pair] -= numberOfInsertions;
    });
    return statCopy;
};
const solver = (stepNum = 40) => {
    // let updatedPolymer = startingTemplate;
    let stepCounter = 0;
    // Calculate initial stats
    let updatedStats = calculateInitialStats();
    // Update the instructions to now also specify any new relevant pairs that the insertion may create
    const updatedInstructions = updateInstructionsWithRelevantPairs();
    while (stepCounter < stepNum) {
        // Old non-scalable approach
        // updatedPolymer = insertPairs(updatedPolymer);
        // New scalable solution
        updatedStats = updateStats(updatedStats, updatedInstructions);
        stepCounter++;
    }
    console.log(updatedStats);
    const sortedCharFrequency = Object.entries(updatedStats.charFrequency).sort((a, b) => a[1] - b[1]);
    return (sortedCharFrequency[sortedCharFrequency.length - 1][1] -
        sortedCharFrequency[0][1]);
};
console.log(solver());
//# sourceMappingURL=solver.js.map