package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
)

func main() {
	f, err := os.Open("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	scanner := bufio.NewScanner(f)

	calorieList := make([]int, 0)
	currentSum := 0

	for scanner.Scan() {
		textValue := scanner.Text()
		if textValue == "" {
			calorieList = append(calorieList, currentSum)
			currentSum = 0
		} else {
			intValue, err := strconv.Atoi(textValue)
			if err != nil {
				fmt.Printf("Error while converting to int: %s\n", textValue)
			} else {
				currentSum += intValue
			}

		}
	}
	sort.Ints(calorieList)
	fmt.Println(calorieList)
	fmt.Println(calorieList[len(calorieList)-1])

	length := len(calorieList)

	fmt.Println(calorieList[length-1] + calorieList[length-2] + calorieList[length-3])

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
