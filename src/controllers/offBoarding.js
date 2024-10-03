const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");
const { where } = require("sequelize");
const EmailService = require("../helper/emailServices");
const mailService = require("../helper/email");
const crypto = require("crypto");

exports.showAll = async (req, res) => {
  try {
    const data = await db.offBoarding.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const data = await db.offBoarding.findOne({ where: { empId: id } });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  try {
    const data = await db.offBoarding.create(req.body);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
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
    res.status(400).json({ message: message.failed });
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

// email generation controllers
exports.submitSurvey = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id);
  const { firstName, lastName } = employee;
  const { answer1, answer2, answer3, answer4, answer5 } = req.body;
  // console.log(firstName, lastName, answer1, answer2, answer3, answer4, answer5);

  try {
    const context = {
      employeeName: `${firstName} ${lastName}`, // Employee's name
      senderName: "Bluewave Labs Management", // The person sending the email
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
    };

    const emailService = new EmailService();
    const messageId = await emailService.buildAndSendEmail(
      "offboarding",
      context,
      "fazlul2k@gmail.com", // to be replaced with the receiver's email
      "Offboarding Survey" // Subject
    );
    console.log(`Email sent successfully! Message ID: ${messageId}`);
    res.status(200).send("Email sent");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

//Generate special link for offboarding
exports.generateLink = async (req, res) => {
  const { email, frontendUrl } = req.body;
  const empId = req.params.id;
  const resetToken = crypto.randomBytes(64).toString("hex");
  // Send the plain resetToken to the user email and user record
  const resetUrl = `${frontendUrl}off-boarding/${resetToken}`;
  const message = `Please use the link below to submit your off-boarding request\n\n${resetUrl}`;
  console.log(resetUrl);

  try {
    await mailService.sendEmail({
      email: email,
      subject: "Complete your Offboarding Process",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Offboarding link has been sent to the user email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

// Offboarding Survey Questions Controllers
exports.showAllQuestion = async (req, res) => {
  try {
    const data = await db.offBoardingQuestion.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
exports.showOneQuestion = async (req, res) => {
  const id = req.params.id;
  const data = await db.offBoardingQuestion.findOne({ where: { id } });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};
exports.createQuestion = async (req, res) => {
  try {
    const data = await db.offBoardingQuestion.create(req.body);
    console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};
exports.updateQuestion = async (req, res) => {
  const data = req.body;
  try {
    data.forEach(async (record) => {
      const id = record.id;
      const updatedData = await db.offBoardingQuestion.findByPk(id);
      if (updatedData === null) {
        console.log("No record found for the id ", id);
      } else {
        updatedData.set(record);
        await updatedData.save();
      }
    });

    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};
exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offBoardingQuestion.destroy({
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
// Offboarding Survey response Controllers
exports.showAllResponse = async (req, res) => {
  try {
    const data = await db.offBoardingResponse.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
exports.showOneResponse = async (req, res) => {
  const id = req.params.id;
  const data = await db.offBoardingResponse.findOne({ where: { id } });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};
exports.createResponse = async (req, res) => {
  try {
    const responses = req.body;
    await responses.forEach(async (response) => {
      const data = await db.offBoardingResponse.create(response);
      console.log("responses", data.dataValues);
    });
    res.status(201).send({ message: message.created });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};
exports.updateResponse = async (req, res) => {
  const data = req.body;
  try {
    data.forEach(async (record) => {
      const id = record.id;
      const updatedData = await db.offBoardingResponse.findByPk(id);
      if (updatedData === null) {
        console.log("No record found for the id ", id);
      } else {
        updatedData.set(record);
        await updatedData.save();
      }
    });

    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};
exports.deleteResponse = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offBoardingResponse.destroy({
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
// Offboarding Documents Controllers
exports.showAllDoc = async (req, res) => {
  try {
    const data = await db.offBoardingDocument.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
exports.showOnedoc = async (req, res) => {
  const id = req.params.id;
  const data = await db.offBoardingDocument.findOne({ where: { id } });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};
exports.createdoc = async (req, res) => {
  try {
    const data = await db.offBoardingDocument.create(req.body);
    console.log(data);
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
    const updatedData = await db.offBoardingDocument.findByPk(id);
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
exports.deleteDoc = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offBoardingDocument.destroy({
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
