import * as fs from "fs";
import * as path from "path";

export const readFile = (year: string, day: string): Buffer =>
  fs.readFileSync(
    path.resolve(
      __dirname,
      `../../../adventofcode-inputs/${year}/${day}/input.txt`
    )
  );

export const readMockFile = (): Buffer =>
  fs.readFileSync(path.resolve(__dirname, "../../src/mockInput.txt"));

export const createGrid = (gridWidth: number, gridHeight: number, fill: any) =>
  Array.from(Array(gridHeight), () => Array(gridWidth).fill(fill));

export const getGridDimensions = (grid: (number | string)[][]) => {
  return { gridHeight: grid.length, gridWidth: grid[0].length };
};

export const printGrid = (grid: (number | string)[][], delimiter = "") => {
  console.log(grid.map(row => row.join(delimiter)).join("\n"));
  console.log("\n");
};
