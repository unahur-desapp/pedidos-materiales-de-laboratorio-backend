const express = require("express");
const { getMails, sendMail, deleteMail } = require("../controllers/mail.controller");
const router = express.Router();

router.get("/mails/:id", getMails);
router.post("/send", sendMail);
router.delete("/delete/:id", deleteMail);

module.exports = router;
