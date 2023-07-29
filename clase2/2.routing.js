const http = require('node:http');

// en commonJS podemos import json
const dittoJson = require('./pokemon/dito.json');
const processRequesst = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset= utf-8');
          return res.end(JSON.stringify(dittoJson));
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset= utf-8');
          return res.end('<h1>404</h1>');
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';
          // escuchar el evento data
          req.on('data', (chunk) => {
            // chunk -> cada trozo de informacion que llega
            body += chunk.toString();
          });
          req.on('end', () => {
            const data = JSON.parse(body);
            // llamar a una base de datos para guardar los datos

            // por ahora solo devolvemos los datos
            res.writeHead(201, {
              'Content-Type': 'application/json; charset= utf-8',
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset= utf-8');
          return res.end('404 not found');
      }
  }
};

const server = http.createServer(processRequesst);

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234');
});
