const { response , request } = require("express");
const { Aerolinea } = require("../models");

// obtenerProductos - Pagina - Total - Populate
const obtenerAerolineas = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,aerolineas] = await Promise.all([
        Aerolinea.countDocuments(query),
        Aerolinea.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        aerolineas
    })
}

// Crear aerolinea
const crearAerolinea = async( req, res = response) =>{

    const nombre =  req.body.nombre.toUpperCase();

    const aerolinaDB = await Aerolinea.findOne({nombre});

    if (aerolinaDB){
        return res.status(400).json({
            msg: `La aerolinea ${ aerolinaDB.nombre } ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        nombre
    }

    const aerolinea = await new Aerolinea(data);
    //Guardar DB
    await aerolinea.save();

    res.status(201).json(aerolinea);
}

// Obtener una aerolinea por id 

const obtenerAerolinea = async(req = request, res = response) => {
    const { id } = req.params;

    const aerolinea = await Aerolinea.findById(id);

    res.json(aerolinea);
}

// actualizarAerolinea

const actualizarAerolinea = async (req, res = response) => {
    
    const { id } = req.params;
    const {estado, ...data} = req.body;
    data.nombre =  data.nombre.toUpperCase();
    const aerolinaDB = await Aerolinea.findOne({nombre: data.nombre});

    if (aerolinaDB){
        return res.status(400).json({
            msg: `La aerolinea ${ aerolinaDB.nombre } ya existe`
        });
    }
    const aerolinea = await Aerolinea.findByIdAndUpdate(id, data,{new:true});
    res.json(aerolinea);
}

// borrarAerolinea - estado:false
const borrarAerolinea = async(req, res = response) => {

    const { id } = req.params;
    const aerolinea = await Aerolinea.findByIdAndUpdate(id, {estado: false},{new:true});
    res.json(aerolinea);
}

module.exports = {
    obtenerAerolineas,
    crearAerolinea,
    obtenerAerolinea,
    actualizarAerolinea,
    borrarAerolinea
}