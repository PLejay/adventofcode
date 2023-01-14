package main

import (
	"fmt"
	"go/2022/utils"
	"math"
	"strconv"
	"strings"
)

func checkCurrentCycle(currentCycle int, instructionDuration int) (bool, int) {
	cyclesOfInterest := [6]int{20, 60, 100, 140, 180, 220}

	for _, cycleNum := range cyclesOfInterest {
		if cycleNum == (currentCycle+1) || (cycleNum > currentCycle && cycleNum-currentCycle <= instructionDuration) {
			return true, cycleNum
		}
	}

	return false, 0
}

func getSumOfSignalStrengths(instructions []string) int {
	currentCycle := 0
	xValue := 1
	finalSum := 0

	for _, instruction := range instructions {

		instructionDuration := 2
		if instruction == "noop" {
			instructionDuration = 1
		}

		// If the current cycle is valid, add to the signal strength
		shouldSignalStrengthBeAdded, cycleValue := checkCurrentCycle(currentCycle, instructionDuration)
		// fmt.Printf("currentCycle: %d, cycleValue: %d, xValue: %d, instruction:%s\n", currentCycle, cycleValue, xValue, instruction)

		if shouldSignalStrengthBeAdded {
			finalSum += cycleValue * xValue
		}

		// Update the cycle and x value
		if instruction == "noop" {
			currentCycle++
		} else {
			splitInstruction := strings.Split(instruction, " ")
			xModifier, _ := strconv.Atoi(splitInstruction[1])
			currentCycle += 2
			xValue += xModifier
		}
	}

	return finalSum
}

func getStringValue(currentHorizontalPos int, xValue int) string {
	if math.Abs(float64(xValue-currentHorizontalPos)) <= 1 {
		return "#"
	}
	return "."
}

func drawFinalImage(instructions []string) {
	finalString := make([]string, 240)

	currentCycle := 0
	xValue := 1

	for _, instruction := range instructions {
		// Update the cycle and x value
		if instruction == "noop" {
			finalString[currentCycle] = getStringValue(currentCycle%40, xValue)
			currentCycle++
		} else {
			for i := 0; i < 2; i++ {
				finalString[currentCycle+i] = getStringValue((currentCycle+i)%40, xValue)
			}

			splitInstruction := strings.Split(instruction, " ")
			xModifier, _ := strconv.Atoi(splitInstruction[1])
			currentCycle += 2
			xValue += xModifier
		}
	}

	for i := 0; i <= 200; i += 40 {
		fmt.Println(finalString[i : i+40])
	}
}

func main() {
	input := utils.ArrayFromFile("input.txt")

	fmt.Println(getSumOfSignalStrengths(input))
	drawFinalImage(input)
}
