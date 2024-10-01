const nodemailer = require("nodemailer");
// require("dotenv").config();
const mjml2html = require("mjml");

/**
 * Utility function to send an email to a user
 * @param {*} option include has three properties email (email address of the recipient), subject (email subject) and
 * message (body of the mail)
 */
exports.sendEmail = async (option) => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    service: "gmail",
    secure: false,
    auth: {
      user: "4cc626b7b76067",
      pass: "4504d43e40f45f",
    },
  });

  // Define email options
  const emailOptions = {
    from: `BlueWave HRM support`,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};
