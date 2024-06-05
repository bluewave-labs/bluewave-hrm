const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Utility function to send an email to a user
 * @param {*} option include has three properties email (email address of the recipient), subject (email subject) and 
 * message (body of the mail) 
 */
exports.sendEmail = async (option) => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    //service: "Yahoo",
    //secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const emailOptions = {
    from: `BlueWave HRM support<${process.env.EMAIL}>`,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};