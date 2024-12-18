const db = require("../../../models");
require("dotenv").config();
const message = require("../../../constants/messages.json");

// offboarding Documents Controllers
exports.showAllDoc = async (req, res) => {
  try {
    const data = await db.offboardingSignedDocument.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
     return res.send("No results found");
    }

    toString("base64")
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

exports.showOneDoc = async (req, res) => {
  const id = req.params.id;
  const data = await db.offboardingSignedDocument.findOne({ where: { id } });
  if (data === null) {
   return res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createDoc = async (req, res) => {
  try {
    const data = await db.offboardingSignedDocument.create(req.body);
    //console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

//It takes an array of offboardingSignedDocument objects.
// [{}, {}]
exports.createManyDoc = async (req, res) => {
  try {
    const data = await db.offboardingSignedDocument.bulkCreate(req.body, {
      validate: true,
    });
    //console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateDoc = async (req, res) => {
  const data = req.body;
  try {
    const id = data.id;
    const updatedData = await db.offboardingSignedDocument.findByPk(id);
    if (updatedData === null) {
      console.log("No record found for the id ", id);
    } else {
      updatedData.set(data);
      await updatedData.save();
    }

    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.updateManyDoc = async (req, res) => {
  const data = req.body;
  var count = 0;
  try {
    for (let record of data) {
      const id = record.id;
      const updatedData = await db.offboardingSignedDocument.findByPk(id);
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

exports.deleteDoc = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offboardingSignedDocument.destroy({
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

exports.deleteManyDoc = async (req, res) => {
    const ids = req.body; console.log(ids)
    try {
      const count = await db.offboardingSignedDocument.destroy({
        where: { id: ids },
      });
      if (count > 0) {
        res.send({
          message: `${count < 2 ? "entity" : "entities"} deleted`, count
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
  