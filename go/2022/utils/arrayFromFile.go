package utils

import (
	"bufio"
	"log"
	"os"
)

func ArrayFromFile(filePath string) []string {
	file, err := os.Open(filePath)

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	returnArray := make([]string, 0)

	for scanner.Scan() {
		line := scanner.Text()

		returnArray = append(returnArray, line)
	}

	return returnArray
}

func main() {

}
