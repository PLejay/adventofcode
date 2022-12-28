package main

import (
	"fmt"
	"go/2022/utils"
	"strconv"
)

type Grid [][]int

var grid [][]int
var gridHeight int
var gridWidth int
var visibilityMap [][]int

func buildGrid(input []string) {
	rows := make([][]int, len(input))

	for lineIndex, line := range input {
		splitLine := []rune(line)
		cols := make([]int, len(line))
		for charIndex, char := range splitLine {
			value, _ := strconv.Atoi(string(char))
			cols[charIndex] = value
		}
		rows[lineIndex] = cols
	}
	grid = rows
	gridHeight = len(grid)
	gridWidth = len(grid[0])

	// Build a separate map tracking all visible trees
	// -1 = not sure, 1 = visible, 0 = not visible
	mapRows := make(Grid, gridHeight)
	for i := 0; i < gridHeight; i++ {
		mapCols := make([]int, gridWidth)
		for j := 0; j < gridWidth; j++ {
			mapCols[j] = -1
		}
		mapRows[i] = mapCols
	}
	visibilityMap = mapRows
}

func getSumOfVisibleTrees() int {
	sum := 0
	for _, row := range visibilityMap {
		for _, isVisible := range row {
			sum += isVisible
		}
	}
	return sum
}

func getNumberOfVisibleTrees() int {
	for rowIndex := 0; rowIndex < gridHeight; rowIndex++ {
		for colIndex := 0; colIndex < gridWidth; colIndex++ {
			// Mark all edges as visible first
			if rowIndex == 0 || colIndex == 0 || rowIndex == gridHeight-1 || colIndex == gridWidth-1 {
				visibilityMap[rowIndex][colIndex] = 1
			} else {
				val := grid[rowIndex][colIndex]
				finished := false
				// Weird go equivalent of the while loop
				for ok := true; ok; ok = !finished {

					isVisibleFromUp := true
					isVisibleFromDown := true
					isVisibleFromLeft := true
					isVisibleFromRight := true
				UpLoop:
					for i := rowIndex - 1; i >= 0; i-- {
						// fmt.Printf("i: %d, colIndex: %d, grid[i][colIndex]: %d\n", i, colIndex, grid[i][colIndex])
						if val <= grid[i][colIndex] {
							visibilityMap[rowIndex][colIndex] = 0
							isVisibleFromUp = false
							break UpLoop
						}
					}
					if isVisibleFromUp {
						// fmt.Println("visiblefromup")
						visibilityMap[rowIndex][colIndex] = 1
						finished = true
						break
					}
				DownLoop:
					for i := rowIndex + 1; i <= gridHeight-1; i++ {
						if val <= grid[i][colIndex] {
							visibilityMap[rowIndex][colIndex] = 0
							isVisibleFromDown = false
							break DownLoop
						}
					}
					if isVisibleFromDown {
						// fmt.Println("visiblefromdown")
						visibilityMap[rowIndex][colIndex] = 1
						finished = true
						break
					}
				LeftLoop:
					for i := colIndex - 1; i >= 0; i-- {
						if val <= grid[rowIndex][i] {
							visibilityMap[rowIndex][colIndex] = 0
							isVisibleFromLeft = false
							break LeftLoop
						}
					}
					if isVisibleFromLeft == true {
						visibilityMap[rowIndex][colIndex] = 1
						// fmt.Println("visiblefromleft")
						finished = true
						break
					}
				RightLoop:
					for i := colIndex + 1; i <= gridWidth-1; i++ {
						if val <= grid[rowIndex][i] {
							visibilityMap[rowIndex][colIndex] = 0
							isVisibleFromRight = false
							break RightLoop
						}
					}
					if isVisibleFromRight == true {
						visibilityMap[rowIndex][colIndex] = 1
						// fmt.Println("visiblefromright")
						finished = true
						break
					}
					finished = true
				}
			}
			// fmt.Println(visibilityMap)
		}
	}
	return getSumOfVisibleTrees()
}

func getHighestScenicScore() int {
	highestScore := 0

	for rowIndex := 0; rowIndex < gridHeight; rowIndex++ {
		for colIndex := 0; colIndex < gridWidth; colIndex++ {
			currentScore := 1

			val := grid[rowIndex][colIndex]
			finished := false
			upScore := 0
			downScore := 0
			leftScore := 0
			rightScore := 0
			// Weird go equivalent of the while loop
			for ok := true; ok; ok = !finished {

			UpLoop:
				for i := rowIndex - 1; i >= 0; i-- {
					upScore++
					// fmt.Printf("i: %d, colIndex: %d, grid[i][colIndex]: %d\n", i, colIndex, grid[i][colIndex])
					if val <= grid[i][colIndex] {
						break UpLoop
					}
				}
			DownLoop:
				for i := rowIndex + 1; i <= gridHeight-1; i++ {
					downScore++
					if val <= grid[i][colIndex] {
						break DownLoop
					}
				}

			LeftLoop:
				for i := colIndex - 1; i >= 0; i-- {
					leftScore++
					if val <= grid[rowIndex][i] {
						break LeftLoop
					}
				}

			RightLoop:
				for i := colIndex + 1; i <= gridWidth-1; i++ {
					rightScore++
					if val <= grid[rowIndex][i] {
						break RightLoop
					}
				}
				finished = true
			}

			// Update the highest score
			currentScore = upScore * downScore * leftScore * rightScore
			if currentScore > highestScore {
				fmt.Println(currentScore)
				highestScore = currentScore
			}
		}
		// fmt.Println(visibilityMap)

	}

	return highestScore
}

func main() {
	input := utils.ArrayFromFile("input.txt")
	buildGrid(input)

	// fmt.Println(grid)
	// fmt.Println(visibilityMap)
	fmt.Println(getNumberOfVisibleTrees(), getHighestScenicScore())
}
