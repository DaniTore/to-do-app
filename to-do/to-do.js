const fs = require('fs');


let listadoPorHacer = [];



const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);


    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo guardar', err)
    })

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = []
    }

}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB()

    return porHacer
}

const getListado = (filtro) => {
    cargarDB()
    console.log(filtro);
    let nuevoListado = []
    let result = []
    if (filtro) {
        if (filtro == "true") {

            nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === true)
            result = nuevoListado
        } else {
            nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === false)
            result = nuevoListado
        }
    } else {
        result = listadoPorHacer
    }

    return result


}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    let result = false

    if (nuevoListado.length == listadoPorHacer.length) {
        result = false
    } else {
        listadoPorHacer = nuevoListado
        guardarDB()
        result = true
    }
    return result

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};