const express = require("express");
const {
  crearMaterial,
  getMaterial,
  getMateriales,
  getMaterialById,
  updateMaterialById,
  deleteMaterial,
} = require("../controllers/material.controller");
const router = express.Router();

router.post("/post", crearMaterial);
router.get("/", getMaterial);
router.get("/getAll", getMateriales);
router.get("/getOne/:id", getMaterialById);
router.patch("/update/:id", updateMaterialById);
router.delete("/delete/:id", deleteMaterial);

module.exports = router;
