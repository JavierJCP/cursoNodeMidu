import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Vu9K2ZU6BChGu9',
  database: 'moviesdb',
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();
      // get genre ids from database table using ganre names
      const [genres] = await connection.query(
        'select id, name from genre where lower(name) = ?;',
        [lowerCaseGenre] // ?-> interpolacion, es decir va cambiando los valores por los parametros de la funcion, en este ejemplo por lowerCaseGenre, si hubiese mas interrogantes si reemplazan por orden. Ojo no se utiliza ${} por seguridad porque se podria inyectar codigo, eliminar o reemplazar (sql inyeccion)
      );

      // no genre found
      if (genres.length === 0) return [];

      // get the if from the first genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      //join
      // y devolver resultados...
      return [];
    }
    const [movies] = await connection.query(
      'select bin_to_uuid(id) as id , title, year, director, duration, poster, rate from movie'
    );
    // console.log(result);
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) as id FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    );
    if (movies.length === 0) return null;
    return movies[0];
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate } = input;

    const [uuidResult] = await connection.query('SELECT UUID() as uuid;');
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?)',
        [uuid, title, year, director, duration, poster, rate]
      );
    } catch (error) {
      // pude enviar informacion sensible
      throw new Error('Error creating movie');
      // enviar el error a un servicio externo
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    );

    return movies[0];
  }

  //crear el delete

  // crear el update
}
