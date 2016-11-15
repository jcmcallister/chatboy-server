package models

import "database/sql"


type ChatSession struct {
	timeStart 	string
	timeEnded 	string
	members	  	[]*User
	transcript	[]*ChatMessage //probably should be a function, not a member
}