package main

import (
	"fmt"
	"go/2022/utils"
	"reflect"
	"strconv"
	"strings"
)

func stringToFormattedPairs(pairString *string) [][]int {
	splitString := strings.Split(*pairString, ",")
	var pairValues [][]int

	for _, valueString := range splitString {
		splitValueString := strings.Split(valueString, "-")
		value1, err1 := strconv.Atoi(splitValueString[0])
		value2, err2 := strconv.Atoi(splitValueString[1])

		if err1 != nil || err2 != nil {
			fmt.Println(value1, value2, err1, err2, reflect.TypeOf(value1), reflect.TypeOf(value2))
		} else {
			pairValues = append(pairValues, []int{value1, value2})
		}
	}
	return pairValues
}

func arePairsNested(pairString string) bool {
	areNested := false
	fp := stringToFormattedPairs(&pairString)

	if (fp[0][0] <= fp[1][0] && fp[0][1] >= fp[1][1]) ||
		(fp[0][0] >= fp[1][0] && fp[0][1] <= fp[1][1]) {
		areNested = true
	}

	return areNested
}

func doPairsOverlap(pairString string) bool {
	doOverlap := false
	fp := stringToFormattedPairs(&pairString)

	if (fp[0][0] >= fp[1][0] && fp[0][0] <= fp[1][1]) ||
		(fp[0][1] >= fp[1][0] && fp[0][1] <= fp[1][1]) ||
		(fp[1][0] >= fp[0][0] && fp[1][0] <= fp[0][1]) ||
		(fp[1][1] >= fp[0][0] && fp[1][1] <= fp[0][1]) {
		doOverlap = true
	}

	return doOverlap
}

func main() {
	input := utils.ArrayFromFile("input.txt")

	sumForPart1 := 0
	sumForPart2 := 0

	for _, pairString := range input {
		if arePairsNested(pairString) {
			sumForPart1 += 1
		}
		if doPairsOverlap(pairString) {
			sumForPart2 += 1
		}
	}

	fmt.Println(sumForPart1)
	fmt.Println(sumForPart2)
}
