import { createGrid, readFile } from "../../utils/utils";

type Coordinates = [number, number];
type Command = "toggle" | "turn on" | "turn off";

type Instructions = {
  command: Command;
  startCoords: Coordinates;
  endCoords: Coordinates;
};

const getCommand = (line: string): Command => {
  if (line.includes("toggle")) return "toggle";
  if (line.includes("off")) return "turn off";
  return "turn on";
};

const getCoordsFromString = (coordString: string): Coordinates => [
  Number(coordString.split(",")[0]),
  Number(coordString.split(",")[1]),
];

const parseLine = (line: string): Instructions => {
  const splitLine = line.split(" ");
  const lineLength = splitLine.length;
  return {
    startCoords: getCoordsFromString(splitLine[lineLength - 3]),
    endCoords: getCoordsFromString(splitLine[lineLength - 1]),
    command: getCommand(line),
  };
};

const inputArr: Instructions[] = readFile("2015", "day6")
  .toString()
  .split("\n")
  .map(parseLine);

const part1Solver = () => {
  // -1 is off, 1 is on
  const grid = createGrid<-1 | 1>(1000, 1000, -1);

  inputArr.forEach(({ command, startCoords, endCoords }) => {
    const [startX, startY] = startCoords;
    const [endX, endY] = endCoords;

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        if (command === "turn off") {
          grid[i][j] = -1;
        } else if (command === "turn on") {
          grid[i][j] = 1;
        } else {
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
  const grid = createGrid<number>(1000, 1000, 0);

  inputArr.forEach(({ command, startCoords, endCoords }) => {
    const [startX, startY] = startCoords;
    const [endX, endY] = endCoords;

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        if (command === "turn off") {
          grid[i][j] = Math.max(grid[i][j] - 1, 0);
        } else if (command === "turn on") {
          grid[i][j] += 1;
        } else {
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
