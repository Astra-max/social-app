package models

// type Post struct {
// 	ID        string `json:"id"`
// 	UserID    string `json:"user_id"`
// 	Content   string `json:"content"`
// 	MediaPath string `json:"media_path,omitempty"`
// 	MediaType string `json:"media_type,omitempty"`
// 	Privacy   string `json:"privacy"`
// 	CreatedAt string `json:"created_at"`
// 	UpdatedAt string `json:"updated_at"`
// 	Likes     int    `json:"likes"`
// 	Comments  int    `json:"comments"`
// 	Saved     bool   `json:"saved,omitempty"`
// }

type ResponseUser struct {
	ID          string `json:"id"`
	Email       string `json:"email"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	DateOfBirth string `json:"date_of_birth"`
	Avatar      string `json:"avatar"`
	Nickname    string `json:"nickname"`
	AboutMe     string `json:"about_me"`
	IsPublic    bool   `json:"is_public"`
	CreatedAt   string `json:"created_at"`
	// Profile display fields
	Name     string `json:"name"`
	Handle   string `json:"handle"`
	Bio      string `json:"bio"`
	IsOnline bool   `json:"is_online"`
	Stats    Stats  `json:"stats"`
	Posts    []Post `json:"posts"`
	Saved    []Post `json:"saved"`
	Photos   []Post `json:"photos"`
	About    About  `json:"about"`
}

type About struct {
	Bio      string `json:"bio"`
	Location string `json:"location"`
	Website  string `json:"website"`
	Joined   string `json:"joined"`
}

type Stats struct {
	Posts     string `json:"posts"`
	Followers string `json:"followers"`
	Following string `json:"following"`
}