const { Schema, model } = require('mongoose');

const AerolineasShema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    }
});

AerolineasShema.methods.toJSON = function (){
    const { __v, _id, estado,...aerolinea } = this.toObject();
    aerolinea.id = _id;
    return aerolinea;
}

module.exports = model('Aerolinea', AerolineasShema);