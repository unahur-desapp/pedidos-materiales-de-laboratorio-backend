const express = require("express");
const {
  postPedido,
  getPedidos,
  getPedidosByDni,
  getPedidosByState,
  getPedidosByDate,
  getPedidosByDates,
  getPedidosById,
  updatePedidoById,
  deletePedidoById,
} = require("../controllers/pedido.controller");
const router = express.Router();

router.post("/post", postPedido);
router.get("/getAll", getPedidos);
router.get("/getAllByDni/:dni", getPedidosByDni);
router.get("/getAllByState/:tipo_pedido", getPedidosByState);
router.get("/getAllUseDate/:fecha_utilizacion", getPedidosByDate);
router.get("/", getPedidosByDates);
router.get("/getOne/:id", getPedidosById);
router.patch("/update/:id", updatePedidoById);
router.delete("/delete/:id", deletePedidoById);

module.exports = router;
