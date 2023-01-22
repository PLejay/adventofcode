package main

import (
	"fmt"
	"math/big"
)

func main() {
	number := big.NewInt(123456)
	divisor := big.NewInt(2345)

	quotient, modulus := new(big.Int).DivMod(number, divisor, big.NewInt(0))

	fmt.Printf("number: %+v\n", number)
	fmt.Printf("divisor: %+v\n", divisor)
	fmt.Printf("quotient: %+v\n", quotient)
	fmt.Printf("modulus: %+v\n", modulus)
}
