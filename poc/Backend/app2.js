const nodemailer = require("nodemailer");
const express = require("express");

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
async function sendMail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "abhaynhes@gmail.com",
        pass: "dkywdrrvfilejyuz",
      },
    });

    let res = await transporter.sendMail({
      from: "noreply", // sender address
      to: "abhaynhes@gmail.com", // list of receivers
      subject: "Test", // Subject line
      text: "test", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return res;
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
