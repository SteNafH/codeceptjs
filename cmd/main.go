package main

import (
	"github.com/SteNafH/codeceptjs/pkg/api"
)

func main() {
	e := api.New()

	e.Logger.Fatal(e.Start(":42069"))
}
