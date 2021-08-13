const nodemailer = require("nodemailer");
const express = require("express");

const app = express();
async function sendMail() {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3ef3ad2c19e361",
        pass: "a0f51827ada093",
      },
    });
    let info = await transporter.sendMail({
      from: "abhaykumar@ssd.com", // sender address
      to: "baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    return error;
  }
}

sendMail()
  .then(function () {
    console.log("mail Sent..!!");
  })
  .catch(function () {
    console.log("Failed");
  });

app.listen(5500, function () {
  console.log("server started at 3000");
});
