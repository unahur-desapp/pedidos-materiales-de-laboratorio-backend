const express = require("express");
const { getMails, sendMail, deleteMail } = require("../controllers/mail.controller");
const router = express.Router();

router.get("/mails", getMails);
router.post("/send", sendMail);
router.delete("/delete", deleteMail);

module.exports = router;
