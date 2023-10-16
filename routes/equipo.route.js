const express = require("express");
const {
  crearEquipo,
  getEquipo,
  getEquipos,
  getEquipoById,
  updateEquipoById,
  deleteEquipoById,
} = require("../controllers/equipo.controller");
const router = express.Router();

router.post("/post", crearEquipo);
router.get("/", getEquipo);
router.get("/getAll", getEquipos);
router.get("/getOne/:id", getEquipoById);
router.patch("/update/:id", updateEquipoById);
router.delete("/delete/:id", deleteEquipoById);

module.exports = router;
