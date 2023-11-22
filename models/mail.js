const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  id_emisor: {
    required: true,
    type: String,
  },
  mensaje: {
    required: true,
    type: String,
  },
  read: {
    type: Boolean,
  },
  id_pedido: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Mail", dataSchema);
