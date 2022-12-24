package main

import (
	"fmt"
	"go/2022/utils"
)

func getEndOfMarkerIndex(input string, markerLength int) int {
	endOfMarkerIndex := 0
	inputArray := []rune(input)
	bufferLength := len(inputArray)

	for index, _ := range inputArray {
		isStillValid := true
		if index >= bufferLength-markerLength {
			return bufferLength
		} else {
			subArray := inputArray[index : index+markerLength]

		Loop:
			for i := 0; i < markerLength-1; i++ {
				for j := i + 1; j < markerLength; j++ {
					if subArray[i] == subArray[j] {
						isStillValid = false
						break Loop
					}
				}
			}

		}
		if isStillValid == true {
			endOfMarkerIndex = index + markerLength - 1
			break
		}
	}

	return endOfMarkerIndex
}

func main() {
	input := utils.StringFromFile("input.txt")
	fmt.Println(input)
	fmt.Println(getEndOfMarkerIndex(input, 4) + 1)
	fmt.Println(getEndOfMarkerIndex(input, 14) + 1)

}
