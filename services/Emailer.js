const nodemailer = require("nodemailer");
require('dotenv').config;
const transporter = nodemailer.createTransport({

  host: "sersmtp.gmail.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const mailOptions = {

 
    from: '"FinTrack" <SLX@FinTrack.email>',
    to: '' ,
    subject: "forgot Password ",
   
    html: "../views/pages/forgotPasswordMAil.ejs"
  }