const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    descripcion: {
        required: true,
        type: String,
    },
    cas: {
        required: true,
        type: String,
    },
    calidad: {
        required: true,
        type: String,
    },
    concentracion_tipo: {
        required: true,
        type: String,
    },
    concentracion_medida: {
        required: true,
        type: Number,
    },
    disolvente: {
        required: true,
        type: String,
    },
    cantidad: {
        required: true,
        type: Number,
    }
});

module.exports = mongoose.model("Reactivo", dataSchema);