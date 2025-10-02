const { name } = require("ejs");
const nodemailer = require("nodemailer");
require('dotenv').config();
const ejs = require('ejs');


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


async function sendMail(token,email) {
  try {
    const html = await ejs.renderFile(
      __dirname + "/../views/pages/forgotPasswordMail.ejs",
      {resetToken: token}
    );

    const mailOptions = {
      from: { name: "FinTrack", address: process.env.EMAIL_USER },
      to: email,
      subject: "Forgot Password",
      html
    };

    const results = transporter.sendMail(mailOptions);

    return { success: true, results };
  } catch (error) {
    console.log("error in mailzr: " + error);
    return { success: false, error };
  }
}

module.exports = { sendMail }