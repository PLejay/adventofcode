package main

import (
	"fmt"
	"go/2022/utils"
	"math"
	"sort"
	"strconv"
	"strings"
)

type Monkey struct {
	inspectionCount      int
	items                []int
	operationInstruction string
	divisibleBy          int
	indexIfTrue          int
	indexIfFalse         int
}

func getStartingItems(instruction string) []int {
	items := make([]int, 0)
	splitInstruction := strings.Split(instruction, ", ")
	splitFirstInstruction := strings.Split(splitInstruction[0], ": ")
	splitInstruction[0] = splitFirstInstruction[1]
	for _, itemString := range splitInstruction {
		item, _ := strconv.Atoi(itemString)
		items = append(items, item)
	}
	return items
}

func getDivisibleBy(instruction string) int {
	divisor, _ := strconv.Atoi(strings.Split(instruction, " by ")[1])
	return divisor
}

func getThrowIndex(instruction string) int {
	monkeyIndex, _ := strconv.Atoi(strings.Split(instruction, " monkey ")[1])
	return monkeyIndex
}

func getFormattedInput(input []string) []Monkey {
	numberOfMonkeys := (len(input) + 1) / 7
	monkeys := make([]Monkey, numberOfMonkeys)

	for i := 0; i < len(input)-5; i += 7 {
		monkeyInstructions := input[i : i+7]
		// fmt.Println(monkeyInstructions)
		monkey := Monkey{}

		monkey.items = getStartingItems(monkeyInstructions[1])
		monkey.operationInstruction = strings.Split(monkeyInstructions[2], " = ")[1]
		monkey.divisibleBy = getDivisibleBy(monkeyInstructions[3])
		monkey.indexIfTrue = getThrowIndex(monkeyInstructions[4])
		monkey.indexIfFalse = getThrowIndex(monkeyInstructions[5])

		monkeys[i/7] = monkey
	}
	return monkeys
}

func calculateNewStress(oldStress int, operationString string, worryDivisor int) int {
	newStress := 0
	splitString := strings.Split(operationString, " ")
	secondArg := oldStress
	if convertedArg, err := strconv.Atoi(splitString[2]); err == nil {
		secondArg = convertedArg
	}
	switch splitString[1] {
	case "*":
		newStress = oldStress * secondArg
	default:
		newStress = oldStress + secondArg
	}

	if worryDivisor == 1 {
		return newStress
	} else {
		return int(math.Floor(float64(newStress) / float64(worryDivisor)))
	}
}

func getIndexOfReceiverMonkey(newStress int, divisibleBy int, indexIfTrue int, indexIfFalse int) int {
	if newStress%divisibleBy == 0 {
		return indexIfTrue
	} else {
		return indexIfFalse
	}
}

func getProductOfTopTwoInspectionCounts(monkeys []Monkey) int {
	monkeyCount := len(monkeys)
	inspectionCounts := make([]int, monkeyCount)
	for i, _ := range monkeys {
		inspectionCounts[i] = monkeys[i].inspectionCount
	}
	sort.Ints(inspectionCounts)
	return inspectionCounts[monkeyCount-1] * inspectionCounts[monkeyCount-2]
}

func calculateMonkeyBusiness(monkeys []Monkey, numberOfRounds int, worryDivisor int) int {
	superModulo := 1
	for _, monkey := range monkeys {
		superModulo *= monkey.divisibleBy
	}

	for roundIndex := 0; roundIndex < numberOfRounds; roundIndex++ {
		for monkeyIndex := 0; monkeyIndex < len(monkeys); monkeyIndex++ {
			monkey := monkeys[monkeyIndex]
			numberOfItems := len(monkey.items)
			for itemIndex := 0; itemIndex < numberOfItems; itemIndex++ {
				monkeys[monkeyIndex].inspectionCount++
				// fmt.Printf("oldStress: %d, operationString: %s, newStress: %d\n", monkey.items[itemIndex], monkey.operationInstruction, calculateNewStress(monkey.items[itemIndex], monkey.operationInstruction))
				newStress := calculateNewStress(monkey.items[itemIndex]%superModulo, monkey.operationInstruction, worryDivisor)
				indexOfReceiverMonkey := getIndexOfReceiverMonkey(newStress, monkey.divisibleBy, monkey.indexIfTrue, monkey.indexIfFalse)
				monkeys[indexOfReceiverMonkey].items = append(monkeys[indexOfReceiverMonkey].items, newStress)
			}
			// When a monkey has inspected all items, empty the list
			monkeys[monkeyIndex].items = nil
		}
	}
	utils.PrintStructsByLine(monkeys)
	return getProductOfTopTwoInspectionCounts(monkeys)
}

func main() {
	input := utils.ArrayFromFile("input.txt")
	formattedInput := getFormattedInput(input)
	utils.PrintStructsByLine(formattedInput)
	// fmt.Println(calculateMonkeyBusiness(formattedInput, 20, 3))
	fmt.Println(calculateMonkeyBusiness(formattedInput, 10000, 1))
}
