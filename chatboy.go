package main

import (
	"fmt"
	"log"
	"chatboy-server/models"
	"chatboy-server/handlers"
	// "reflect"
)

type Env struct {
	db *sql.DB
}

func main() {

	myDB, err := models.DbConnect()
	if err != nil {
		log.Fatal(err)
	}

	myEnv := &Env{db: myDB}

	models.DbTest(connection)
	
}



// func prepareEnv() {}

