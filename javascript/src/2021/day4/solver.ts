import { readFile } from "../../utils/utils";

const inputArr: string[] = readFile("2021", "day4").toString().split("\n\n");

const numbers: number[] = inputArr[0].split(",").map(x => Number(x));
const boards: number[][][] = inputArr.slice(1).map(board =>
  board.split("\n").map(line =>
    line
      .replaceAll("  ", " ")
      .trim()
      .split(" ")
      .map(x => Number(x))
  )
);

const checkIfBoardWins = (board: number[][]): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i].reduce((a, b) => a + b) === board.length * -1 ||
      board.reduce((acc, line) => acc + line[i], 0) === board.length * -1
    )
      return true;
  }
  return false;
};

const solveBoard = (
  numbers: number[],
  board: number[][]
): { turnIndex: number; solvedBoard: number[][] } => {
  let solvedBoard = [...board.map(line => [...line])];
  let turnIndex = 0;
  for (let i = 0; i < numbers.length; i++) {
    solvedBoard.forEach(line =>
      line.forEach((num, index) => {
        if (num === numbers[i]) line[index] = -1;
      })
    );
    turnIndex = i;
    if (checkIfBoardWins(solvedBoard)) break;
  }
  return { turnIndex, solvedBoard };
};

const getSumOfUnmarkedNums = (board: number[][]): number => {
  return board.flat().reduce((a, b) => a + (b === -1 ? 0 : b), 0);
};

const solver = (
  numbers: number[],
  boards: number[][][],
  firstOrLast: string
): number => {
  let currentTurnRecord = {
    fastestTurnIndex: numbers.length,
    fastestSolvedBoard: boards[0],
    slowestTurnIndex: 0,
    slowestSolvedBoard: boards[0],
  };

  // Go through all boards and find the fastest/slowest
  boards.forEach(board => {
    const { turnIndex, solvedBoard } = solveBoard(numbers, board);
    
    if (turnIndex < currentTurnRecord.fastestTurnIndex) {
      currentTurnRecord.fastestTurnIndex = turnIndex;
      currentTurnRecord.fastestSolvedBoard = solvedBoard;
    }
    if (turnIndex > currentTurnRecord.slowestTurnIndex) {
      currentTurnRecord.slowestTurnIndex = turnIndex;
      currentTurnRecord.slowestSolvedBoard = solvedBoard;
    }
  });

  return (
    getSumOfUnmarkedNums(
      firstOrLast === "first"
        ? currentTurnRecord.fastestSolvedBoard
        : currentTurnRecord.slowestSolvedBoard
    ) *
    numbers[
      firstOrLast === "first"
        ? currentTurnRecord.fastestTurnIndex
        : currentTurnRecord.slowestTurnIndex
    ]
  );
};

console.log(solver(numbers, boards, "first"));
console.log(solver(numbers, boards, "last"));
