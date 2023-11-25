const express = require("express");
const { getMails, sendMail, deleteMail,updateMails } = require("../controllers/mail.controller");
const router = express.Router();

router.get("/mails/:id", getMails);
router.post("/send", sendMail);
router.put("/update",updateMails);
router.delete("/delete/:id", deleteMail);

module.exports = router;
