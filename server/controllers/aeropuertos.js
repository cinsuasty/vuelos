const { response , request } = require("express");
const { Aeropuerto } = require("../models");

// obtenerAeropuertos - Pagina - Total - Populate
const obtenerAeropuertos = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,aeropuertos] = await Promise.all([
        Aeropuerto.countDocuments(query),
        Aeropuerto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        aeropuertos
    })
}

// Crear aeropuerto
const crearAeropuerto = async( req, res = response) =>{

    const nombre =  req.body.nombre.toUpperCase();

    const aeropuertoDB = await Aeropuerto.findOne({nombre});

    if (aeropuertoDB){
        return res.status(400).json({
            msg: `El aeropuerto ${ aeropuertoDB.nombre } ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        nombre
    }

    const aeropuerto = await new Aeropuerto(data);
    //Guardar DB
    await aeropuerto.save();

    res.status(201).json(aeropuerto);
}

// Obtener una aeropuerto por id 

const obtenerAeropuerto = async(req = request, res = response) => {
    const { id } = req.params;

    const aeropuerto = await Aeropuerto.findById(id);

    res.json(aeropuerto);
}

// actualizarAeropuerto

const actualizarAeropuerto = async (req, res = response) => {
    
    const { id } = req.params;
    const {estado, ...data} = req.body;
    data.nombre =  data.nombre.toUpperCase();
    const aeropuertoDB = await Aeropuerto.findOne({nombre: data.nombre});

    if (aeropuertoDB){
        return res.status(400).json({
            msg: `El aeropuerto ${ aeropuertoDB.nombre } ya existe`
        });
    }
    const aeropuerto = await Aeropuerto.findByIdAndUpdate(id, data,{new:true});
    res.json(aeropuerto);
}

// borrarAeropuerto - estado:false
const borrarAeropuerto = async(req, res = response) => {

    const { id } = req.params;
    const aeropuerto = await Aeropuerto.findByIdAndUpdate(id, {estado: false},{new:true});
    res.json(aeropuerto);
}

module.exports = {
    obtenerAeropuertos,
    obtenerAeropuerto,
    crearAeropuerto,
    actualizarAeropuerto,
    borrarAeropuerto
}