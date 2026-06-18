package sqlite

import (
    "database/sql"
    "log"

    "github.com/golang-migrate/migrate/v4"
    "github.com/golang-migrate/migrate/v4/database/sqlite3" 
    _ "github.com/golang-migrate/migrate/v4/source/file"
    _ "github.com/mattn/go-sqlite3"
)

func NewDB() *sql.DB {
    db, err := sql.Open("sqlite3", "app.db?_foreign_keys=on")
    if err != nil {
        log.Fatal(err)
    }

    runMigrations(db)
    return db
}

func runMigrations(db *sql.DB) { 
    driver, err := sqlite3.WithInstance(db, &sqlite3.Config{}) 
    if err != nil {
        log.Fatal("migrate driver: ", err)
    }

    m, err := migrate.NewWithDatabaseInstance(
        "file://pkg/db/migrations/sqlite",
        "sqlite3",
        driver,
    )
    if err != nil {
        log.Fatal("migrate init: ", err)
    }

    if err := m.Up(); err != nil && err != migrate.ErrNoChange { 
        log.Fatal("migrate up: ", err)
    }

    log.Println("migrations applied")
}