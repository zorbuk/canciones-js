/*
    APLICACIÓN:
    - Subir resultado a github
    - Trabajar sobre un array de canciones 
    - [{nombre:'Times go by', artista: 'Madona', anyo: '2003'}]
    - app.js: require(canciones.js)
    - canciones.js: añadir cancion, leer cancion (titulo), editar artista (titulo), 
    borrar cancion (titulo), listar canciones, ordenar canciones segun artista o año.
    - canciones.json
*/

const canciones = require('./canciones.js');
const chalk = require('chalk');

console.log(chalk.black.bgWhite("--- AÑADIR CANCIONES --------------------------------------- "));
canciones.añadirCancion({nombre: 'Linkin park', artista: 'emosidoen gañados', anyo: '2000'});
canciones.añadirCancion({nombre: 'Dope', artista: 'Tommy Cash', anyo: '2001'});
canciones.añadirCancion({nombre: 'Tra tra', artista: 'La rosalia', anyo: '2002'});
canciones.añadirCancion({nombre: 'Ni idea', artista: 'C Tangana', anyo: '2004'});
console.log(chalk.black.bgWhite("--- LEER CANCIONES --------------------------------------- "));
canciones.leerCancion(`Dope`);
console.log(chalk.black.bgWhite("--- EDITAR ARTISTAS --------------------------------------- "));
canciones.editarArtista('Linkin park', 'Chester');
console.log(chalk.black.bgWhite("--- LISTAR CANCIONES --------------------------------------- "));
canciones.listarCanciones();
console.log(chalk.black.bgWhite("--- ORDENAR CANCIONES --------------------------------------- "));
canciones.ordenarCanciones('anyo');