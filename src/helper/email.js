const nodemailer = require("nodemailer");
require("dotenv").config();
const mjml2html = require("mjml");

/**
 * Utility function to send an email to a user
 * @param {*} option include has three properties email (email address of the recipient), subject (email subject) and
 * message (body of the mail)
 */
exports.sendEmail = async (option) => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
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
