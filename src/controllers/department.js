const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");

exports.showAll = async (req, res) => {
  const data = await db.department.findAll({
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
  const data = await db.department.findByPk(id);
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  //checking for department name already exists
  try {
    const check = await db.department.findOne({
      where: getComparator(db, "departmentName", req.body.departmentName),
    });
    if (check) {
      return res.send(`${req.body.departmentName} already exists.`);
    }
    const data = await db.department.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.createBulkRecord = async (req, res) => {
  try {
    const data = await db.department.bulkCreate(req.body.data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for department name already exists
  const check = await db.department.findOne({
    where: {
      id: {
        [db.Sequelize.Op.not]: updatedData.id,
      },
      where: getComparator(db, "departmentName", req.body.departmentName),
    },
  });
  if (check) {
    return res.send(`${req.body.departmentNames} already exists.`);
  }
  try {
    const data = await db.department.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.checkRecord = async (req, res) => {
  let departmentName = req.params.departmentname;
  if (!departmentName || departmentName.trim().length === 0) {
    return res
      .status(400)
      .json({ exists: false, message: "Null or empty parameter." });
  }
  const query = `SELECT count(id) FROM department WHERE lower("departmentName") = :departmentName`;
  const [results, metadata] = await db.sequelize.query(query, {
    replacements: { departmentName: departmentName.trim().toLowerCase() },
  });
  const count = results[0].count > 0;
  if (count) {
    return res.json({
      exists: true,
      message: `${departmentName} already exists.`,
    });
  }
  return res.json({
    exists: false,
    message: `${departmentName} does not exist.`,
  });
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.department.destroy({
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
