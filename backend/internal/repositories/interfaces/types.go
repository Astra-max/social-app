package interfaces

import "social-network/backend/internal/models"

type UserRepository interface {
	CreateUser(user *models.User) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id string) (*models.User, error)
	UpdateUser(user *models.User) error        // update profile fields
	UpdateAvatar(userID, avatarPath string) error // update avatar only
	UpdatePrivacy(userID string, isPublic bool) error // toggle public/private
}

type SessionRepository interface {
	CreateSession(session *models.Session) error
	GetSessionByID(id string) (*models.Session, error)
	DeleteSession(id string) error
}

type FollowerRepository interface {
    // follow requests
    CreateFollowRequest(req *models.FollowRequest) error
    GetFollowRequest(senderID, receiverID string) (*models.FollowRequest, error)
    GetFollowRequestByID(requestID string) (*models.FollowRequest, error)
    UpdateFollowRequest(requestID, status string) error

    // follow relationships
    CreateFollower(followerID, followingID string) error
    DeleteFollower(followerID, followingID string) error
    IsFollowing(followerID, followingID string) (bool, error)

    // lists
    GetFollowers(userID string) ([]*models.Follower, error)
    GetFollowing(userID string) ([]*models.Follower, error)
}

type NotificationRepository interface {
    CreateNotification(n *models.Notification) error
}