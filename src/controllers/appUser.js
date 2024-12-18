const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const crypto = require("crypto");
const EmailService = require("../helper/emailServices");
const { createEmailContext } = require("../helper/utils");
const { getAuthUser } = require("../../config/authJwt");

exports.showAll = async (req, res) => {
  const data = await db.appUser.findAll({
    attributes: ["id", "email", "empId", "firstName", "lastName", "access"],
    include: [db.permission],
  });
  if (!data) {
    return res.send([]);
  }
  res.status(200).send(data);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.appUser.findByPk(id, {
    attributes: ["email", "empId", "firstName", "lastName", "access"],
    include: [db.permission],
  });
  if (data === null) {
    res.send([]);
  } else {
    res.status(200).send(data);
  }
};

exports.findByEmail = async (req, res) => {
  if (!req.body.email) {
    return res.send(null);
  }
  const data = await db.appUser.findOne({
    attributes: ["email", "empId", "firstName", "lastName", "access"],
    include: [db.permission],
    where: { email: req.body.email.toLowerCase() },
  });
  if (data === null) {
    res.send(null);
  } else {
      res.status(200).send(data);
  }
};

exports.findByToken = async (req, res) => {
  if (!req.body.token) {
    return res.status(400).json({
      error: message.invalidToken,
    });
  }

  //Hash the plain token
  const token = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  //Find user based on the parameter token
  const user = await db.appUser.findOne({
    attributes: ["email", "empId", "firstName", "lastName", "access"],
    include: [db.permission],
    where: {
      passwordResetToken: token,
      passwordResetTokenExpiresAt: { [db.Sequelize.Op.gt]: Date.now() },
    },
  });
  if (!user) {
    // If user is null, the token is invalid or expired
    return res.status(400).json({
      error: message.invalidToken,
    });
  }
  res.status(200).send(user);
};

// The aim of this route is to check if the database is not empty.
// It sends true if database is not empty or false if otherwise.
exports.init = async (req, res) => {
  const data = await db.appUser.findOne();
  if (data === null) {
    res.status(200).json({ message: false });
  } else {
    res.status(200).json({ message: true });
  }
};

exports.createRecord = async (req, res) => {
  const { empId, firstName, lastName, email, frontendUrl } = req.body;

  // Generate a random reset token
  const resetToken = crypto.randomBytes(64).toString("hex");
  // Hash resetToken
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

  // Send the plain resetToken to the user email and user record
  const resetUrl = `${frontendUrl}${resetToken}`;
  //const message = `Please use the link below to set your password\n\n${resetUrl}\n\nThis link will expire in 30 days.`;
  //console.log("\n\n\n",resetUrl, "\n\n\n");

  try {
    const userData = {
      empId,
      firstName,
      lastName,
      email,
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpiresAt: expiresAt,
      password: crypto.randomBytes(64).toString("hex"),
    };
    const user = await db.appUser.create(userData);
    // Save new password in the passwordHistory table
    db.passwordHistory.create({
      userId: user.id,
      password: user.password,
      passwordCreatedAt: new Date(),
    });

    // Create and send email
    const context = await createEmailContext({ email, db });
    context.resetUrl = resetUrl;  
    const emailService = new EmailService();
    const messageId = await emailService.buildAndSendEmail(
      "newEmployeeActivation", // Template name
      context, 
      email, // receiver's email
      "Account Activation" // Subject
    );
    console.log(`Email sent successfully! Message ID: ${messageId}`);

    res.status(200).json({
      status: "success",
      message: "password reset link sent to the user email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message, //There is an error sending password reset email. Please try again later.
    });
  }
};

//This function allows the update of a user’s permissionId and access.
// Updating other values can be done through updateRecord function in
// in employee.js controller and authentication.js
exports.updateRecord = async (req, res) => {
  const { id, empId, permissionId, access } = req.body;
  const user = await db.appUser.findByPk(id);
  let count = 0;
  if (user) {
    if (permissionId) {
      user.permissionId = permissionId;
      count++;
    }
    if (access) {
      user.access = access;
      count++;
    }
    await user.save();
    return res.json({ changeCount: count });
  }
  res.json({ changeCount: count });
};

//This function allows the update of multiple users' permissionId and access.
exports.updateBulkRecord = async (req, res) => {
  const users = req.body; //Expected an array of users
  let count = 0;
  for (let data of users) {
    const { id, empId, permissionId, access } = data;
    const user = await db.appUser.findByPk(id);
    if (user) {
      if (permissionId) {
        user.permissionId = permissionId;
      }
      if (access) {
        user.access = access;
      }
      await user.save(); 
      count++
    }
  }
  res.json({ changeCount: count });
};

exports.deleteRecord = async (req, res) => {
  // Record deleted has been implemented in employee.js controller - deleteRecord
  res.send("Not available. Try another route.")
// The following codes are commented to avoid accidental deletion of record.
  // const id = req.params.id;
  // try {
  //   const count = await db.appUser.destroy({
  //     where: { id: id },
  //   });
  //   if (count == 1) {
  //     res.send({
  //       message: message.deleted,
  //     });
  //   } else {
  //     res.send({
  //       message: message.failed,
  //     });
  //   }
  // } catch (err) {
  //   res.send({
  //     message: err.message || message.failed,
  //   });
  // }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send(null);
  }
  const email = getAuthUser(token);
  if (!email) {
    return res.status(401).send(null);
  }
  req.body = { email };
  this.findByEmail(req, res);
};
