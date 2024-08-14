const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");
const { where } = require("sequelize");

exports.showAll = async (req, res) => {
  const data = await db.socialProfile.findAll({
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
  const data = await db.socialProfile.findAll({ where: { empId: empId } });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.findOne = async (req, res) => {
  const { empId, profileUrl } = req.body;
  let profile = null;
  if (empId) {
    //This check all profileUrls other than empId's. This is useful when profile urls is not being updated (same as before).
    profile = await db.socialProfile.findOne({
      where: {
        empId: { [db.Sequelize.Op.ne]: req.body.empId },
        where: getComparator(db, "profileUrl", profileUrl),
      },
    });
  } else {
    // This check all profileUrls. It is useful when creating a new profile.
    profile = await db.socialProfile.findOne({
      where: {
        where: getComparator(db, "profileUrl", profileUrl),
      },
    });
  }
  if (profile) {
    res.json({
      exists: true,
      data: profile,
      message: "Record found",
    });
  } else {
    res.json({
      exists: false,
      data: profile,
      message: "Record not found",
    });
  }
};

exports.createRecord = async (req, res) => {
  //checking for profileUrl already exists
  try {
    const check = await db.socialProfile.findOne({
      where: {
        empId: req.body.empId,
        where: getComparator(db, "profileUrl", req.body.profileUrl),
      },
    });
    if (check) {
      return res.send(`${req.body.profileUrl} already exists.`);
    }
    const data = await db.socialProfile.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for profileUrl already exists
  const check = await db.socialProfile.findOne({
    where: {
      id: {
        [db.Sequelize.Op.not]: updatedData.id,
      },
      empId: updatedData.empId,
      where: getComparator(db, "profileUrl", req.body.profileUrl),
    },
  });
  if (check) {
    return res.send(`${req.body.profileUrl} already exists.`);
  }
  try {
    const data = await db.socialProfile.findByPk(updatedData.id);
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
    const count = await db.socialProfile.destroy({
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
