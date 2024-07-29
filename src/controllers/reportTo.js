const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

exports.showAll = async (req, res) => {
  const data = await db.reportTo.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  const empId = req.params.empid;
  const data = await db.reportTo.findAll({
    where: { empId: empId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (data) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const mgrId = data[i].empMgrId;
      const newData = {};
      arr.push(newData);
      newData.id = data[i].id;
      newData.empId = data[i].empId;
      newData.manager = data[i].empMgrId;
      newData.priority = data[i].priority;
      if (mgrId) {
        const manager = await db.employee.findOne({
          where: { empId: mgrId },
          include: "role",
        });
        if (manager) {
          const details = {};
          details.id = manager.empId;
          details.firstName = manager.firstName;
          details.lastName = manager.lastName;
          details.preferredName = manager.preferredName;
          details.role = manager.role.roleTitle;
          newData.manager = details;
        }
      }
    }
    res.status(200).send(arr);
  } else {
    res.status(400).send("Not found!");
  }
};

exports.createRecord = async (req, res) => {
  try {
    const data = await db.reportTo.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.reportTo.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.reportTo.destroy({
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
