package main

import (
	"fmt"
	"go/2022/utils"
	"math"
	"strconv"
	"strings"
)

type Coords [2]int
type CoordList map[int]Coords

func getDirectionFromString(line string) (string, int) {
	splitLine := strings.Split(line, " ")
	numberOfMoves, err := strconv.Atoi(splitLine[1])
	if err != nil {
		fmt.Println("error casting to int")
	}

	return splitLine[0], numberOfMoves
}

func coordsToString(coords Coords) string {
	return fmt.Sprint(fmt.Sprint(coords[0], ",", coords[1]))
}

func getUpdatedKnotCoords(coordsOfKnotBefore Coords, coordsOfCurrentKnot Coords) Coords {
	horizontalDiff := math.Abs(float64(coordsOfKnotBefore[0] - coordsOfCurrentKnot[0]))
	verticalDiff := math.Abs(float64(coordsOfKnotBefore[1] - coordsOfCurrentKnot[1]))

	horizontalMoveDirection := 1
	if coordsOfKnotBefore[0] < coordsOfCurrentKnot[0] {
		horizontalMoveDirection = -1
	}
	verticalMoveDirection := 1
	if coordsOfKnotBefore[1] < coordsOfCurrentKnot[1] {
		verticalMoveDirection = -1
	}

	var updatedKnotCoords Coords
	updatedKnotCoords[0] = coordsOfCurrentKnot[0]
	updatedKnotCoords[1] = coordsOfCurrentKnot[1]

	// Move the tail
	// If the tail and the head overlap, do nothing
	if coordsToString(coordsOfKnotBefore) == coordsToString(coordsOfCurrentKnot) {
		return updatedKnotCoords
		// If the tail and the head touch, also do nothing
	} else if horizontalDiff < 2 && verticalDiff < 2 {
		return updatedKnotCoords
		// If the head is in the same row as the tail, move one to the side
	} else {
		if coordsOfKnotBefore[1] == coordsOfCurrentKnot[1] && horizontalDiff > 1 {

			updatedKnotCoords[0] += horizontalMoveDirection
			// If the head is in the same column as the tail, move one up or down
		} else if coordsOfKnotBefore[0] == coordsOfCurrentKnot[0] && verticalDiff > 1 {

			updatedKnotCoords[1] += verticalMoveDirection
			// If the head is in a long horizontal diagonal to the tail (2 horizontal - 1 vertical), move next to the head
		} else if horizontalDiff > 1 && verticalDiff == 1 {
			updatedKnotCoords[1] = coordsOfKnotBefore[1]
			updatedKnotCoords[0] += horizontalMoveDirection
			// If the head is in a long vertical diagonal to the tail (2 vertical - 1 horizontal), move next to the head
		} else if verticalDiff > 1 && horizontalDiff == 1 {
			updatedKnotCoords[0] = coordsOfKnotBefore[0]
			updatedKnotCoords[1] += verticalMoveDirection
		}
	}
	return updatedKnotCoords
}

func getUpdatedCoordList(direction string, currentCoordList CoordList) CoordList {

	test := currentCoordList[0]
	test[1] = 1
	updatedCoordList := make(CoordList, len(currentCoordList))
	var updatedHeadCoords Coords
	updatedHeadCoords[0] = currentCoordList[0][0]
	updatedHeadCoords[1] = currentCoordList[0][1]

	// Move the head
	switch direction {
	case "U":
		updatedHeadCoords[1] += 1
	case "D":
		updatedHeadCoords[1] -= 1
	case "L":
		updatedHeadCoords[0] -= 1
	case "R":
		updatedHeadCoords[0] += 1
	default:
		fmt.Println("Unrecognized direction")
	}

	updatedCoordList[0] = updatedHeadCoords
	fmt.Printf("updatedHeadCoords: %+v\n", updatedHeadCoords)

	// Update each subsequent knot
	for i := 1; i < len(currentCoordList); i++ {
		updatedKnotCoords := getUpdatedKnotCoords(updatedCoordList[i-1], currentCoordList[i])
		updatedCoordList[i] = updatedKnotCoords
	}

	return updatedCoordList
}

func getNumberOfVisitedPositions(instructions []string, ropeSize int) int {
	currentCoordList := make(CoordList, ropeSize)
	visitedCoords := make(map[string]bool)
	visitedCoords["0,0"] = true

	// Populate the coord list with initial values
	for i := 0; i < ropeSize; i++ {
		var startingCoords Coords
		currentCoordList[i] = startingCoords
	}

	for _, instruction := range instructions {
		direction, moves := getDirectionFromString(instruction)
		for i := 0; i < moves; i++ {
			updatedCoordList := getUpdatedCoordList(direction, currentCoordList)
			currentCoordList = updatedCoordList
			fmt.Printf("tailPosition: %+v\n", updatedCoordList[len(currentCoordList)-1])
			fmt.Println(len(currentCoordList))
			stringCoords := coordsToString(currentCoordList[len(currentCoordList)-1])
			visitedCoords[stringCoords] = true
			// fmt.Println(updatedCoordList)
			// fmt.Printf("instruction: %s\n", instruction)
			// fmt.Printf("currentCoords: %+v\n", currentCoords)
		}
	}
	// fmt.Println(visitedCoords)
	return len(visitedCoords)
}

func main() {
	input := utils.ArrayFromFile("input.txt")

	// fmt.Println(getNumberOfVisitedPositions(input, 2))
	fmt.Println(getNumberOfVisitedPositions(input, 10))
}
