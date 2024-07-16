const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

exports.showManagers = async (req, res) => {
  const departmentLeadId = await db.department.findAll({
    attributes: [["departmentManagerId", "id"]],
  });

  const teamLeadId = await db.team.findAll({
    attributes: [["teamLeadId", "id"]],
  });

  const ids = [];
  for (let emp of departmentLeadId) {
    if (emp.id && !ids.includes(emp.id)) {
      ids.push(emp.id);
    }
  }
  for (let emp of teamLeadId) {
    if (emp.id && !ids.includes(emp.id)) {
      ids.push(emp.id);
    }
  }

  const managers = await db.employee.findAll({
    attributes: ["empId", "firstName", "lastName"],
    order: ["firstName", "lastName"],
    where: { empId: ids },
  });

  res.json(managers);
};

exports.showAll = async (req, res) => {
  const employee = await db.employee.findAll({
    //include: { all: true, nested: false }, // This will display all the data pertaining to employee table
    include: [
      "role",
      "department",
      "team",
      "socialProfiles",
      {
        model: db.employee,
        as: "Manager",
      },
    ],
  });
  if (!employee) {
    res.send("No results found");
  }
  for (let index = 0; index < employee.length; index++) {
    employee[index].photo =
      employee[index].photo && employee[index].photo.toString("base64");
    if (employee[index].Manager) {
      employee[index].Manager.photo =
        employee[index].Manager.photo &&
        employee[index].Manager.photo.toString("base64");
    }
  }
  res.send(employee);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id, {
    include: [
      "role",
      "department",
      "team",
      "socialProfiles",
      {
        model: db.employee,
        as: "Manager",
      },
    ],
  });
  if (employee === null) {
    res.status(400).send("Not found!");
  } else {
    employee.photo = employee.photo && employee.photo.toString("base64");
    if (employee.Manager) {
      employee.Manager.photo =
        employee.Manager.photo && employee.Manager.photo.toString("base64");
    }
    res.status(200).send(employee);
  }
};

exports.findOneByEmail = async (req, res) => {
  if (!req.body.email) {
    return res.send(null);
  }
  const employee = await db.employee.findOne({
    include: [
      "role",
      "department",
      "team",
      "socialProfiles",
      {
        model: db.employee,
        as: "Manager",
      },
    ],
    where: { email: req.body.email.toLowerCase() },
  });
  if (employee === null) {
    res.send(null);
  } else {
    employee.photo = employee.photo && employee.photo.toString("base64");
    if (employee.Manager) {
      employee.Manager.photo =
        employee.Manager.photo && employee.Manager.photo.toString("base64");
    }
    res.status(200).json(employee);
  }
};

exports.createRecord = async (req, res) => {
  //checking for email already exists
  const check = await db.employee.findOne({ where: { email: req.body.email } });
  if (check) {
    return res.send(message.alreadyExists);
  }
  try {
    const data = await db.employee.create(req.body, {
      include: ["socialProfiles"],
    });
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
