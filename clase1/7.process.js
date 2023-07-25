// arguemtos de entrada
console.log(process.argv); // -> node 7.process.js Hola mundo! -> La process.argv devuelve una matriz que contiene los argumentos de la línea de comandos pasados ​​cuando se inició el proceso de Node.js. El primer elemento será process.execPath. El segundo elemento será la ruta al archivo JavaScript que se está ejecutando. Los elementos restantes serán cualquier argumento de línea de comando adicional.

// controlar el proceso y su salida
//process.exit(0); // -> sin error
//process.exit(1); // -> error

// podemos controlar eventos de proceso
// process.on('exit', () => {
//   console.log('Salida del proceso');
// })

// current working directory
console.log(process.cwd()); // -> /

// plataform
console.log(process.platform); // devuelve el sistema operativo

// variables de entorno
console.log(process.env.SALUDO); // -> SALUDO="Hola mundo!" node 7.process.js
