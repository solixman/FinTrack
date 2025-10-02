const { name } = require("ejs");
const nodemailer = require("nodemailer");
require('dotenv').config();
const fs = require("fs");
const path = require("path");

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


async function sendMail(email) {
  try {
    const filePath = path.join(__dirname, "../views/pages/forgotPasswordMail.html");
    const html = fs.readFileSync(filePath, "utf-8");

    const mailOptions = {
      from: { name: "FinTrack", address: process.env.EMAIL_USER },
      to: email,
      subject: "Forgot Password",
      html
    };

   const results= transporter.sendMail(mailOptions);

    return { success: true, results };
  } catch (error) {
    console.log("error in mailzr: " + error);
    return { success: false, error };
  }
}

module.exports = { sendMail }