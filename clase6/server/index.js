import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import { createServer } from 'node:http'; //servidor http
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(logger('dev'));
// creacion de los servidores
const serverHTTP = createServer(app);
const io = new Server(serverHTTP, {
  connectionStateRecovery: {},
});

// creacion de la base de datos
const db = createClient({
  url: 'libsql://charming-blossom-javierjcp.turso.io',
  authToken: process.env.DB_TOKEN,
});

// creacion de tablas
await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    user TEXT
  )`);

// al establecer una conexion web socket mandamos un mensaje
io.on('connection', async (socket) => {
  // mensage al conectarse
  console.log('a user has connected!');
  // mensage al desconectarse
  socket.on('disconnect', () => {
    console.log('a user has disconnected!');
  });
  // escuchamos el mensaje y lo enviamos al cliente
  socket.on('chat message', async (message) => {
    // recuperamos el username de websocket
    const username = socket.handshake.auth.username ?? 'Anonymous';
    // grabar el message en la base de datos
    let result;
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (message, user) VALUES (:message, :username)',
        args: { message, username }, //esta forma de pasar informacion es para evitar sql inyeccion
      });
    } catch (error) {
      console.error(error);
      return;
    }
    io.emit(
      'chat message',
      message,
      result.lastInsertRowid.toString(),
      username
    ); //lastInsertRowid es el ultimo mensaje insertado
  });

  //
  if (!socket.recovered) {
    // recuparar los mensajes sin conexion
    try {
      const results = await db.execute({
        sql: 'SELECT id, message, user FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0], // <- el ultimo cliente que se conecto
      });
      results.rows.forEach((row) => {
        socket.emit('chat message', row.message, row.id.toString(), row.user);
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
});

// app.get('/', (req, res) => {
//   res.sendFile(process.cwd() + '/client/index.html');
// });
app.use(express.static('client'));

// en lugar de escuchar al servidor de express, escuchamos al servidor http
serverHTTP.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
