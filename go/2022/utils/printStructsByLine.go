package utils

import "fmt"

func PrintStructsByLine[T interface{}](customStructs []T) {
	for _, customStruct := range customStructs {
		fmt.Printf("%+v\n", customStruct)
	}
	fmt.Printf("\n")
}
