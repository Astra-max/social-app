package sqlite

import (
    "database/sql"
    "log"

    _ "github.com/mattn/go-sqlite3"
    "github.com/golang-migrate/migrate/v4"
    _ "github.com/golang-migrate/migrate/v4/database/sqlite3"
    _ "github.com/golang-migrate/migrate/v4/source/file"
)

func NewDB() *sql.DB {
    db, err := sql.Open("sqlite3", "app.db")
    if err != nil {
        log.Fatal(err)
    }

    runMigrations()

    return db
}

func runMigrations() {
    m, err := migrate.New(
        "file://backend/pkg/db/migrations/sqlite",
        "sqlite3://app.db",
    )
    if err != nil {
        log.Fatal(err)
    }

    if err := m.Up(); err != nil && err.Error() != "no change" {
        log.Fatal(err)
    }
}