CREATE TABLE IF NOT EXISTS private_messages (
    id          TEXT PRIMARY KEY,
    sender_id   TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    content     TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id)   REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS group_messages (
    id         TEXT PRIMARY KEY,
    group_id   TEXT NOT NULL,
    sender_id  TEXT NOT NULL,
    content    TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id)  REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id)  ON DELETE CASCADE
);