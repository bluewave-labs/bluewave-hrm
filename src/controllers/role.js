const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");

exports.showAll = async (req, res) => {
  const role = await db.role.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!role) {
    res.send("No results found");
  } else {
    res.send(role);
  }
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const role = await db.role.findByPk(id);
  if (role === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(role);
  }
};

exports.createRecord = async (req, res) => {
  //checking for role already exists
  try {
    const check = await db.role.findOne({
      where: getComparator(db, "roleTitle", req.body.roleTitle),
    });
    if (check) {
      return res.send(`${req.body.roleTitle} already exists.`);
    }
    const data = await db.role.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.createBulkRecord = async (req, res) => {
  try {
    const data = await db.role.bulkCreate(req.body.data);
    console.log(req.body.data)
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.checkRecord = async (req, res) => {
  let roleTitle = req.params.roleTitle;
  if (!roleTitle || roleTitle.trim().length === 0) {
    return res
      .status(400)
      .json({ exists: false, message: "Null or empty parameter." });
  }
  const query = `SELECT count("roleId") FROM role WHERE lower("roleTitle") = :roleTitle`;
  const [results, metadata] = await db.sequelize.query(query, {
    replacements: { roleTitle: roleTitle.trim().toLowerCase() },
  });
  const count = results[0].count > 0;
  if (count) {
    return res.json({
      exists: true,
      message: `${roleTitle} already exists.`,
    });
  }
  return res.json({
    exists: false,
    message: `${roleTitle} does not exist.`,
  });
};


exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for role already exists
  const check = await db.role.findOne({
    where: {
      roleId: {
        [db.Sequelize.Op.not]: updatedData.roleId,
      },
      where: getComparator(db, "roleTitle", req.body.roleTitle),
    },
  });
  if (check) {
    return res.send(`${req.body.roleTitle} already exists.`);
  }
  try {
    const role = await db.role.findByPk(updatedData.roleId);
    role.set(updatedData);
    await role.save();
    res.status(200).json({ message: role });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.role.destroy({
      where: { roleId: id },
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
