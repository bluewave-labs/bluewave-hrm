const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const sample = require("./authentication")
const { getComparator } = require("../helper/utils");

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
  console.log("ID", id);
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
// The aim of this route is to check if the database is not empty.
// It sends true if database is not empty or false if otherwise.
exports.init = async (req, res) => {
  const data = await db.appUser.findOne();
  if (data === null) {
    res.status(200).json({message: false})
  } else {
    res.status(200).json({message: true});
  }
};

exports.createRecord = async (req, res) => {
  // This route should redirect user to registration page
  //Implementation will be done later
  console.log(req.body);
  // res.send(
  //   `<h4>Sorry, registration page is under construction. Please try again later.</h4> ${req.protocol}`
  // );
  sample.logout(req, res);
 // res.redirect("company/prop/logo")
};

exports.updateRecord = async (req, res) => {
  //This route should redirect user to change of password page
  //Implementation will be done later
  res.send(
    `<h4>Sorry, the requested page is under construction. Please try again later.</h4>`
  );
  //res.redirect("/singup");
};

exports.deleteRecord = async (req, res) => {
  // This route should be further implemented such that if the deleted admin
  // should be automatically logged out of the application.
  const id = req.params.id;
  try {
    const count = await db.appUser.destroy({
      where: { id: id },
    });
    if (count == 1) {
      res.send({
        message: message.deleted,
      });
    } else {
      res.send({
        message: message.failed,
      });
    }
  } catch (err) {
    res.send({
      message: err.message || message.failed,
    });
  }
};
