const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'title must be a string',
    required_error: 'title is required',
  }),
  year: z.number().int().min(1900).max(2023),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).optional(),
  poster: z.string().url({
    message: 'poster must be a valid url',
  }),
  genre: z.array(
    z.enum([
      'Drama',
      'Action',
      'Adventure',
      'Sci-Fi',
      'Fantasy',
      'Comedy',
      'Romance',
      'Fantasy',
      'Horror',
      'Thriller',
      'Crime',
    ]),
    {
      required_error: 'genre is required',
      invalid_type_error: 'genre must be a string',
    }
  ),
});

function validateMovie(movie) {
  return movieSchema.safeParse(movie);
}

function validatePartialMovie(movie) {
  return movieSchema.partial().safeParse(movie);
}

module.exports = {
  validateMovie,
  validatePartialMovie,
};
