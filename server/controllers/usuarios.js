const { response , request} = require('express');

const Usuario = require('../models/usuario');

// Listar usuarios
const obtenerUsuarios = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    })
}

// Obtener una aeropuerto por id 

const obtenerUsuario = async(req = request, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    res.json(usuario);
}


// Crear usuario
const crearUsuario = async (req, res = response) => {

    const {nombre, correo} = req.body;
    const usuario = new Usuario({nombre, correo});

    //Guardar en DB
    await usuario.save();

    res.json(usuario);
}
//Actualizar usuario
const actualizarUsuario = async (req, res = response) => {
    const { id } = req.params;
    const {_id,correo, ...resto} = req.body;

    // TODO validar contra db

    const usuario = await Usuario.findOneAndUpdate(id, resto,{new:true});

    res.json(usuario);
}

const eliminarUsuario = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false},{new:true});
    res.json(usuario);
}


module.exports= {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuario
}
