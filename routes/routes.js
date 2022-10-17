const express = require("express");
const router = express.Router();
const Equipo = require("../models/equipo");
const Pedido = require("../models/pedido");

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
    cantidad_grupos: req.body.cantidad_grupos,
    observaciones: req.body.observaciones,
    materia: req.body.materia,
    numero_tp: req.body.numero_tp,
    lista_equipos: req.body.lista_equipos
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
        'descripcion clase',
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
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



module.exports = router;
