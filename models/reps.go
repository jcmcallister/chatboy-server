package models

import "database/sql"

type Rep struct {
	user 		*User
	ratings 	[]*RepRating
}

// TODO: login? this may belong in main
// TODO: logout? this may belong in main


// TODO: ApprovalRating to get % of binary upvotes over total number of unique chat sessions
	// func (r *Rep) ApprovalRating() (float32) {}

// TODO: RatingHistory to get a certain number of past ratings & comments

