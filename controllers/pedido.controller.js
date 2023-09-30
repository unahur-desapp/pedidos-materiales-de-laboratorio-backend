const Pedido = require("../models/pedido");

//Verbos para pedidos
//Post de un pedido
module.exports.postPedido = async(req, res) => { 
    const data = new Pedido({
      docente: req.body.docente,
      descripcion: req.body.descripcion,
      fecha_solicitud: req.body.fecha_solicitud,
      fecha_utilizacion: req.body.fecha_utilizacion,
      numero_laboratorio: req.body.numero_laboratorio,
      tipo_pedido: req.body.tipo_pedido,
      alumnos: req.body.alumnos,
      edificio: req.body.edificio,
      cantidad_grupos: req.body.cantidad_grupos,
      observaciones: req.body.observaciones,
      materia: req.body.materia,
      numero_tp: req.body.numero_tp,
      lista_equipos: req.body.lista_equipos,
      lista_reactivos: req.body.lista_reactivos,
      lista_materiales: req.body.lista_materiales
    });
  
    try {
      const dataToSave = await data.save();
      return res.status(200).json(dataToSave);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
};
  
module.exports.getPedidos = async(req, res) => {
    try {
      const data = await Pedido.find().populate({
        path: 'lista_equipos.equipo',
        select:
          'descripcion clase ', 
      })
        .populate({
          path: 'lista_materiales.material',
          select:
            'descripcion clase',
        })
        .populate({
          path: 'lista_reactivos.reactivo',
          select:
            'descripcion cas',
        });
        
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };  
  
  //Get All by dni docente
module.exports.getPedidosByDni = async(req, res) => {
    try {
      const dni = req.params.dni;
  
      const data = await Pedido.find({ "docente.dni": dni }).populate({
        path: 'lista_equipos.equipo',
        select:
          'descripcion clase',
      })
        .populate({
          path: 'lista_materiales.material',
          select:
            'descripcion clase',
        })
        .populate({
          path: 'lista_reactivos.reactivo',
          select:
            'descripcion cas',
        });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  //Get All By State (tipo_pedido)
module.exports.getPedidosByState = async(req, res) => {
  try {
    const tipo_pedido = req.params.tipo_pedido;

    const data = await Pedido.find({ "tipo_pedido": tipo_pedido }).populate({
      path: 'lista_equipos.equipo',
      select:
        'descripcion clase',
    })
      .populate({
        path: 'lista_materiales.material',
        select:
          'descripcion clase',
      })
      .populate({
        path: 'lista_reactivos.reactivo',
        select:
          'descripcion cas',
      });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// getAllUseDate/  fecha_utilizacion:
module.exports.getPedidosByDate = async(req, res) => {
  try {
    const dni = req.params.dni;

    const data = await Pedido.find({ "fecha_utilizacion": fecha_utilizacion }).populate({
      path: 'lista_equipos.equipo',
      select:
        'descripcion clase',
    })
      .populate({
        path: 'lista_materiales.material',
        select:
          'descripcion clase',
      })
      .populate({
        path: 'lista_reactivos.reactivo',
        select:
          'descripcion cas',
      });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getPedidosByDates = async(req, res) => {
  const { fecha_utilizacion, tipo_pedido, fecha_inicio, fecha_fin, edificio } = req.query;

  try {
      let query = {};

      if (fecha_utilizacion) {
      const fechaUtilizacionStart = new Date(fecha_utilizacion);
      fechaUtilizacionStart.setUTCHours(0, 0, 0, 0);
      const fechaUtilizacionEnd = new Date(fecha_utilizacion);
      
      fechaUtilizacionEnd.setUTCHours(23, 59, 59, 999);

      query.fecha_utilizacion = {
          $gte: fechaUtilizacionStart,
          $lte: fechaUtilizacionEnd
      };
      }

      if (tipo_pedido) {
      query.tipo_pedido = tipo_pedido;
      }
      if (fecha_inicio && fecha_fin) {
      const fechaUtilizacionStart = new Date(fecha_inicio);
      fechaUtilizacionStart.setUTCHours(0, 0, 0, 0);
      const fechaUtilizacionEnd = new Date(fecha_fin);
      fechaUtilizacionEnd.setUTCHours(23, 59, 59, 999);

      query.fecha_utilizacion = {
          $gte: fechaUtilizacionStart,
          $lte: fechaUtilizacionEnd
      };
      }
      if (edificio) {
      query.edificio = edificio;
      }
      const pedidos = await Pedido.find(query).populate({
      path: 'lista_equipos.equipo',
      select:
          'descripcion clase',
      })
      .populate({
          path: 'lista_materiales.material',
          select:
          'descripcion clase',
      })
      .populate({
          path: 'lista_reactivos.reactivo',
          select:
          'descripcion cas',
      });

      return res.json(pedidos);
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
};

//Get por id

module.exports.getPedidosById = async(req, res) => {
  try {
    const data = await Pedido.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update por id
module.exports.updatePedidoById = async(req, res) => {
  try {
    const id = req.params.id;
    
    const updatedData = req.body;
    const options = { new: true };

    const result = await Pedido.findByIdAndUpdate(id, updatedData, options);

    return res.send(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Delete por id
module.exports. deletePedidoById = async(req, res) => {
  try {
    const id = req.params.id;
    const data = await Pedido.findByIdAndDelete(id);
    return res.send(
      `Pedido con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
