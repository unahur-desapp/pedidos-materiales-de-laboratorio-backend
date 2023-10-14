const express = require("express");
const {
  crearReactivo,
  getReactivo,
  getReactivos,
  getReactivosById,
  updateReactivoById,
  deleteReactivoById,
} = require("../controllers/reactivo.controller");
const router = express.Router();

router.post("/post", crearReactivo);
router.get("/", getReactivo);
router.get("/getAll", getReactivos);
router.get("/getOne/:id", getReactivosById);
router.patch("/update/:id", updateReactivoById);
router.delete("/delete/:id", deleteReactivoById);

module.exports = router;
