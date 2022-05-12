const { Schema, model } = require('mongoose');

const AeropuertosShema = Schema({

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

AeropuertosShema.methods.toJSON = function (){
    const { __v, _id, estado,...aeropuerto } = this.toObject();
    aeropuerto.id = _id;
    return aeropuerto;
}

module.exports = model('Aeropuerto', AeropuertosShema);