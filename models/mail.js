const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  
  id_pedido: {
    type: String,
  },
  list_mensajes :[
      {
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
      }
    }
  ]
});

module.exports = mongoose.model("Mail", dataSchema);
