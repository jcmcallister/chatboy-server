package models

import "database/sql"

type User struct {
	name 		string
	type 		string
	isActive	string
}

// TODO: get active, i.e. logged-in, users of type Rep
	// VIEW TODO: if any Rep is active, show the chat action box

// TODO: 