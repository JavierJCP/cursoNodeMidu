DROP DATABASE IF EXISTS moviesdb;

-- creacion de la base de datos
CREATE DATABASE moviesdb;

-- usar la base de datos
USE moviesdb;

-- crear tablas
CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT NOT NULL,
    rate DECIMAL(2,1) UNSIGNED NOT NULL 
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);


-- insertar datos
INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Romance'),
('Adventure'),
('Sci-Fi'),
('Comedy'),
('thriller');


INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UUID_TO_BIN(UUID()), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 142, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.9),
(UUID_TO_BIN(UUID()), "Forrest Gump", 1994, "Robert Zemeckis", 154, "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg", 8.8);

INSERT INTO movie_genre (movie_id, genre_id)
VALUES
	((SELECT id FROM movie WHERE title="The Shawshank Redemption"), (SELECT id FROM genre WHERE name = "Drama")),
    ((SELECT id FROM movie WHERE title="The Dark Knight"), (SELECT id FROM genre WHERE name = "Action")),
    ((SELECT id FROM movie WHERE title="The Dark Knight"), (SELECT id FROM genre WHERE name = "Crime")),
    ((SELECT id FROM movie WHERE title="The Dark Knight"), (SELECT id FROM genre WHERE name = "Drama")),
    ((SELECT id FROM movie WHERE title="Inception"), (SELECT id FROM genre WHERE name = "Action")),
    ((SELECT id FROM movie WHERE title="Forrest Gump"), (SELECT id FROM genre WHERE name = "Drama"));
    
SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;

SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN("d2c3bebb-51a3-11ee-9a2a-00155d010400");

SELECT * FROM genre;
SELECT BIN_TO_UUID(movie_id) AS id, genre_id FROM movie_genre;

SELECT * 
FROM movie
INNER JOIN movie_genre
ON movie.id = movie_genre.movie_id;

SELECT BIN_TO_UUID(movie_id) as id, genre_id FROM movie_genre WHERE genre_id = 1;

