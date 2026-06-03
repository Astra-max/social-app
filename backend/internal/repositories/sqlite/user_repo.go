package sqlite

import (
	"database/sql"
	"social-network/backend/internal/models"
)

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *userRepository {
	return &userRepository{db: db}
}

func (r *userRepository) CreateUser(user *models.User) error {
	_, err := r.db.Exec(`
		INSERT INTO users (id, email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, is_public)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, user.ID, user.Email, user.Password, user.FirstName, user.LastName,
		user.DateOfBirth, user.Avatar, user.Nickname, user.AboutMe, user.IsPublic)
	return err
}

func (r *userRepository) GetUserByEmail(email string) (*models.User, error) {
	row := r.db.QueryRow(`
		SELECT id, email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, is_public, created_at
		FROM users WHERE email = ?
	`, email)

	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.FirstName, &u.LastName,
		&u.DateOfBirth, &u.Avatar, &u.Nickname, &u.AboutMe, &u.IsPublic, &u.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) GetUserByID(id string) (*models.User, error) {
	row := r.db.QueryRow(`
		SELECT id, email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, is_public, created_at
		FROM users WHERE id = ?
	`, id)

	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.FirstName, &u.LastName,
		&u.DateOfBirth, &u.Avatar, &u.Nickname, &u.AboutMe, &u.IsPublic, &u.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &u, nil
}