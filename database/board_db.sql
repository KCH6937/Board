CREATE DATABASE IF NOT EXISTS board_db;

USE board_db;

CREATE TABLE IF NOT EXISTS  User(
    id VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);