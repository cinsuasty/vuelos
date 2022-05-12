const { response } = require("express");
const { Vuelo } = require("../models");

// obtenerProductos - Pagina - Total - Populate
const obtenerVuelos = async(req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total,vuelos] = await Promise.all([
        Vuelo.countDocuments(query),
        Vuelo.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('aerolinea','nombre')
            .populate('origen','nombre')
            .populate('destino','nombre')
            .populate('usuario','nombre')
    ]);
    res.json({
        total,
        vuelos
    })
}

// Crear Vuelo
const crearVuelo = async( req, res = response) =>{

    const {fecha, usuario, origen, destino, aerolinea} =  req.body;
    const vuelo =  req.body.vuelo.toUpperCase();
    const asiento =  req.body.asiento.toUpperCase();
    const vueloDB = await Vuelo.findOne({vuelo});
    if (vueloDB){
        return res.status(400).json({
            msg: `El vuelo ${ vueloDB.vuelo } ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        vuelo,
        fecha,
        usuario,
        origen,
        destino,
        aerolinea,
        asiento
    }

    const vueloR = await new Vuelo(data);
    //Guardar DB
    await vueloR.save();

    res.status(201).json(vueloR);
}


module.exports = {
    obtenerVuelos,
    crearVuelo
}