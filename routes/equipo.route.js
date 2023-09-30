const express = require("express");
const { crearEquipo, getEquipo, getEquipos, getEquipoById, updateEquipoById } = require("../controllers/equipo.controller");
const router = express.Router();

router.post("/post",crearEquipo);
router.get("/",getEquipo);
router.get("/getAll",getEquipos);
router.patch("/update/:id", getEquipoById);
router.delete("/delete/:id",updateEquipoById);

module.exports = router;