package models

import (
    "database/sql"
    "log"
    _ "github.com/go-sql-driver/mysql"
)

var connection *sql.DB 

func dbConnect() (*sql.DB) {
	dbconn, err := sql.Open("mysql", "chatboy:foobar@/chatboy")
	err = dbconn.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return dbconn
}

// func dbTest(conn *sql.DB) {
// 	//simple DB test
// 	rows, err := conn.Query("SELECT typeName FROM usertypes")
// 	if err != nil {
// 	    log.Fatal(err)
// 	}
// 	for rows.Next() {
// 	    var name string
// 	    if err := rows.Scan(&name); err != nil {
// 	        log.Fatal(err)
// 	    }
// 	    fmt.Printf("user type: %s\n", name)
// 	}
// 	if err := rows.Err(); err != nil {
// 	    log.Fatal(err)
// 	}

// }