import * as fs from "fs";
import * as path from "path";

export const readFile = (year: string, day: string): Buffer =>
  fs.readFileSync(
    path.resolve(__dirname, `../../src/${year}/${day}/input.txt`)
  );
