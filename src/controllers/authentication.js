const db = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const EmailService = require("../helper/emailServices");
const { createEmailContext } = require("../helper/utils");
const { validatePassword } = require("../helper/validation");
const message = require("../../constants/messages.json");

// create json web token
const maxAge = 3 * 60 * 60; // 3 hours
const createToken = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  try {
    const user = await db.appUser.create(req.body);
    // Save password in the passwordHistory table
    db.passwordHistory.create({
      userId: user.id,
      password: user.password,
      passwordCreatedAt: new Date(),
    });
    const token = createToken(user.email);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.email });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: message.loginError });
    }
    // Check if the email exists
    const user = await db.appUser.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user) {
      const auth = await bcrypt.compare(password, user.password); // Check if the password matched
      if (auth) {
        const token = createToken(user.email);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: user.email });
      }
    }
    return res.status(400).json({ error: message.loginError });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "You've successfully logged out." });
};

// This api sends a password resetToken to user
const forgotPassword = async (req, res) => {
  try {
    // Get user based on the posted email
    const { email, frontendUrl } = req.body;
    const user = await db.appUser.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account is associated with this email" });
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(64).toString("hex");
    // Hash resetToken
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 25); // 25 min from now

    // Send the plain resetToken to the user email and update user's passwordResetToken and passwordResetTokenExpiresAt in the database
    const resetUrl = `${frontendUrl}${resetToken}`;
    
   // console.log("\n\n\nPassword reset link:", resetUrl, "\n\n\n");

    user.set({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpiresAt: expiresAt,
    });
    await user.save();

    const context = await createEmailContext({ email, db });
    context.resetUrl = resetUrl;  
    const emailService = new EmailService();
    const messageId = await emailService.buildAndSendEmail(
      "resetpassword",
      context,
      email, // to be replaced with the receiver's email
      "Password change request" // Subject
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

//This api enables unverified user to reset password
const resetPassword = async (req, res) => {
  //Hash the plain token
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //Find user based on the parameter token
  const user = await db.appUser.findOne({
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

  const { password, confirmPassword } = req.body;

  // Check if password and confirmPassword matched
  if (password !== confirmPassword) {
    return res.status(400).json({
      passwordError: message.notMatched,
    });
  }

  //Check if password had been used before.
  const passwordHistory = await db.passwordHistory.findAll({
    where: { userId: user.id },
  });
  for (let history of passwordHistory) {
    const used = await bcrypt.compare(password, history.password); // Check if password matched any password already used by the user.
    if (used) {
      return res.status(400).json({
        error: message.usedPassword,
      });
    }
  }
  const now = new Date();

  //Update current password passwordChangedAt date.
  const currentPassword = await db.passwordHistory.findOne({
    where: {
      userId: user.id,
      password: user.password,
    },
  });

  if (currentPassword) {
    currentPassword.set({ passwordChangedAt: now });
    await currentPassword.save();
  }

  //Update user object
  user.set({
    password: password, //Reset password
    passwordChangedAt: now,
    passwordResetToken: null,
    passwordResetTokenExpiresAt: null,
  });
  await user.save();

  // Save new password in the passwordHistory table
  db.passwordHistory.create({
    userId: user.id,
    password: user.password,
    passwordCreatedAt: now,
  });

  res.json({
    message: message.passwordChanged,
    user: user.email,
  });
};

// This api enables verified user to change password
const resetPasswordAuth = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    const result = jwt.verify(token, process.env.secret);
    const { password, newPassword, confirmNewPassword } = req.body;
    const user = await db.appUser.findOne({
      where: { email: result.id },
    });
    if (!user) {
      // This is not expected to happen
      return res.status(404).json({ error: message.notFound });
    }
    const auth = await bcrypt.compare(password, user.password); // Check if the password matched
    if (!auth) {
      return res.status(400).json({ error: message.passwordError });
    }

    // Check if the new password is valid
    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.isValid) {
      return res.status(400).json({
        passwordError: passwordCheck.message,
      });
    }

    // Check if password and confirmPassword matched
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        error: message.notMatched,
      });
    }

    user.set({
      password: newPassword, //Reset password
      passwordChangedAt: new Date(),
    });

    await user.save();
    return res.status(200).json({ message: message.passwordChanged });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: message.sessionExpired });
  }
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  resetPasswordAuth,
};
