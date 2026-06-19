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
		user.DateOfBirth, user.Avatar, user.NickName, user.AboutMe, user.IsPublic)
	return err
}

func (r *userRepository) GetUserByEmail(email string) (*models.User, error) {
	row := r.db.QueryRow(`
		SELECT id, email, password, first_name, last_name, date_of_birth, avatar, nickname, about_me, is_public, created_at
		FROM users WHERE email = ?
	`, email)

	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.FirstName, &u.LastName,
		&u.DateOfBirth, &u.Avatar, &u.NickName, &u.AboutMe, &u.IsPublic, &u.CreatedAt)
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
		&u.DateOfBirth, &u.Avatar, &u.NickName, &u.AboutMe, &u.IsPublic, &u.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *userRepository) UpdateUser(user *models.User) error {
	_, err := r.db.Exec(`
		UPDATE users
		SET first_name = ?, last_name = ?, date_of_birth = ?, nickname = ?, about_me = ?
		WHERE id = ?
	`, user.FirstName, user.LastName, user.DateOfBirth, user.NickName, user.AboutMe, user.ID)
	return err
}

func (r *userRepository) UpdateAvatar(userID, avatarPath string) error {
	_, err := r.db.Exec(`
		UPDATE users SET avatar = ? WHERE id = ?
	`, avatarPath, userID)
	return err
}

func (r *userRepository) UpdatePrivacy(userID string, isPublic bool) error {
	_, err := r.db.Exec(`
		UPDATE users SET is_public = ? WHERE id = ?
	`, isPublic, userID)
	return err
}
