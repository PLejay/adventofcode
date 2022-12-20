package utils

import (
	"reflect"
	"testing"
)

func TestArrayFromFile(t *testing.T) {
	expected := []string{"This is a line", "00", "", "This is the final line"}
	actual := ArrayFromFile("input_test.txt")

	if !reflect.DeepEqual(expected, actual) {
		t.Errorf("File read incorrectly: Expected ")
	}
}
