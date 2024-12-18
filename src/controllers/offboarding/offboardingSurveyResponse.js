const db = require("../../../models");
require("dotenv").config();
const message = require("../../../constants/messages.json");

exports.showAllResponse = async (req, res) => {
  try {
    const data = await db.offboardingSurveyResponse.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.showOneResponse = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.offboardingSurveyResponse.findOne({ where: { id } });
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.createResponse = async (req, res) => {
  try {
    const response = req.body;
    const data = await db.offboardingSurveyResponse.create(response);
    res.status(201).send(data);
  } catch (err) {
    console.log("err");
    res.status(400).send({ message: message.failed });
  }
};

exports.updateResponse = async (req, res) => {
  const id = req.body.id;
  try {
    const data = await db.offboardingSurveyResponse.findByPk(id);
    if (data === null) {
      console.log("No record found for the id ", id);
    } else {
      await data.set(req.body);
      await data.save();
    }
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};
exports.deleteResponse = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offboardingSurveyResponse.destroy({
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
    console.log(err);
    res.send({
      message: err.message || message.failed,
    });
  }
};
