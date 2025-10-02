const { name } = require("ejs");
const nodemailer = require("nodemailer");
require('dotenv').config;


const transporter = nodemailer.createTransport({

  host: "sersmtp.gmail.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
     await transporter.sendMail(mailOptions);
    return res.render('../views/pages/emailSent.ejs');
    
  } catch (error) {
    return res.send('something went wrong');
  }
}

module.exports = {sendMail,transporter}