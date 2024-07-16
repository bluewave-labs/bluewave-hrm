const jwt = require("jsonwebtoken");
require("dotenv").config();
const message = require("../constants/messages.json");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        res.status(404).json({ message: message.sessionExpired });
      } else {
        next();
      }
    });
  } else {
    res.status(404).json({ message: message.sessionExpired });
  }
};

module.exports = { requireAuth };
