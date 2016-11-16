package models

import "database/sql"

type ChatMessage struct {
	speakerName string
	text 		string
	timestamp	string
}

func Transcript(db *sql.DB, chatID int) {
	
}

//TODO