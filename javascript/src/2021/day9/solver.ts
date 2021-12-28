import { readFile } from "../../utils/utils";

type Neighbour = {
  value: string | number;
  xPos: number;
  yPos: number;
};

type Neighbours = {
  [direction: string]: Neighbour;
};

const inputArr: number[][] = readFile("2021", "day9")
  .toString()
  .split("\n")
  .map(row => row.split("").map(x => Number(x)));

const mapHeight = inputArr.length;
const mapWidth = inputArr[0].length;

const solver1 = (heightMap: number[][]): number => {
  let sumOfRisks = 0;

  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapWidth; j++) {
      // Treat all missing neighbours as being the maximum possible value
      // to avoid dealing with null
      const neighbours = {
        top: i === 0 ? 9 : heightMap[i - 1][j],
        right: j === mapWidth - 1 ? 9 : heightMap[i][j + 1],
        bottom: i === mapHeight - 1 ? 9 : heightMap[i + 1][j],
        left: j === 0 ? 9 : heightMap[i][j - 1],
      };
      const value = heightMap[i][j];
      if (value < Math.min(...Object.values(neighbours))) {
        sumOfRisks += value + 1;
      }
    }
  }
  return sumOfRisks;
};

const solver2 = (heightMap: number[][]): number => {
  let basinSizes: number[] = [];
  let mapCopy: (number | string)[][] = heightMap.map(row => [...row]);

  const findBasinFromOrigin = (x: number, y: number): void => {
    let basinSize = 0;

    const findNeighboursFromPoint = (x: number, y: number): void => {
      // Replace all values in the current basin with an x
      mapCopy[x][y] = "x";
      const neighbours: Neighbours = {
        top: { value: x === 0 ? 9 : mapCopy[x - 1][y], xPos: x - 1, yPos: y },
        right: {
          value: y === mapWidth - 1 ? 9 : mapCopy[x][y + 1],
          xPos: x,
          yPos: y + 1,
        },
        bottom: {
          value: x === mapHeight - 1 ? 9 : mapCopy[x + 1][y],
          xPos: x + 1,
          yPos: y,
        },
        left: { value: y === 0 ? 9 : mapCopy[x][y - 1], xPos: x, yPos: y - 1 },
      };
      for (const neighbour in neighbours) {
        if (
          neighbours[neighbour].value !== 9 &&
          neighbours[neighbour].value !== "x"
        ) {
          findNeighboursFromPoint(
            neighbours[neighbour].xPos,
            neighbours[neighbour].yPos
          );
        }
      }
      return;
    };

    findNeighboursFromPoint(x, y);

    // Replace all x with 9 and count the number of x
    mapCopy.forEach(
      (row, i) =>
        (mapCopy[i] = row.map(value => {
          if (value === "x") {
            basinSize++;
            return 9;
          } else {
            return value;
          }
        }))
    );
    // Log basin size
    basinSizes.push(basinSize);
  };

  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapWidth; j++) {
      if (mapCopy[i][j] === 9) continue;
      else {
        findBasinFromOrigin(i, j);
      }
    }
  }
  // Get largest three basin sizes
  const topThreeSizes = basinSizes.sort((a, b) => b - a).slice(0, 3);
  // Return the sum of the size of the three largest basins
  return topThreeSizes.reduce((a, b) => a * b, 1);
};

console.log(solver1(inputArr));
console.log(solver2(inputArr));
