package main

import (
	"fmt"
	"go/2022/utils"
)

func getPriorityByType(itemType rune) int {
	// If the letter is uppercase (unicode < 97), start at index 65 (A)
	if itemType < 97 {
		return int(itemType) + 27 - 65
		// Otherwise start at index 97 (a)
	} else {
		return int(itemType) + 1 - 97
	}
}

func findCommonItem(itemLists [][]rune) rune {
	currentCommonItemList := itemLists[0]
	subsequentLists := itemLists[1:]

	for _, list := range subsequentLists {
		var updatedCommonItemList []rune
		for _, item := range list {
			for _, currentCommonItem := range currentCommonItemList {
				if currentCommonItem == item {
					updatedCommonItemList = append(updatedCommonItemList, currentCommonItem)
				}
			}
		}
		currentCommonItemList = updatedCommonItemList
	}
	return currentCommonItemList[0]
}

func getPriorityForPart1(itemString *string) int {
	itemList := []rune(*itemString)
	firstItemList := itemList[0:(len(itemList) / 2)]
	secondItemList := itemList[(len(itemList) / 2):]

	// 	var commonItemType1 rune

	// Loop:

	// 	for _, item := range firstItemList {
	// 		for _, item2 := range secondItemList {
	// 			if item == item2 {
	// 				commonItemType1 = item
	// 				break Loop
	// 			}
	// 		}
	// 	}
	commonItemType := findCommonItem([][]rune{firstItemList, secondItemList})
	return getPriorityByType(commonItemType)
}

func getPriorityForPart2(group []string) int {
	var itemLists [][]rune
	for _, list := range group {
		itemLists = append(itemLists, []rune(list))
	}

	commonItemType := findCommonItem(itemLists)
	return getPriorityByType((commonItemType))
}

func main() {
	input := utils.ArrayFromFile(("input.txt"))

	sumOfPriorities1 := 0
	sumOfPriorities2 := 0

	for _, items := range input {
		sumOfPriorities1 += getPriorityForPart1(&items)
	}

	for i := 0; i < (len(input) - 2); i += 3 {
		sumOfPriorities2 += getPriorityForPart2(input[i : i+3])
	}

	fmt.Println(sumOfPriorities1)
	fmt.Println(sumOfPriorities2)
}
