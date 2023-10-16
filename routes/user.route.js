const express = require("express");
const {
  getUsers,
  getUserById,
  getUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/getAll", getUsers);
router.get("/getOne/:id", getUserById);
router.get("/", getUser);
router.patch("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

module.exports = router;
