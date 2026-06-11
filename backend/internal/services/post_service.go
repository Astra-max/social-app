package services

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"social-network/backend/internal/models"
	"social-network/backend/internal/repositories/interfaces"
)

type PostService struct {
	postRepo         interfaces.PostRepository
	followerRepo     interfaces.FollowerRepository
	notificationRepo interfaces.NotificationRepository
}

func NewPostService(
	postRepo interfaces.PostRepository,
	followerRepo interfaces.FollowerRepository,
	notificationRepo interfaces.NotificationRepository,
) *PostService {
	return &PostService{
		postRepo:         postRepo,
		followerRepo:     followerRepo,
		notificationRepo: notificationRepo,
	}
}

func (s *PostService) CreatePost(userID, content, mediaPath, mediaType, privacy string, allowedUsers []string) (*models.Post, error) {

	//check 1, is post empty?
	if content == "" && mediaPath == "" {
   		 return nil, errors.New("post must have content or media")
	}

	//check 2, is the privacy value valid?

	if privacy != "public" && privacy != "followers" && privacy != "selected"{

		return nil, errors.New("invalid privacy setting")
	}

	//if selected, is the allowed list empty?

	if privacy == "selected" && len(allowedUsers) == 0 {

		return nil, errors.New("selected privacy requires at least one allowed user")
	}

	post := &models.Post{
    ID:        uuid.New().String(),
    UserID:    userID,
    Content:   content,
    MediaPath: mediaPath,
    MediaType: mediaType,
    Privacy:   privacy,
    CreatedAt: time.Now(),
    UpdatedAt: time.Now(),
}
	if err := s.postRepo.CreatePost(post); err!= nil{

		return nil, errors.New("could not create post")
	}

	if privacy == "selected" {
    for _, allowedUserID := range allowedUsers {
        if err := s.postRepo.CreateAllowedUser(post.ID, allowedUserID); err != nil {
            return nil, errors.New("could not add allowed user")
        }
    }
}

	return post, nil
}