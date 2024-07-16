const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const {getComparator} = require("../helper/utils");
const { where } = require("sequelize");



exports.showAll = async (req, res) => {
  const data = await db.document.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!data) {
    res.send("No results found");
  }
  res.send(data);
};

exports.showOne = async (req, res) => {
    // Document entity depends on employee entity. Query of document entity will be better done using empId.
  const empid = req.params.empid;
  const data = await db.document.findOne({where: {empId: empid}});
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
    // Note req.body.documentFile should a binary data
  try {
    const data = await db.document.create(req.body);
    res.status(201).json({data});
  } catch (err) {
    console.log(err);
    res.send({message : message.failed});
  }
};

exports.updateRecord = async (req, res) => {
        // Note req.body.documentFile should a binary data
  const updatedData = req.body;
  try {
    const data = await db.document.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({message: message.failed});
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.document.destroy({
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
