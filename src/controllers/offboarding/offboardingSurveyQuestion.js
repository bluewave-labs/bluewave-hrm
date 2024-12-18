const db = require("../../../models");
require("dotenv").config();
const message = require("../../../constants/messages.json");

exports.showAllQuestion = async (req, res) => {
  try {
    const data = await db.offboardingSurveyQuestion.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: message.failed });
  }
};

exports.showOneQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.offboardingSurveyQuestion.findOne({ where: { id } });
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: message.failed });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const data = await db.offboardingSurveyQuestion.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

//It takes an array of offboardingSurvey question objects.
// [{}, {}]
exports.createManyQuestion = async (req, res) => {
  try {
    const data = await db.offboardingSurveyQuestion.bulkCreate(req.body, {
      validate: true,
    });
    //console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateQuestion = async (req, res) => {
  const data = req.body;
  try {
    const updatedData = await db.offboardingSurveyQuestion.findByPk(data.id);
    if (updatedData === null) {
      console.log("No record found for the id ", data.id);
    } else {
     await updatedData.set(data);
      await updatedData.save();
    }
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.updateManyQuestion = async (req, res) => {
  const data = req.body;
  var count = 0;
  try {
    for (let record of data) {
      const id = record.id;
      const updatedData = await db.offboardingSurveyQuestion.findByPk(id);
      if (updatedData === null) {
        console.log("No record found for the id ", id);
      } else {
        await updatedData.set(record);
        await updatedData.save();
        count++;
      }
    }
    res
      .status(200)
      .json({ message: `${count < 2 ? "entity" : "entities"} updated`, count });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offboardingSurveyQuestion.destroy({
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

exports.deleteManyQuestion = async (req, res) => {
  const ids = req.body;
  console.log(ids);
  try {
    const count = await db.offboardingSurveyQuestion.destroy({
      where: { id: ids },
    });
    if (count > 0) {
      res.send({
        message: `${count < 2 ? "entity" : "entities"} deleted`,
        count,
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
