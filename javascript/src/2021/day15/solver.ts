import {
  createGrid,
  getGridDimensions,
  printGrid,
  readFile,
} from "../../utils/utils";

const inputArr: number[][] = readFile("2021", "day15")
  .toString()
  .split("\n")
  .map(row => row.split("").map(x => Number(x)));

const solver = () => {
  const { gridHeight, gridWidth } = getGridDimensions(inputArr);
  let currentRecord = gridHeight * gridWidth * 9;
  let heightMap = createGrid(gridWidth, gridHeight, 0);
  // Populate the end point on the height map
  heightMap[gridHeight - 1][gridWidth - 1] =
    inputArr[gridHeight - 1][gridWidth - 1];

  const getNeighboursFromPoint = (x: number, y: number) => {
    let neighbours = [];
    // Only looking at neighbours at the bottom and right for now
    // if (x !== 0) neighbours.push([x - 1, y]); // top
    // if (y !== 0) neighbours.push([x, y - 1]); // left
    if (x !== gridHeight - 1) neighbours.push([x + 1, y]); // bottom
    if (y !== gridWidth - 1) neighbours.push([x, y + 1]); // right

    return neighbours;
  };

  // const findPathFromOrigin = (x: number, y: number, currentRisk: number) => {
  //   // Add the coordinates of the current point to the current path
  //   // If the current point is the exit, log the total risk of the current path and finish
  //   // const totalRisk = currentPath.reduce((a, b) => a + inputArr[b[0]][b[1]], 0);
  //   const newRisk = currentRisk + (x + y === 0 ? 0 : inputArr[x][y]);

  //   if (x === gridHeight - 1 && y === gridWidth - 1) {
  //     currentRecord = Math.min(newRisk, currentRecord);
  //     return;
  //   }

  //   // If the current path is already more risky than the current record, abandon the path
  //   if (newRisk > currentRecord) return;

  //   // Get all neighbouring points not already in the current path
  //   const unVisitedNeighbours = getNeighboursFromPoint(x, y);
  //   //   .filter(
  //   //   n => !currentPath.find(point => point[0] === n[0] && point[1] === n[1])
  //   // );

  //   // If no unvisited neighbours remain (dead end) return
  //   if (unVisitedNeighbours.length === 0) {
  //     return;
  //   } else {
  //     // Otherwise, use the least risky bottom or right neighbour and carry on down the path
  //     const lowestRiskNeighbour = unVisitedNeighbours.sort(
  //       (a, b) => inputArr[a[0]][a[1]] - inputArr[b[0]][b[1]]
  //     )[0];
  //     findPathFromOrigin(
  //       lowestRiskNeighbour[0],
  //       lowestRiskNeighbour[1],
  //       newRisk
  //     );
  //   }
  // };

  // findPathFromOrigin(0, 0, 0);

  // Build a heightmap (grid with the lowest risk score of a path from each point to the end)
  // Working from the end and expanding towards the start
  const fillHeightMap = (currentLevel: number) => {
    const findMinimumRisk = (x: number, y: number, direction: string) => {
      let minimumRisk = gridHeight * gridWidth * 9;
      let currentRisk = 0;

      if (direction === "row") {
        for (let i = 0; i < gridWidth - y; i++) {
          // Update the risk as you go along the row
          currentRisk += inputArr[x][y + i];
          // If the total risk when dropping down into the row below is less than minimum, update minimum
          minimumRisk = Math.min(
            minimumRisk,
            currentRisk + heightMap[x + 1][y + i]
          );
        }
      } else if (direction === "column") {
        // Same as above, with column instead of row
        for (let i = 0; i < gridWidth - x; i++) {
          // Update the risk as you go along the column
          currentRisk += inputArr[x + i][y];
          // If the total risk when dropping into the row to the right is less than minimum, update minimum
          minimumRisk = Math.min(
            minimumRisk,
            currentRisk + heightMap[x + i][y + 1]
          );
        }
      }

      heightMap[x][y] = minimumRisk;
      return;
    };

    // Fill the height map with the minimum risk
    // for the row and column at each level

    // First deal with every other point along the row or column
    // except for the diagonal and edges (rightmost and bottommost)
    for (let i = 1; i < gridHeight - currentLevel - 1; i++) {
      findMinimumRisk(currentLevel, currentLevel + i, "row");
      findMinimumRisk(currentLevel + i, currentLevel, "column");
    }
    // Then deal with the edges
    // Rightmost
    heightMap[currentLevel][gridWidth - 1] =
      heightMap[currentLevel + 1][gridWidth - 1] +
      inputArr[currentLevel][gridWidth - 1];
    // Bottommost
    heightMap[gridHeight - 1][currentLevel] =
      heightMap[gridHeight - 1][currentLevel + 1] +
      inputArr[gridHeight - 1][currentLevel];
    // Then deal with the diagonal
    heightMap[currentLevel][currentLevel] =
      inputArr[currentLevel][currentLevel] +
      Math.min(
        heightMap[currentLevel + 1][currentLevel],
        heightMap[currentLevel][currentLevel + 1]
      );
  };

  for (let i = 0; i < gridHeight - 1; i++) {
    fillHeightMap(gridHeight - i - 2);
  }

  printGrid(heightMap, ",");
  // printGrid(inputArr);
  return heightMap[0][0] - inputArr[0][0];
};

console.log(solver());
