const express = require('express');
const ditto = require('./pokemon/dito.json');

const app = express();
app.disable('x-powered-by'); // disable x-powered-by header

const PORT = process.env.PORT ?? 1234;

// middlewares
app.use(express.json());

// app.use((req, res, next) => {
//   // console.log('mi primer middleware');
//   if (req.method !== 'POST') return next();
//   if (req.headers['content-type'] !== 'application/json') return next();
//   // solo llegan request que sean POST y que tienen el header content-type: application/json
//   let body = '';
//   req.on('data', (chunk) => {
//     body += chunk.toString();
//   });
//   req.on('end', () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     // mutamos la req y meter la informacion en el req.body
//     req.body = data;
//     next();
//   });
// });

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  // let body = '';
  // req.on('data', (chunk) => {
  //   body += chunk.toString();
  // });
  // req.on('end', () => {
  //   const data = JSON.parse(body);
  //   data.timestamp = Date.now();
  //   res.status(201).end(JSON.stringify(data));
  // });
  res.status(201).json(req.body);
});

// ultima ruta a la que llega
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
