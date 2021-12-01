import * as fs from 'fs';

const inputArr: (number | string)[][] = fs
  .readFileSync('src/day13/input.txt')
  .toString()
  .split('\n')
  .map(x => {
    return x.split(',');
  });