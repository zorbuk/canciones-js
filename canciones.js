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
const fs = require('fs');
const chalk = require('chalk');

const leerCanciones = (fichero)=>{
    try {
        const buffer = fs.readFileSync(fichero)
        const datosString = buffer.toString()
        return JSON.parse(datosString)
    } catch (error) {
        console.log(error)
        return []
    }
}

const escribirCanciones=(fichero, datos)=>{
    const textoJSON = JSON.stringify(datos)
    fs.writeFileSync(fichero, textoJSON)
}

const añadirCancion = (cancion) => {
    const canciones = leerCanciones('canciones.json')

    const indice = canciones.findIndex(
         (_cancion) => _cancion.nombre == cancion.nombre
    )
    if (indice === -1) {
        console.log(chalk.green(`Se ha añadido la cancion: ${cancion.nombre}`))
        canciones.push({nombre: cancion.nombre, artista: cancion.artista, anyo: cancion.anyo}) // cuerpo:cuerpo
        escribirCanciones('canciones.json', canciones)
    } else {
        console.log(chalk.red(`La canción ${cancion.nombre} ya existe en la lista de canciones.`))
        //console.log(chalk.red.inverse('Nota ya existente'))
    }
}

const leerCancion = (titulo) => {
    const canciones = leerCanciones('canciones.json')

    const cancionEncontrada = canciones.find((cancion) => {
        return cancion.nombre.toLowerCase() === titulo.toLowerCase()
    })

    if(cancionEncontrada){
        console.log(chalk.green(`Se ha encontrado la canción ${titulo}`));
        console.log(cancionEncontrada);
    } else {
        console.log(chalk.red(`No se ha encontrado la canción: ${titulo}`));
    }
}

const editarArtista = (titulo, nuevoArtista) => {
    const canciones = leerCanciones('canciones.json')

    const indice = canciones.findIndex((cancion)=> cancion.nombre.toLowerCase() === titulo.toLowerCase())
    if (indice === -1) {
        console.log(chalk.red(`No se ha encontrado la canción: ${titulo}`));
    } else {
        const _cancion = canciones.splice(indice, 1)
        canciones.push({nombre: `${_cancion[0].nombre}`, artista: `${nuevoArtista}`, anyo: `${_cancion[0].anyo}`});
        console.log(chalk.green(`Editado autor de la cancion ${_cancion[0].nombre} por ${nuevoArtista}`));
        escribirCanciones('canciones.json', canciones)
    }
}

const borrarCancion = (titulo) => {
    const canciones = leerCanciones('canciones.json')

    const indice = canciones.findIndex((cancion)=> cancion.nombre.toLowerCase() === titulo.toLowerCase())
    if (indice === -1) {
        console.log(chalk.red(`No se ha encontrado la canción: ${titulo}`));
    } else {
        const _cancion = canciones.splice(indice, 1)
        console.log(chalk.green(`Borrada la canción ${_cancion[0].nombre}`));
        escribirCanciones('canciones.json', canciones)
    }
}

const listarCanciones = () => {
    const canciones = leerCanciones('canciones.json')
    canciones.forEach((cancion, index) => {
        console.log(chalk.blue(`${index+1}. ${cancion.nombre} ( ${cancion.anyo} ) de ${cancion.artista}`));
    });
    //console.log(JSON.stringify(canciones));
}

const ordenarCanciones = (tipo) => {
    const canciones = leerCanciones('canciones.json')
    if (tipo === 'artista') {
        canciones.sort( (cancionA, cancionB) => {
            debugger
            if (cancionA.artista.toLowerCase() < cancionB.artista.toLowerCase()) {
                return -1
            } else if (cancionA.artista.toLowerCase() > cancionB.artista.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        canciones.sort( (cancionA, cancionB) => {
            if (cancionA.anyo.toLowerCase() < cancionB.anyo.toLowerCase()) {
                return 1
            } else if (cancionA.anyo.toLowerCase() > cancionB.anyo.toLowerCase()) {
                return -1
            } else {
                return 0
            }
        })
    }
    canciones.forEach((cancion, index) => {
        console.log(chalk.blue(`${index+1}. ${cancion.nombre} ( ${cancion.anyo} ) de ${cancion.artista}`));
    });
    //console.log(JSON.stringify(canciones));
}

module.exports = {
    añadirCancion,
    leerCancion,
    editarArtista,
    borrarCancion,
    listarCanciones,
    ordenarCanciones
}