const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // host of mail server
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "buibinh08012002@gmail.com",
    pass: "ekld wwjc gszh hblg",
  },
});

const sendMail = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: '"Maddison F88" <buibinh08012002@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text: "Hello world?", // plain text body
    html: message, // html body
  });
  return info;
};

module.exports = sendMail;
