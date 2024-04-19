
CREATE DATABASE IF NOT EXISTS nodelogin;

USE nodelogin;

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    actors TEXT,
    review TEXT,
    cover_image VARCHAR(255),
    trailer_link VARCHAR(255) NOT NULL
);