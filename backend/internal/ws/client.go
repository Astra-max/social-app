package ws

import (
	"encoding/json"
	"sync"
	"time"
	"errors"
	
	"github.com/gorilla/websocket"
	//"social-network/backend/internal/models"
)

type Client struct {
	ID       string
	UserID   string
	Conn     *websocket.Conn
	Hub      *Hub
	Send     chan []byte
	mu       sync.RWMutex
	LastPing time.Time
	Chats    map[string]bool
	IsActive bool
}

func NewClient(userID string, conn *websocket.Conn, hub *Hub) *Client {
	return &Client{
		ID:       userID,
		UserID:   userID,
		Conn:     conn,
		Hub:      hub,
		Send:     make(chan []byte, 256),
		LastPing: time.Now(),
		Chats:    make(map[string]bool),
		IsActive: true,
	}
}

func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	c.Conn.SetReadLimit(512)
	c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		c.mu.Lock()
		c.LastPing = time.Now()
		c.mu.Unlock()
		return nil
	})

	for {
		var msg map[string]interface{}
		err := c.Conn.ReadJSON(&msg)
		if err != nil {
			break
		}

		c.Hub.HandleMessage(c, msg)
	}
}

func (c *Client) WritePump() {
	ticker := time.NewTicker(30 * time.Second)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			n := len(c.Send)
			for i := 0; i < n; i++ {
				w.Write([]byte{'\n'})
				w.Write(<-c.Send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
			c.mu.Lock()
			c.LastPing = time.Now()
			c.mu.Unlock()
		}
	}
}

func (c *Client) SendMessage(msg interface{}) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	
	data, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	
	select {
	case c.Send <- data:
		return nil
	default:
		return errors.New("send channel is full")
	}
}

func (c *Client) JoinChat(chatID string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.Chats[chatID] = true
}

func (c *Client) LeaveChat(chatID string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.Chats, chatID)
}

func (c *Client) IsInChat(chatID string) bool {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.Chats[chatID]
}

func (c *Client) Close() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.IsActive = false
	close(c.Send)
}