package models

type Follower struct {
    FollowerID  string
    FollowingID string
    CreatedAt   time.Time
}

type FollowRequest struct {
    ID         string
    SenderID   string
    ReceiverID string
    Status     string
    CreatedAt  time.Time
}

type Post struct {
    ID        string
    UserID    string
    Content   string
    MediaPath string
    MediaType string
    Privacy   string
    CreatedAt time.Time
    UpdatedAt time.Time  // add updated_at to your migration
}

type PostAllowedUser struct {
    PostID string
    UserID string
}

type Comment struct {
    ID        string
    PostID    string
    UserID    string
    Content   string
    MediaPath string
    MediaType string
    CreatedAt time.Time
}

type Notification struct {
    ID          string
    UserID      string
    ActorID     string  // who triggered the notification
    Type        string
    ReferenceID string
    IsRead      bool
    CreatedAt   time.Time
}