package main

import (
	"fmt"
	"go/2022/utils"
	"strconv"
	"strings"
)

type StackList [][]string
type InstructionList []map[string]int

func formatInput(input *[]string) (StackList, InstructionList) {
	indexOfSeparatingLine := 0
	var numberOfStacks int
	var instructionList InstructionList

	// Identify where the stacks stop and the instructions begin
	for index, line := range *input {
		if len(line) == 0 {
			indexOfSeparatingLine = index
			numberOfStacks = (len((*input)[index-1]) + 2) / 4
			break
		}
	}

	numberOfStacks = (len((*input)[indexOfSeparatingLine-1]) + 2) / 4

	// Get the instruction list
	rawInstructionList := (*input)[indexOfSeparatingLine+1:]
	for _, rawInstruction := range rawInstructionList {
		splitInstruction := strings.Split(rawInstruction, " ")
		move, _ := strconv.Atoi(splitInstruction[1])
		from, _ := strconv.Atoi(splitInstruction[3])
		to, _ := strconv.Atoi(splitInstruction[5])
		instruction := map[string]int{"move": move, "from": from, "to": to}
		instructionList = append(instructionList, instruction)
	}

	// Get the state of the current stacks
	stackList := make(StackList, numberOfStacks)

	for i := indexOfSeparatingLine - 2; i >= 0; i-- {
		// Get the line for each row, starting from the bottom
		runeArray := []rune((*input)[i])
		for j := 1; j < len(runeArray); j += 4 {
			correspondingStackIndex := (j - 1) / 4
			crateLetter := string(runeArray[j])
			if crateLetter != " " {
				stackList[correspondingStackIndex] = append(stackList[correspondingStackIndex], string(runeArray[j]))
			}
		}
	}

	return stackList, instructionList
}

func getUpdatedStacksForPart1(currentStacks StackList, instructionList InstructionList) StackList {
	for _, instruction := range instructionList {
		numberOfMoves := instruction["move"]
		fromIndex := instruction["from"] - 1
		toIndex := instruction["to"] - 1
		for i := 0; i < numberOfMoves; i++ {
			stackFrom := currentStacks[fromIndex]
			if len(stackFrom) > 0 {
				item := stackFrom[len(stackFrom)-1]
				currentStacks[fromIndex] = currentStacks[fromIndex][:len(stackFrom)-1]
				currentStacks[toIndex] = append(currentStacks[toIndex], item)
			}
		}
		// fmt.Println(currentStacks)
	}
	return currentStacks
}

func getUpdatedStacksForPart2(currentStacks StackList, instructionList InstructionList) StackList {
	for _, instruction := range instructionList {
		numberOfMoves := instruction["move"]
		fromIndex := instruction["from"] - 1
		toIndex := instruction["to"] - 1
		stackFrom := currentStacks[fromIndex]
		if len(stackFrom) >= numberOfMoves {
			items := stackFrom[len(stackFrom)-numberOfMoves:]
			currentStacks[fromIndex] = currentStacks[fromIndex][:len(stackFrom)-numberOfMoves]
			currentStacks[toIndex] = append(currentStacks[toIndex], items...)
		}
		// fmt.Println(currentStacks)
	}
	return currentStacks
}

func getTopItems(stacks StackList) string {
	topItems := ""

	for _, stack := range stacks {
		topItems = topItems + stack[len(stack)-1]
	}
	return topItems
}

func main() {
	input := utils.ArrayFromFile("input.txt")

	stackList, instructionList := formatInput(&input)

	fmt.Println(stackList)
	// updatedStacksForPart1 := getUpdatedStacksForPart1(stackList, instructionList)
	fmt.Println(stackList)
	updatedStacksForPart2 := getUpdatedStacksForPart2(stackList, instructionList)

	// topItemsForPart1 := getTopItems(updatedStacksForPart1)
	topItemsForPart2 := getTopItems(updatedStacksForPart2)
	// fmt.Println(topItemsForPart1)	
	fmt.Println(topItemsForPart2)
}
