const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}
const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const filtro = {
    alias: 'f',
}

const argv = require('yargs')
    .command('crear', 'Crear una tarea', {
        descripcion
    })
    .command('listar', 'Listar las tareas', {
        filtro
    })
    .command('actualizar', 'Actualizar una tarea', {
        descripcion,
        completado

    })
    .command('borrar', 'Borra un tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
};