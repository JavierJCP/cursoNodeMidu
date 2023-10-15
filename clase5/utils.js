import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); // ->import.meta.url es la ruta del proyecto actual

export const readJSON = (path) => require(path);
