const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/VerifyToken");

router.post("/register",verifyToken ,register);
router.post("/login", login);

module.exports = router;
