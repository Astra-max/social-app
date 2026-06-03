package sqlite

import (
	"database/sql"
	"social-network/backend/internal/models"
)

type sessionRepository struct {
	db *sql.DB
}

func NewSessionRepository(db *sql.DB) *sessionRepository {
	return &sessionRepository{db: db}
}

func (r *sessionRepository) CreateSession(session *models.Session) error {
	_, err := r.db.Exec(`
		INSERT INTO sessions (id, user_id, expires_at)
		VALUES (?, ?, ?)
	`, session.ID, session.UserID, session.ExpiresAt)

	return err
}

func (r *sessionRepository) GetSessionByID(id string) (*models.Session, error) {
	row := r.db.QueryRow(`
		SELECT id, user_id, expires_at, created_at
		FROM sessions WHERE id = ?
	`, id)

	var s models.Session
	err := row.Scan(&s.ID, &s.UserID, &s.ExpiresAt, &s.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &s, nil
}

func (r *sessionRepository) DeleteSession(id string) error {
	_, err := r.db.Exec(`DELETE FROM sessions WHERE id = ?`, id)
	return err
}
