const jwt = require("jsonwebtoken");
require("dotenv").config();
const message = require("../constants/messages.json");
const e = require("express");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
       next();
       // res.status(404).json({ message: message.sessionExpired });
      } else {
        next();
      }
    });
  } else {
    next();

    // res.status(404).json({ message: message.sessionExpired });
  }
};

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

const getAuthUser = (token) => {
  if (token) {
    return parseJwt(token).id;
  }
  return null;
};

module.exports = { requireAuth, getAuthUser };
