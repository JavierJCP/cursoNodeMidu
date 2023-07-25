const fs = require('node:fs/promises');

// mediante callbacks
// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   files.forEach((file) => {
//     console.log(file);
//   });
// });

// mediante promises
fs.readdir('.') // -> siempre empezamos en el directorio actual
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    console.log(err);
    return;
  });
