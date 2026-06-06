package sqlite

import (
	"database/sql"
	"social-network/backend/internal/models"

	"github.com/google/uuid"
)

type notificationRepository struct {
	db *sql.DB
}

func NewNotificationRepository(db *sql.DB) *notificationRepository {
	return &notificationRepository{db: db}
}

func (r *notificationRepository) CreateNotification(n *models.Notification) error {
	if n.ID == "" {
		n.ID = uuid.New().String()
	}
	_, err := r.db.Exec(`
		INSERT INTO notifications (id, user_id, actor_id, type, reference_id, is_read, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, n.ID, n.UserID, n.ActorID, n.Type, n.ReferenceID, n.IsRead, n.CreatedAt)
	return err
}
