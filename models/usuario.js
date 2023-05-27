const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    usuario: {
        required: true,
        type: String
    },
    contrasenia: {
        required: true,
        type: String
    },
    nombre: {
        required: true,
        type: String
    },
    apellido: {
        required: true,
        type: String
    },
    dni: {
        required: true,
        type: Number
    },
    matricula: {
        required: false,
        type: Number
    },
    admin: {
        required: true,
        type: Boolean
    },
    email:{
        required: true,
        type: String 
    },
    editor: {
        required: true,
        type: Boolean
    },

});

module.exports = mongoose.model("Usuario", dataSchema);