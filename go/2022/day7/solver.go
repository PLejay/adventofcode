package main

import (
	"fmt"
	"go/2022/utils"
	"strconv"
	"strings"
)

type Directory map[string][]string
type DirectoryMap map[string]Directory

var fileList = make(map[string]int)
var totalDiskSpace = 70000000
var requiredDiskSpace = 30000000

func formatInput(input []string) [][]string {
	var formattedInput [][]string
	for _, line := range input {
		formattedInput = append(formattedInput, strings.Split(line, " "))
	}
	return formattedInput
}

func getSumOfFileSizeInDir(directory *Directory) int {
	sumOfFileSize := 0
	fileNames, ok := (*directory)["files"]

	if ok && len(fileNames) > 0 {
		for _, fileName := range fileNames {
			sumOfFileSize += fileList[fileName]
		}
	}

	return sumOfFileSize
}

func getTotalSize(directory *Directory, directoryMap *DirectoryMap) int {
	totalSize := getSumOfFileSizeInDir(directory)
	childDirectories, ok := (*directory)["childDirectories"]
	if ok && len(childDirectories) > 0 {
		for _, childDirectoryName := range childDirectories {
			dir, ok := (*directoryMap)[childDirectoryName]
			if ok {
				totalSize += getTotalSize(&dir, directoryMap)
			}
		}
	}
	return totalSize
}

func addTotalSizeToEachDir(directoryMap *DirectoryMap) {
	for _, dir := range *directoryMap {
		totalSize := getTotalSize(&dir, directoryMap)
		dir["totalSize"] = []string{fmt.Sprint(totalSize)}
	}
	// fmt.Println(*directoryMap)
}

func getSumOfTotalSizes(formattedInput [][]string) (int, DirectoryMap) {
	currentSum := 0
	directoryMap := make(DirectoryMap)
	// fileList := make(map[string]int)
	currentDirectoryPath := ""
	parentDirectoryPath := ""

	for _, line := range formattedInput {
		// fmt.Println(line)
		// Handle commands
		if line[0] == "$" {
			if line[1] == "ls" {
				continue
			} else {
				// fmt.Printf("currentDirectoryPath: %s, line: %s\n", currentDirectoryPath, strings.Join(line[:], " "))
				// If the command is `cd ..`,
				if line[2] == ".." {
					currentDirectoryPath = directoryMap[currentDirectoryPath]["parentDirectoryPath"][0]
					parentDirectoryPath = directoryMap[currentDirectoryPath]["parentDirectoryPath"][0]
					// Otherwise, save the current path as parent and add a new entry to the directory map
				} else {
					parentDirectoryPath = currentDirectoryPath
					currentDirectoryPath = fmt.Sprint(parentDirectoryPath, "/", line[2])
					if _, ok := directoryMap[currentDirectoryPath]; !ok {
						newDirectory := make(Directory)
						newDirectory["parentDirectoryPath"] = []string{parentDirectoryPath}
						directoryMap[currentDirectoryPath] = newDirectory
					}
					if parentDirectoryPath != "" {
						parent := directoryMap[parentDirectoryPath]
						parent["childDirectories"] = append(parent["childDirectories"], currentDirectoryPath)
					}
				}
			}
		} else {

			if line[0] == "dir" {
				continue
			} else {
				// If the line is not a command or a dir, it has to be a file
				// Store the file and a reference to it in its parent directory
				fileName := fmt.Sprint(currentDirectoryPath, "/", line[1])
				fileSize, _ := strconv.Atoi(line[0])
				fileList[fileName] = fileSize
				directory := directoryMap[currentDirectoryPath]
				directory["files"] = append(directory["files"], fileName)
			}
		}
	}
	// fmt.Println(directoryMap)
	addTotalSizeToEachDir(&directoryMap)

	for _, dir := range directoryMap {
		if sizeStr, ok := dir["totalSize"]; ok && len(sizeStr) > 0 {
			size, _ := strconv.Atoi(sizeStr[0])
			if size <= 100000 {
				currentSum += size

			}
		}
	}
	return currentSum, directoryMap
}

func getSmallestValidDirSize(directoryMap *DirectoryMap) int {
	usedSpaceSize, _ := strconv.Atoi((*directoryMap)["/~"]["totalSize"][0])
	availableSpace := totalDiskSpace - usedSpaceSize
	missingSpace := requiredDiskSpace - availableSpace
	fmt.Println(missingSpace)
	smallestValidDirSpace := totalDiskSpace

	for _, dir := range *directoryMap {
		dirSize, _ := strconv.Atoi(dir["totalSize"][0])
		fmt.Println(dirSize)
		if dirSize >= missingSpace && dirSize < smallestValidDirSpace {
			smallestValidDirSpace = dirSize
		}
	}
	return smallestValidDirSpace
}

func getSolutions(formattedInput [][]string) (int, int) {
	sumOfTotalSizes, directoryMap := getSumOfTotalSizes(formattedInput)

	smallestValidDirSize := getSmallestValidDirSize(&directoryMap)

	return sumOfTotalSizes, smallestValidDirSize
}

func main() {
	input := utils.ArrayFromFile("input.txt")
	formattedInput := formatInput(input)

	fmt.Println(getSolutions(formattedInput))
}
