var express = require("express");
var router = express.Router();

const sendMail = require("../utils/mail.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/send-mail", async (req, res) => {
  const info = await sendMail(
    "anhngochoang912@gmail.com",
    "Authentication",
    "Mã xác minh của bạn là: James Maddison"
  );
  console.log(info);
  res.send("gui email");
});

module.exports = router;
