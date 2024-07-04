const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
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

exports.createRecord = async (req, res) => {
  // This route should redirect user to registration page
  //Implementation will be done later
  res.send(
    `<h4>Sorry, registration page is under construction. Please try again later.</h4>`
  );
};

exports.updateRecord = async (req, res) => {
  //This route should redirect user to change of password page
  //Implementation will be done later
  res.send(
    `<h4>Sorry, the requested page is under construction. Please try again later.</h4>`
  );
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
