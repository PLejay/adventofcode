import * as fs from "fs";
import * as path from "path";

export const readFile = (year: string, day: string): Buffer =>
  fs.readFileSync(
    path.resolve(__dirname, `../../src/${year}/${day}/input.txt`)
  );

export const createGrid = (gridWidth: number, gridHeight: number, fill: any) => 
  Array.from(Array(gridHeight), () => Array(gridWidth).fill(fill));


export const getGridDimensions = (grid: (number | string)[][]) => {
  return { gridHeight: grid.length, gridWidth: grid[0].length };
};

export const printGrid = (grid: (number | string)[][]) => {
  console.log(grid.map(row => row.join("")).join("\n"));
  console.log("\n");
};
