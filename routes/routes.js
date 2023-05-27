const express = require("express");
const router = express.Router();
const Equipo = require("../models/equipo");
const Pedido = require("../models/pedido");
const Material = require("../models/material");
const Reactivo = require("../models/reactivo");
const Usuario = require("../models/usuario");

//Verbos para equipos
//Post de un equipo
router.post("/equipo/post", async (req, res) => {
  const data = new Equipo({
    clase: req.body.clase,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    unidadMedida: req.body.unidadMedida,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/equipo/getAll", async (req, res) => {
  try {
    const data = await Equipo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por id
router.get("/equipo/getOne/:id", async (req, res) => {
  try {
    const data = await Equipo.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/equipo/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Equipo.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/equipo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Equipo.findByIdAndDelete(id);
    res.send(
      `Equipo con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



//Verbos para pedidos
//Post de un pedido
router.post("/pedido/post", async (req, res) => {
 
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
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/pedido/getAll", async (req, res) => {
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
      
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//Get All by dni docente
router.get("/pedido/getAllByDni/:dni", async (req, res) => {
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
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get All By State (tipo_pedido)

router.get("/pedido/getAllByState/:tipo_pedido", async (req, res) => {
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
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// getAllUseDate/  fecha_utilizacion:
router.get("/pedido/getAllUseDate/:fecha_utilizacion", async (req, res) => {
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
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/pedido', async (req, res) => {
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

    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get por id
router.get("/pedido/getOne/:id", async (req, res) => {
  try {
    const data = await Pedido.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/pedido/update/:id", async (req, res) => {
 

  try {
    const id = req.params.id;
    
    const updatedData = req.body;
    const options = { new: true };

    const result = await Pedido.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/pedido/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Pedido.findByIdAndDelete(id);
    res.send(
      `Pedido con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//Verbos para materiales
//Post de un material
router.post("/material/post", async (req, res) => {
  const data = new Material({
    clase: req.body.clase,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    unidadDeMedida: req.body.unidadDeMedida,
    cantidad: req.body.cantidad
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/material/getAll", async (req, res) => {
  try {
    const data = await Material.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por id
router.get("/material/getOne/:id", async (req, res) => {lista_reactivos
  try {
    const data = await Material.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/material/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Material.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/material/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Material.findByIdAndDelete(id);
    res.send(
      `Material con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Verbos para reactivos
//Post de un material
router.post("/reactivo/post", async (req, res) => {
  const data = new Reactivo({
    cas: req.body.cas,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/reactivo/getAll", async (req, res) => {
  try {
    const data = await Reactivo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por id
router.get("/reactivo/getOne/:id", async (req, res) => {
  try {
    const data = await Reactivo.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/reactivo/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Reactivo.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/reactivo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Reactivo.findByIdAndDelete(id);
    res.send(
      `Reactivo con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//Verbos para usuarios
//Post de un equipo
router.post("/usuario/post", async (req, res) => {
  const data = new Usuario({
    usuario: req.body.usuario,
    contrasenia: req.body.contrasenia,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    admin: req.body.admin,
    email: req.body.email,
    editor: req.body.editor
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/usuario/getAll", async (req, res) => {
  try {
    const data = await Usuario.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por id
router.get("/usuario/getOne/:id", async (req, res) => {
  try {
    const data = await Usuario.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por usuario y contrasenia
router.get("/usuario/getOneByUsuarioContrasenia/:usuario/:contrasenia", async (req, res) => {
  try {

    const usuario = req.params.usuario;
    const contrasenia = req.params.contrasenia;

    const data = await Usuario.find({ "usuario": usuario, "contrasenia": contrasenia });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/usuario/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Usuario.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/usuario/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Usuario.findByIdAndDelete(id);
    res.send(
      `Usuario con nombre ${data.nombre} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
