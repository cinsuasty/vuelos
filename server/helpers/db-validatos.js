const {Aerolinea, Aeropuerto, Usuario, Vuelo} = require('../models/');

//Verificar si la aerolinea exite por id
const existeAerolineaPorId = async(id) => {
    const existeAerolinea = await Aerolinea.findById(id);
    if (!existeAerolinea) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}

//Verificar si el aeropuerto exite por id
const existeAeropuertoPorId = async(id) => {
    const existeAerolinea = await Aeropuerto.findById(id);
    if (!existeAerolinea) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}

//Verificar si el usuari exite por id
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Èl id ${id}, no existe en la DB`);
    }
}

//Verificar si el correo exite
const emailExiste = async(correo = '' ) => {
    const exisxteEmail = await Usuario.findOne({correo});
    if (exisxteEmail) {
        throw new Error(`Èl correo ${correo}, ya está registrado en la DB`);
    }
}

//Verificar si el vuelo exite
const vueloExiste = async(vuelo = '' ) => {
    const vueloExiste = await Vuelo.findOne({vuelo});
    if (vueloExiste) {
        throw new Error(`Èl vuelo ${vuelo}, ya está registrado en la DB`);
    }
}

module.exports = {
    existeAerolineaPorId,
    existeAeropuertoPorId,
    existeUsuarioPorId,
    emailExiste,
    vueloExiste
}
