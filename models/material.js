const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  descripcion: {
    required: true,
    type: String,
  },

  unidadMedida: {
    required: true,
    type: String,
  },
  clase: {
    required: true,
    type: String,
  },
  stock: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Material", dataSchema);
