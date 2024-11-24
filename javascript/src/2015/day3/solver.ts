import { readFile } from "../../utils/utils";

type Coordinates = [number, number];
type StringCoordinates = `${number}-${number}`;
type Direction = "^" | "v" | "<" | ">";

const inputArr = readFile("2015", "day3").toString().split("") as Direction[];

const convertCoordToString = (coord: Coordinates) =>
  coord.join("-") as StringCoordinates;

const getUpdatedCoords = (
  coords: Coordinates,
  direction: Direction
): Coordinates => {
  const [x, y] = coords;
  switch (direction) {
    case "^":
      return [x, y + 1];
    case "v":
      return [x, y - 1];
    case "<":
      return [x - 1, y];
    case ">":
      return [x + 1, y];
  }
};

const part1Solver = () => {
  let currentCoordinates: Coordinates = [0, 0];
  const visitedCoordinates = new Set<StringCoordinates>([
    convertCoordToString(currentCoordinates),
  ]);

  inputArr.forEach(direction => {
    const updatedCoords = getUpdatedCoords(currentCoordinates, direction);
    visitedCoordinates.add(convertCoordToString(updatedCoords));
    currentCoordinates = updatedCoords;
  });

  return {
    numVisitedHouses: visitedCoordinates.size,
  };
};

const part2Solver = () => {
  const initialCoordinates: Coordinates = [0, 0];
  let currentSantaCoordinates: Coordinates = initialCoordinates;
  let currentRoboSantaCoordinates: Coordinates = initialCoordinates;
  const visitedCoordinates = new Set<StringCoordinates>([
    convertCoordToString(initialCoordinates),
  ]);

  inputArr.forEach((direction, i) => {
    const isRoboTurn = i % 2 === 1;
    const currentCoords = isRoboTurn
      ? currentRoboSantaCoordinates
      : currentSantaCoordinates;
    const updatedCoords = getUpdatedCoords(currentCoords, direction);
    visitedCoordinates.add(convertCoordToString(updatedCoords));
    if (isRoboTurn) {
      currentRoboSantaCoordinates = updatedCoords;
    } else {
      currentSantaCoordinates = updatedCoords;
    }
  });

  return {
    numVisitedHouses: visitedCoordinates.size,
  };
};

console.log("part 1: ", part1Solver());
console.log("part 2: ", part2Solver());
