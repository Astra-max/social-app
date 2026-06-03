package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"social-network/backend/internal/models"
	"social-network/backend/internal/services"
	pkgMiddleware "social-network/backend/pkg/middleware"
	"strings"
)

type AuthHandler struct {
	userService    *services.UserService
	sessionService *services.SessionService
}

func NewAuthHandler(userService *services.UserService, sessionService *services.SessionService) *AuthHandler {
	return &AuthHandler{
		userService:    userService,
		sessionService: sessionService,
	}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" || req.FirstName == "" || req.LastName == "" || req.DateOfBirth == "" {
		http.Error(w, "email, password, first name, last name and date of birth are required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.Register(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	session, err := h.sessionService.CreateSession(user.ID)
	if err != nil {
		http.Error(w, "failed to create session", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    session.ID,
		Expires:  session.ExpiresAt,
		HttpOnly: true,
		Path:     "/",
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(models.UserResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		DateOfBirth: user.DateOfBirth,
		Avatar:      user.Avatar,
		NickName:    user.NickName,
		AboutMe:     user.AboutMe,
		IsPublic:    user.IsPublic,
	})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	user, err := h.userService.Login(&req)
	if err != nil {
		http.Error(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	session, err := h.sessionService.CreateSession(user.ID)
	if err != nil {
		http.Error(w, "failed to create session", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    session.ID,
		Expires:  session.ExpiresAt,
		HttpOnly: true,
		Path:     "/",
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.UserResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		DateOfBirth: user.DateOfBirth,
		Avatar:      user.Avatar,
		NickName:    user.NickName,
		AboutMe:     user.AboutMe,
		IsPublic:    user.IsPublic,
	})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	cookie, err := r.Cookie("session_id")
	if err != nil {
		http.Error(w, "not logged in", http.StatusUnauthorized)
		return
	}

	if err := h.sessionService.DeleteSession(cookie.Value); err != nil {
		http.Error(w, "failed to logout", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    "",
		MaxAge:   -1,
		HttpOnly: true,
		Path:     "/",
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"logged out"}`))
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(pkgMiddleware.UserIDKey).(string)

	user, err := h.userService.GetProfile(userID, userID)
	if err != nil {
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.UserResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		DateOfBirth: user.DateOfBirth,
		Avatar:      user.Avatar,
		NickName:    user.NickName,
		AboutMe:     user.AboutMe,
		IsPublic:    user.IsPublic,
	})
}

func (h *AuthHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// get viewer id from session
	viewerID := r.Context().Value(pkgMiddleware.UserIDKey).(string)

	// get profile id from url e.g. /api/profile/123
	profileID := r.PathValue("id")
	if profileID == "" {
		http.Error(w, "user id required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.GetProfile(viewerID, profileID)
	if err != nil {
		if err.Error() == "private" {
			http.Error(w, "this profile is private", http.StatusForbidden)
			return
		}
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.UserResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		DateOfBirth: user.DateOfBirth,
		Avatar:      user.Avatar,
		NickName:    user.NickName,
		AboutMe:     user.AboutMe,
		IsPublic:    user.IsPublic,
	})
}

func (h *AuthHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(pkgMiddleware.UserIDKey).(string)

	var req models.UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	user, err := h.userService.UpdateProfile(userID, &req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(models.UserResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
		DateOfBirth: user.DateOfBirth,
		Avatar:      user.Avatar,
		NickName:    user.NickName,
		AboutMe:     user.AboutMe,
		IsPublic:    user.IsPublic,
	})
}

func (h *AuthHandler) UpdatePrivacy(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(pkgMiddleware.UserIDKey).(string)

	var req models.PrivacyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.userService.UpdatePrivacy(userID, req.IsPublic); err != nil {
		http.Error(w, "failed to update privacy", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"privacy updated"}`))
}

func (h *AuthHandler) UploadAvatar(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(pkgMiddleware.UserIDKey).(string)

	// limit upload size to 5MB
	r.ParseMultipartForm(5 << 20)

	// Get the file from the form field named "avatar"
	file, handler, err := r.FormFile("avatar")
	if err != nil {
		http.Error(w, "avatar file required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// validate extension
	ext := strings.ToLower(filepath.Ext(handler.Filename))
	if ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".gif" {
		http.Error(w, "only jpg, png and gif allowed", http.StatusBadRequest)
		return
	}

	// save to uploads/avatars/
	// Build the save path using the userID as filename
	/*Using userID as the filename means each user has exactly one avatar file. If they upload again
	it overwrites the old one automatically; no orphan files.*/
	filename := userID + ext
	savePath := filepath.Join("uploads", "avatars", filename)

	//Create the file on disk and copy the upload into it
	dst, err := os.Create(savePath)
	if err != nil {
		http.Error(w, "failed to save avatar", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "failed to save avatar", http.StatusInternalServerError)
		return
	}

	//Save the path to DB so we know where the avatar is
	if err := h.userService.UpdateAvatar(userID, savePath); err != nil {
		http.Error(w, "failed to update avatar", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"avatar": savePath})
}
