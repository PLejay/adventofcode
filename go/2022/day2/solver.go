package main

import (
	"fmt"
	"go/2022/utils"
)

func getPointsForMove(move string) int {
	switch move {
	case "X":
		return 1
	case "Y":
		return 2
	case "Z":
		return 3
	default:
		return 0
	}
}

func calculateResult(move1 *string, move2 *string) string {
	if (*move1 == "A" && *move2 == "X") || (*move1 == "B" && *move2 == "Y") || (*move1 == "C" && *move2 == "Z") {
		return "Draw"
	} else if (*move1 == "A" && *move2 == "Z") || (*move1 == "C" && *move2 == "Y") || (*move1 == "B" && *move2 == "X") {
		return "Loss"
	} else {
		return "Win"
	}
}

func getPointsForResult(result string) int {
	switch result {
	case "Loss":
		return 0
	case "Draw":
		return 3
	case "Win":
		return 6
	default:
		return 0
	}
}

func getDesiredOutcome(letter string) string {
	switch letter {
	case "X":
		return "Loss"
	case "Y":
		return "Draw"
	default:
		return "Win"
	}
}

func convertMove(move string) string {
	switch move {
	case "A":
		return "X"
	case "B":
		return "Y"
	default:
		return "Z"
	}
}

func getMoveForDesiredOutcome(move1 string, desiredOutcome string) string {
	convertedMove := convertMove(move1)
	moveCode := []rune(convertedMove)[0]
	if desiredOutcome == "Draw" {
		return convertedMove
	} else if desiredOutcome == "Win" {
		resultingMove := string(88 + ((moveCode - 88 + 1) % 3))
		fmt.Printf("convertedMove: %s, moveCode: %d, desiredOutcome: %s, resultingMove: %s, resultingMoveCode: %d\n", convertedMove, moveCode, desiredOutcome, resultingMove, []rune(resultingMove)[0])
		return resultingMove
	} else {
		resultingMove := string(90)
		if convertedMove != "X" {
			resultingMove = string(moveCode - 1)
		}
		// resultingMove := string(88 + ((moveCode + 1) % 99))
		fmt.Printf("convertedMove: %s, desiredOutcome: %s, resultingMove: %s\n", convertedMove, desiredOutcome, resultingMove)
		return resultingMove
	}
}

func getPointsForRound(round string, isPart1 bool) int {
	moves := []rune(round)
	move1 := string(moves[0])
	secondLetter := string(moves[2])

	if isPart1 {
		move2 := secondLetter
		pointsForMovePlayed := getPointsForMove(move2)
		// fmt.Printf("move played: %s, points: %d\n", string(moves[2]), pointForMovePlayed)
		result := calculateResult(&move1, &move2)
		pointsForResult := getPointsForResult(result)

		return pointsForMovePlayed + pointsForResult
	} else {
		desiredOutcome := getDesiredOutcome(secondLetter)
		pointsForResult := getPointsForResult(desiredOutcome)
		moveForDesiredOutcome := getMoveForDesiredOutcome(move1, desiredOutcome)
		pointsForMove := getPointsForMove(moveForDesiredOutcome)
		fmt.Printf("moveForDesiredOutcome: %s, pointsForMove: %d\n", moveForDesiredOutcome, pointsForMove)
		return pointsForResult + pointsForMove
	}
}

func main() {
	fmt.Println([]rune("XYZ"))
	input := utils.ArrayFromFile(("input.txt"))
	sumOfPointsForPart1 := 0
	sumOfPointsForPart2 := 0
	for _, round := range input {
		sumOfPointsForPart1 += getPointsForRound(round, true)
		sumOfPointsForPart2 += getPointsForRound(round, false)
	}

	fmt.Println(sumOfPointsForPart1)
	fmt.Println(sumOfPointsForPart2)
}
