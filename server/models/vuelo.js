const { Schema, model } = require('mongoose');

const VuelosShema = Schema({

    vuelo:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    fecha:{
        type: Date,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    origen:{
        type: Schema.Types.ObjectId,
        ref: 'Aeropuerto',
        required: true
    },
    destino:{
        type: Schema.Types.ObjectId,
        ref: 'Aeropuerto',
        required: true
    },
    aerolinea:{
        type: Schema.Types.ObjectId,
        ref: 'Aerolinea',
        required: true
    },
    asiento:{
        type: String,
        required: [true,'El nombre es obligatorio'],
    }
});

VuelosShema.methods.toJSON = function (){
    const { __v, _id, estado,...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Vuelo', VuelosShema);