import express, { json } from 'express';
import { createMovieRouter } from './routes/movies.routes.js';
import { corsMiddleware } from './middlewares/cors.js';
// import movies from './movies.json' with { type: 'json' };
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use('/movies', createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
