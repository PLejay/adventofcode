package utils

import (
	"log"
	"os"
)

func StringFromFile(filePath string) string {
	file, err := os.ReadFile(filePath)

	if err != nil {
		log.Fatal(err)
	}

	return string(file)
}
