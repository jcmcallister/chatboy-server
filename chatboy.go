package main

import (
	"fmt"
	"log"
	"chatboy-server/models"
	"chatboy-server/routes"
	// "reflect"
)


func main() {

	var connection *sql.DB 
	connection = dbConnect()
	// fmt.Println(reflect.TypeOf(connection))
	dbTest(connection)
	
}

