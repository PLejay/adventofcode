import { readFile } from "../../utils/utils";

const inputArr: number[] = readFile("2021", "day0")
  .toString()
  .split("\n")
  .map(x => Number(x));

console.log(inputArr);

const solver = () => {};

console.log(solver());
