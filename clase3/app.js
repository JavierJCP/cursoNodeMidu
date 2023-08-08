const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
const cors = require('cors');
const { validateMovie, validatePartialMovie } = require('./schema/movies.js');

const app = express();
app.disable('x-powered-by'); // disable x-powered-by header de Express (por seguridad)

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost:1234',
        'https://movies.com',
        'https://midu.dev',
      ];
      if (ACCEPTED_ORIGINS.includes(origin)) {
        callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// endPoinsts
app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' });
});

// Todos los recursos que sean Movies se identifican con /movies

// app.get('/movies', (req, res) => {
//   res.json(movies);
// });  -> modificado para filtrar por categoria

// metodos normales: GET, HEAD, POST
// metodos complejos: PUT, PATCH, DELETE

// para metodos complejos exite el CORS PRE-Flight
// los metodos complejos requieren una peticion adicional OPTIONS (pregunta a la API)

// recuperar por categoria

// cors
// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:3000',
//   'http://localhost:1234',
//   'https://movies.com',
//   'https://midu.dev',
// ];
app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*'); // todos los origenes estan permitidos
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //restringimos el accesso a un origen y un puerto en especifico

  // la mejor manera de restringir el acceso es usando el header
  const origin = req.headers.origin; //origin extraido de los headers
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

// recuperar una movie por id
// /:id parámetro que recibe
app.get('/movies/:id', (req, res) => {
  // :id es un path to regexp (convertir path a expresiones regulares )
  const { id } = req.params; // recuperamos el parametro id
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

// Crear una movie POST

// sin validacion
// app.post('/movies', (req, res) => {
//   const { title, genre, year, director, duration, poster, rate } = req.body;
//   const newMovie = {
//       id: crypto.randomUUID(),
//       title,
//       genre,
//       year,
//       director,
//       duration,
//       poster,
//       rate: rate ?? 0,
//     };
//   // Esto no seria Rest, porque estamos guardando
//   // el estado de la aplicacion en memoria
//     movies.push(newMovie);
//     res.status(201).json(newMovie);
//   }

// con validacion
app.post('/movies/', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data, // ❌ req.body
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.message);
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex], //-> lo que tenemos en movieIndex
    ...result.data, // la respuesta de la validacion
  };
  movies[movieIndex] = updateMovie; //-> actualizamos el objeto
  res.json(updateMovie);
});

app.options('/movies/:id', (req, res) => {
  const origin = req.headers.origin;
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.send(200);
  }
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);
  return res.status(204).json({ message: 'Movie deleted' });
});

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`🔴 Servidor escuchando en el puerto http://localhost:${PORT}`);
});
