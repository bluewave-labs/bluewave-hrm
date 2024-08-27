const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");
const { where } = require("sequelize");
const mailService = require("../helper/email");
const EmailService = require("../helper/emailServices");
// const template = require("../../client/templates/offboarding.mjml");
const mjml2html = require("mjml");
const fs = require("fs");

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
  const data = await db.offBoarding.fineOne({ where: { empID: id } });
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

exports.submitSurvey = async (req, res) => {
  const id = req.params.id;
  // const data = await db.offBoarding.fineOne({ where: { empID: id } });
  try {
    // await mailService.sendEmail({
    //   email: "fazlul2k@gmail.com",
    //   subject: "Offboarding Survey",
    //   message: "This is a offboarding Survey",
    // });
    const context = {
      hrManagerName: "Jane Doe", // HR Manager's name
      adminName: "John Smith", // Admin's name
      employeeName: "Alex Johnson", // Employee's name
      lastWorkingDay: "2024-09-15", // Employee's last working day
      completionDeadline: "2024-09-14", // Deadline to complete offboarding tasks
      senderName: "Michael Brown", // The person sending the email
    };

    const emailService = new EmailService();
    const messageId = await emailService.buildAndSendEmail(
      "offboarding",
      context,
      "fazlul2k@gmail.com",
      "Offboarding Survey"
    );

    console.log(`Email sent successfully! Message ID: ${messageId}`);
    res.status(200).send("Email sent");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};
