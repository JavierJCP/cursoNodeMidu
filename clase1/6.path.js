const path = require('node:path');

/* 
no debemos de crear rutas en nuestras aplicaciones
una de las razones es por ejemplo el caso de la barras de rutas
sistema unix -> /
sistema windows -> \
*/
// para saber que separador usa nuestro sistema operativo podemos usar
console.log(path.sep); // <- \ porque uso windows

// unir rutas con path.join
const filePath = path.join('conetent', 'subfolder', 'test.txt');
console.log(filePath);

// obtener el nombre del archivo
const base = path.basename(filePath);
console.log(base);

// obtenter el nombre del archivo sin la extension
const name = path.basename(filePath, '.txt');
console.log(name);

// obtenter la extensión del archivo
const extension = path.extname(filePath);
console.log(extension);
