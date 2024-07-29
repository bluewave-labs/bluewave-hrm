const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");

exports.showAll = async (req, res) => {
  const data = await db.permission.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.permission.findByPk(id);
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  //checking for permission name already exists
  try {
    const check = await db.permission.findOne({
      where: getComparator(db, "type", req.body.type),
    });
    if (check) {
      return res.send(`${req.body.type} already exists.`);
    }
    const data = await db.permission.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for permission name already exists
  const check = await db.permission.findOne({
    where: {
      id: {
        [db.Sequelize.Op.not]: updatedData.id,
      },
      where: getComparator(db, "type", req.body.type),
    },
  });
  if (check) {
    return res.send(`${req.body.type} already exists.`);
  }
  try {
    const data = await db.permission.findByPk(updatedData.id);
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
    const count = await db.permission.destroy({
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
