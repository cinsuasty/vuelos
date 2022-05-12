
const { Schema, model } = require('mongoose');

const UsuarioShema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

UsuarioShema.methods.toJSON = function (){
    const { __v,...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioShema);