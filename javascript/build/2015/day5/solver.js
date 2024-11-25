"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const inputArr = utils_1.readFile("2015", "day5").toString().split("\n");
const vowels = ["a", "e", "i", "o", "u"];
const forbiddenStrings = ["ab", "cd", "pq", "xy"];
const part1Solver = () => {
    let niceStringSum = 0;
    inputArr.forEach(inputString => {
        let numVowels = 0;
        let hasConsecutiveDuplicates = false;
        let containsForbiddenStrings = false;
        // Pad input string to avoid missing last char in for loop logic
        const paddedInputString = `${inputString}.`;
        for (let i = 0; i < paddedInputString.length - 1; i++) {
            const char = paddedInputString.charAt(i);
            const nextChar = paddedInputString.charAt(i + 1);
            const nextTwoChars = paddedInputString.slice(i, i + 2);
            if (forbiddenStrings.includes(nextTwoChars)) {
                containsForbiddenStrings = true;
                break;
            }
            if (char === nextChar)
                hasConsecutiveDuplicates = true;
            if (vowels.includes(char))
                numVowels++;
        }
        if (numVowels >= 3 &&
            hasConsecutiveDuplicates &&
            !containsForbiddenStrings) {
            niceStringSum++;
        }
    });
    return { niceStringSum };
};
const part2Solver = () => {
    let niceStringSum = 0;
    inputArr.forEach(inputString => {
        let hasRepeatLettersWithGap = false;
        const pairAppearanceNum = {};
        const paddedInputString = `${inputString}.,`;
        for (let i = 0; i < paddedInputString.length - 2; i++) {
            const hasValidPair = Object.values(pairAppearanceNum).some(val => val > 1);
            if (hasRepeatLettersWithGap && hasValidPair) {
                niceStringSum++;
                break;
            }
            const char = paddedInputString.charAt(i);
            const nextChar = paddedInputString.charAt(i + 1);
            const nextNextChar = paddedInputString.charAt(i + 2);
            const nextNextNextChar = paddedInputString.charAt(i + 3);
            if (char === nextNextChar)
                hasRepeatLettersWithGap = true;
            const currentPair = `${char}${nextChar}`;
            if (char === nextChar &&
                char === nextNextChar &&
                char !== nextNextNextChar)
                continue;
            pairAppearanceNum[currentPair] =
                (pairAppearanceNum[currentPair] ?? 0) + 1;
        }
    });
    return { niceStringSum };
};
console.log(part1Solver());
console.log(part2Solver());
//# sourceMappingURL=solver.js.map