import { Router } from 'express';
import { MoviesController } from '../controllers/movies.js';
import { MovieModel } from '../models/mysql/movie.js';

// creamos una funcion en la que devolvemos la creacion del router y le pasamos como parametro el modelo de la base de datos
export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();
  const movieController = new MoviesController({ movieModel: MovieModel });

  moviesRouter.get('/', movieController.getAll);
  moviesRouter.post('/', movieController.create);
  moviesRouter.get('/:id', movieController.getById);
  moviesRouter.delete('/:id', movieController.delete);
  moviesRouter.patch('/:id', movieController.update);

  return moviesRouter;
};
