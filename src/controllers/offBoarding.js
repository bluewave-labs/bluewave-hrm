const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const {getComparator} = require("../helper/utils");
const { where } = require("sequelize");



exports.showAll = async (req, res) => {
    try {
        const data = await db.offBoarding.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
          });
          if (!data) {
            res.send("No results found");
          }
          res.send(data)
    } catch (error) {
        res.send(error)
    }
  ;
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.offBoarding.fineOne({where:{empID:id}});
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  try {
   const data = await db.offBoarding.create(req.body);
    res.status(201).json({data});
  } catch (err) {
    console.log(err);
    res.send({message : message.failed});
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
   
  try {
    const data = await db.offBoarding.findByPk(updatedData.id);
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
    const count = await db.offBoarding.destroy({
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
