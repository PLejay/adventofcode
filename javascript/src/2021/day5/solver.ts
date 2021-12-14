import { readFile } from "../../utils/utils";

const inputArr: string[] = readFile("2021", "day5").toString().split("\n");

type Line = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

const lines: Line[] = inputArr.map(line => {
  const convertedLine = line
    .split(" -> ")
    .map(coords => coords.split(",").map(x => Number(x)))
    .flat();
  return {
    xStart: convertedLine[0],
    yStart: convertedLine[1],
    xEnd: convertedLine[2],
    yEnd: convertedLine[3],
  };
});

console.log(lines);

const isStraightLine = (line: Line): boolean =>
  line.xStart === line.xEnd || line.yStart === line.yEnd;

const getMinMax = (line: Line) => {
  return {
    xMin: Math.min(line.xStart, line.xEnd),
    xMax: Math.max(line.xStart, line.xEnd),
    yMin: Math.min(line.yStart, line.yEnd),
    yMax: Math.max(line.yStart, line.yEnd),
  };
};

const getGridWithNewLine = (
  grid: number[][],
  line: Line,
  straightOnly: boolean
): number[][] => {
  const isStraight = isStraightLine(line);

  // Ignore non-straight lines
  if (straightOnly && !isStraight) return grid;

  const { xStart, yStart } = line;
  const { xMin, xMax, yMin, yMax } = getMinMax(line);

  return grid.map((row, y) =>
    row.map((point, x) => {
      if (
        x >= xMin &&
        x <= xMax &&
        y >= yMin &&
        y <= yMax &&
        (isStraight || Math.abs(x - xStart) === Math.abs(y - yStart))
      ) {
        return point + 1;
      } else {
        return point;
      }
    })
  );
};

const solver = (lines: Line[], straightOnly: boolean): number => {
  const gridWidth =
    lines.reduce(
      (currentMax, line) => Math.max(line.xEnd, line.xStart, currentMax),
      0
    ) + 1;
  const gridHeight =
    lines.reduce(
      (currentMax, line) => Math.max(line.yEnd, line.yStart, currentMax),
      0
    ) + 1;

  let grid = new Array(gridHeight).fill(new Array(gridWidth).fill(0));

  lines.forEach(line => {
    grid = getGridWithNewLine(grid, line, straightOnly);
  });

  console.log(
    grid
      .map(line => line.join(""))
      .join("\n")
      .replaceAll("0", ".")
  );

  return grid.flat().reduce((acc, point) => acc + (point > 1 ? 1 : 0), 0);
};

console.log(solver(lines, true));
console.log(solver(lines, false));