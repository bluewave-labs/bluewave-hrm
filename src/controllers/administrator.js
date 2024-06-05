const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");

exports.showAll = async (req, res) => {
  const data = await db.administrator.findAll({
    attributes: ["id", "email", "empId"],
  });
  if (!data) {
    res.send("No results found");
  }
  res.send(data);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.administrator.findAll({
    where: { id: id },
    attributes: ["id", "email", "empId"],
  });
  if (data === null) {
    res.status(400).send("Not found!");
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
    const count = await db.administrator.destroy({
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
