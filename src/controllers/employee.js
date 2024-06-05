const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

exports.showAll = async (req, res) => {
  const employee = await db.employee.findAll({
    // include: { all: true, nested: false }, // This will display all the data pertaining to employee table
    attributes: { exclude: ["photo", "createdAt", "updatedAt"] },
  });
  if (!employee) {
    res.send("No results found");
  }
  res.send(employee);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id);
  if (employee === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(employee);
  }
};

exports.createRecord = async (req, res) => {
  //checking for email already exists
  const check = await db.employee.findOne({ where: { email: req.body.email } });
  if (check) {
    return res.send(message.alreadyExists);
  }
  try {
    const data = await db.employee.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.send(err);
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for email already exists
  const check = await db.employee.findOne({
    where: {
      email: req.body.email,
      empId: {
        [db.Sequelize.Op.not]: updatedData.empId,
      },
    },
  });
  if (check) {
    return res.send(message.alreadyExists);
  }
  try {
    const employee = await db.employee.findByPk(updatedData.empId);
    employee.set(updatedData);
    await employee.save();
    res.status(200).json({ message: employee });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteRecord = async (req, res) => {
  const empId = req.params.id;
  try {
    const count = await db.employee.destroy({
      where: { empId: empId },
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
