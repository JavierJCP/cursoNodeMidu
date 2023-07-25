const http = require('node:http');
const pc = require('picocolors');
const { findAvailablePort } = require('./10.free-port.js');

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log('Recibimos una petición');
  res.end('Hola mundo!');
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(
      pc.green(`🔴 Servidor escuchando en el puerto http://localhost:${port}`)
    );
  });
});

// 0 -> node busca el primer puerto disponible y para poder saber cual fue el puerto asignado
// usamos el codigo server.address().port
