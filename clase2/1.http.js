const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  // console.log('Recibimos una petición', req.url);

  // res.setHeader('Content-Type', 'text/plain; charset= utf-8');

  res.setHeader('Content-Type', 'text/html; charset= utf-8');

  if (req.url === '/') {
    res.statusCode = 200; // ok
    res.end('<h1>Bienvenido a mi página de inicio</h1>');
  } else if (req.url === '/imagen') {
    // servir una imagen
    fs.readFile('./imagen.svg', (error, data) => {
      if (error) {
        res.statuCode = 500;
        res.end('<h1>500 Internal Server Error</h1>');
      } else {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      }
    });
  } else if (req.url === '/contacto') {
    res.statusCode = 200;
    res.end('<h1>Contacto</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404</h1>');
  }
};
const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(
    `🔴 Servidor escuchando en el puerto http://localhost:${desiredPort}`
  );
});
