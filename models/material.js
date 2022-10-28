const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    descripcion: {
        required: true,
        type: String,
    },
    cantidad: {
        required: true,
        type: Number,
    },
    unidadDeMedida: {
        required: true,
        type: Number,
    },
    clase: {
        required: true,
        type: String,
    },
    stock: {
        required: true,
        type: Number,
    }
});

module.exports = mongoose.model("Material", dataSchema);
