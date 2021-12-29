import { createGrid, printGrid, readFile } from "../../utils/utils";

type Instruction = {
  axis: string;
  value: number;
};

const inputArr = readFile("2021", "day13").toString().split("\n\n");

const initialDots: number[][] = inputArr[0]
  .split("\n")
  .map(coords => coords.split(",").map(x => Number(x)));

const foldInstructions: Instruction[] = inputArr[1]
  .split("\n")
  .map(instruction => {
    const arr = instruction.replace("fold along ", "").split("=");
    return {
      axis: arr[0],
      value: Number(arr[1]),
    };
  });

const fold = (grid: string[][], instruction: Instruction): string[][] => {
  let newGrid: string[][] = [];

  if (instruction.axis === "y") {
    // Keep the section of grid above the fold
    newGrid = grid.slice(0, instruction.value);
    // Add the missing hashes, mirrored
    grid.slice(instruction.value + 1).forEach((row, i) => {
      row.forEach((char, j) => {
        if (char === "#") {
          newGrid[newGrid.length - i - 1][j] = "#";
        }
      });
    });
  } else {
    // Keep the section of grid to the left of the fold
    newGrid = grid.map(row => row.slice(0, instruction.value));
    // Add the missing hashes, mirrored
    grid
      .map(row => row.slice(instruction.value + 1))
      .forEach((row, i) => {
        row.forEach((char, j) => {
          if (char === "#") {
            newGrid[i][newGrid[0].length - j - 1] = "#";
          }
        });
      });
  }
  return newGrid;
};

const solver = (numberOfFolds: number) => {
  let visibleDotsNum = 0;
  const gridWidth = Math.max(...initialDots.map(dot => dot[0])) + 1;
  const gridHeight = Math.max(...initialDots.map(dot => dot[1])) + 1;

  let grid = createGrid(gridWidth, gridHeight, ".");
  initialDots.forEach(dot => {
    grid[dot[1]][dot[0]] = "#";
  });

  foldInstructions.forEach((instruction, i) => {
    grid = fold(grid, instruction);
    if (i === numberOfFolds - 1) {
      visibleDotsNum = grid.flat().filter(x => x === "#").length;
    }
  });
  printGrid(grid);
  return visibleDotsNum;
};

console.log(solver(1));
