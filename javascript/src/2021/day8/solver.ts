import { readFile } from "../../utils/utils";

type Note = {
  signalPatterns: string[];
  output: string[];
};

type SignalMap = {
  [segment: string]: string;
};

const digits = [
  "abcefg", // length 6
  "cf", // length 2
  "acdeg", // length 5
  "acdfg", // length 5
  "bcdf", // length 4
  "abdfg", // length 5
  "abdefg", // length 6
  "acf", // length 3
  "abcdefg", // length 7
  "abcdfg", // length 6
];

const characters = [
  "a", // frequency: 8
  "b", // frequency: 7
  "c", // frequency: 8
  "d", // frequency: 7
  "e", // frequency: 4
  "f", // frequency: 9
  "g", // frequency: 7
];

const inputArr: Note[] = readFile("2021", "day8")
  .toString()
  .split("\n")
  .map(note => {
    let splitNote = note.split(" | ");
    return {
      signalPatterns: splitNote[0].split(" "),
      output: splitNote[1].split(" "),
    };
  });

const solver = (notes: Note[]): number => {
  let sumOfOutputs = 0;
  notes.forEach(note => {
    // Map through the signals. Direction: {[received signal]: [corresponding segment]}
    let signalMap: SignalMap = {};
    // First find the unique segments
    let segments = new Array(10).fill("");
    const sortedPatterns = note.signalPatterns.sort(
      (a, b) => a.length - b.length
    );
    segments[1] = sortedPatterns[0];
    segments[7] = sortedPatterns[1];
    segments[4] = sortedPatterns[2];
    segments[8] = sortedPatterns[9];

    // Get the signal for "a" by comparing 1 and 7
    [...segments[7]].forEach((c: string) => {
      if (!segments[1].includes(c)) {
        signalMap[c] = "a";
      }
    });

    // Get the signal for "f"
    // "f" is one of the two signals of 1 and is present in all of the length-6 patterns
    [...segments[1]].forEach((c: string) => {
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
    [...segments[7]].forEach((c: string) => {
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
    [...segments[4]].forEach((c: string) => {
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
    const outputValue = Number(
      note.output
        .map(digit =>
          // Translate the signals into their corresponding segments, then find which number they correspond to
          {
            const translatedOutput = [...digit]
              .map(c => signalMap[c])
              .sort()
              .join("");
            console.log(translatedOutput);
            return digits.findIndex(d => d === translatedOutput);
          }
        )
        .join("")
    );
    sumOfOutputs += outputValue;
    console.log(signalMap);
    console.log(outputValue);
  });
  return sumOfOutputs;
};

console.log(solver(inputArr));
// console.log(solver(inputArr, true));
