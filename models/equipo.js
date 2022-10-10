const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  clase: {
    required: true,
    type: String,
  },
  descripcion: {
    required: true,
    type: String,
  },
  stock: {
    required: true,
    type: Number,
  },
  unidadMedida: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Equipo", dataSchema);
