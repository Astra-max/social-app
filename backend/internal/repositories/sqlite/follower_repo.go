package sqlite

import (
	"database/sql"
	"time"

	"social-network/backend/internal/models"
)

type followerRepository struct {
	db *sql.DB
}

func NewFollowerRepository(db *sql.DB) *followerRepository {
	return &followerRepository{db: db}
}

// CreateFollowRequest inserts a new follow request into the database
func (r *followerRepository) CreateFollowRequest(req *models.FollowRequest) error {
	_, err := r.db.Exec(`
		INSERT INTO follow_requests (id, sender_id, receiver_id, status, created_at)
		VALUES (?, ?, ?, ?, ?)
	`, req.ID, req.SenderID, req.ReceiverID, req.Status, req.CreatedAt)
	return err
}

// GetFollowRequest finds a follow request by sender and receiver IDs
func (r *followerRepository) GetFollowRequest(senderID, receiverID string) (*models.FollowRequest, error) {
	row := r.db.QueryRow(`
		SELECT id, sender_id, receiver_id, status, created_at
		FROM follow_requests
		WHERE sender_id = ? AND receiver_id = ?
	`, senderID, receiverID)

	var fr models.FollowRequest
	err := row.Scan(&fr.ID, &fr.SenderID, &fr.ReceiverID, &fr.Status, &fr.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &fr, nil
}

// GetFollowRequestByID finds a follow request by its own ID
func (r *followerRepository) GetFollowRequestByID(requestID string) (*models.FollowRequest, error) {
	row := r.db.QueryRow(`
		SELECT id, sender_id, receiver_id, status, created_at
		FROM follow_requests
		WHERE id = ?
	`, requestID)

	var fr models.FollowRequest
	err := row.Scan(&fr.ID, &fr.SenderID, &fr.ReceiverID, &fr.Status, &fr.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &fr, nil
}

func (r *followerRepository) UpdateFollowRequest(requestID, status string) error {
	_, err := r.db.Exec(`
        UPDATE follow_requests SET status = ? WHERE id = ?
    `, status, requestID)
	return err
}
func (r *followerRepository) CreateFollower(followerID, followingID string) error {
	_, err := r.db.Exec(`
        INSERT INTO followers (follower_id, following_id, created_at)
        VALUES (?, ?, ?)
    `, followerID, followingID, time.Now())
	return err
}
func (r *followerRepository) DeleteFollower(followerID, followingID string) error {
	_, err := r.db.Exec(`
        DELETE FROM followers WHERE follower_id = ? AND following_id = ?
    `, followerID, followingID)
	return err
}

func (r *followerRepository) IsFollowing(followerID, followingID string) (bool, error) {
	var count int
	err := r.db.QueryRow(`
        SELECT COUNT(*) FROM followers
        WHERE follower_id = ? AND following_id = ?
    `, followerID, followingID).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (r *followerRepository) GetFollowers(userID string) ([]*models.Follower, error) {
	// Step 1 — run the query, get multiple rows back
	rows, err := r.db.Query(`
        SELECT follower_id, following_id, created_at
        FROM followers
        WHERE following_id = ?
    `, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close() // always close rows when done

	// Step 2 — prepare an empty list to collect results
	var followers []*models.Follower

	// Step 3 — loop through each row
	for rows.Next() {
		var f models.Follower
		err := rows.Scan(&f.FollowerID, &f.FollowingID, &f.CreatedAt)
		if err != nil {
			return nil, err
		}
		followers = append(followers, &f)
	}

	// Step 4 — return the list
	return followers, nil
}
func (r *followerRepository) GetFollowing(userID string) ([]*models.Follower, error) {
	// Step 1 — run the query, get multiple rows back
	rows, err := r.db.Query(`
        SELECT follower_id, following_id, created_at
        FROM followers
        WHERE follower_id = ?
    `, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close() // always close rows when done

	// Step 2 — prepare an empty list to collect results
	var followers []*models.Follower

	// Step 3 — loop through each row
	for rows.Next() {
		var f models.Follower
		err := rows.Scan(&f.FollowerID, &f.FollowingID, &f.CreatedAt)
		if err != nil {
			return nil, err
		}
		followers = append(followers, &f)
	}

	// Step 4 — return the list
	return followers, nil
}
