const express = require("express");
const {
  getUsers,
  getUserById,
  getUser,
  updateUserById,
  deleteUserById,
  getAdminById,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/getAll", getUsers);
router.get("/getOne/:id", getUserById);
router.get("/getAdmin/:id", getAdminById);
router.get("/", getUser);
router.patch("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

module.exports = router;
