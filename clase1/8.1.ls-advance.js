const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

// carpeta donde queremos hacer el dis
const folder = process.argv[2] ?? '.';

async function ls(directorio) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath); // informacion del archivo
    } catch (error) {
      console.error(pc.red(`❌ No se pudo leer el archivo ${filePath}`));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileZise = stats.size;
    const fileModifies = stats.mtime.toLocaleString();

    return `${pc.cyan(fileType)} ${pc.blue(file.padEnd(40))} ${pc
      .green(fileZise)
      .toString()
      .padStart(10)} ${pc.yellow(fileModifies)}`;
  });

  const filesInfo = await Promise.all(filePromises);

  filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);

// node 8.1.ls-advance ./cjs
// listara los archivos del fichero cjs
