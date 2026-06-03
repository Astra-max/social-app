package models

import "time"

type User struct{
	ID string
	Email string
	Password string
	FirstName string
	LastName string
	DateOfBirth string
	Avatar string
	NickName string
	AboutMe string
	IsPublic bool
	CreatedAt time.Time
}

//what frontend sends when a user signs up
type RegisterRequest struct{
	Email       string `json:"email"`
	Password 	string `json:"password"`
    FirstName   string `json:"first_name"`
    LastName    string `json:"last_name"`
    DateOfBirth string `json:"date_of_birth"`
    Avatar      string `json:"avatar, omitempty"`
    Nickname    string `json:"nickname, omitempty"`
    AboutMe     string `json:"about_me,omitempty"`
}

//what frontend sends on login
type LoginRequest struct{
	Email string `json:"email"`
	Password string `json:"password"`
}

//what the user /we send back
type UserResponse struct {
    ID          string `json:"id"`
    Email       string `json:"email"`
    FirstName   string `json:"first_name"`
    LastName    string `json:"last_name"`
    DateOfBirth string `json:"date_of_birth"`
    Avatar      string `json:"avatar"`
    NickName    string `json:"nickname"`
    AboutMe     string `json:"about_me"`
    IsPublic    bool   `json:"is_public"`  
}
