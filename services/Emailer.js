const { name } = require("ejs");
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


async function sendMail(transporter,email){
  try {
    const mailOptions = {
      from:{
       name:"FinTrack",
       address: process.env.EMAIL_USER,
      },   
      to: email ,
      subject: "forgot Password ", 
      html: "../views/pages/forgotPasswordMAil.ejs"
    }
    transporter.sendMail(mailOptions);
    return res.render('../views/pages/emailSent.ejs');
    
  } catch (error) {
    return res.send('something went wrong');
  }
}