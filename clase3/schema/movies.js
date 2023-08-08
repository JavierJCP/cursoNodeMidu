const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  }),
  year: z.number().int().min(1600).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  rate: z.number().min(0).max(10).default(5),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Drama',
      'Comedy',
      'Horror',
      'Romance',
      'Thriller',
      'Crime',
      'Mystery',
      'Sci-Fi',
      'Fantasy',
    ]),
    {
      message: 'Genre must be an array',
    }
  ),
});

function validateMovie(movie) {
  return movieSchema.safeParse(movie);
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object); // convierte todas las propiedades en opcionales
}

module.exports = {
  validateMovie,
  validatePartialMovie,
};
