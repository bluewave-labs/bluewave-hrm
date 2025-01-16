const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

//Retrieve all survey responses
exports.showAll = async (req, res, next) => {
    console.log("Executing showAll");
    const data = await db.surveyResponse.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!data) {
        res.send("No results found");
    }
    else {
        res.send(data);
    }
};

//Retrieve a survey response with a given id
exports.showOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.surveyResponse.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Retrieve all survey responses with a given employee id
exports.showAllByEmployee = async (req, res, next) => {
    const empId = req.params.empid;
    try {
        const data = await db.surveyResponse.findAll({
            where: { empId: empId }
        });
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Retrieve all survey responses with a given onboarding id
exports.showAllByOnboarding = async (req, res, next) => {
    const onBoardingId = req.params.onboardingid;
    try {
        const data = await db.surveyResponse.findAll({
            where: { onBoardingId: onBoardingId }
        });
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Create a survey response
exports.createRecord = async (req, res, next) => {
    try {
        const data = await db.surveyResponse.create(req.body);
        res.status(201).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Update a survey response
exports.updateRecord = async (req, res, next) => {
    const updatedData = req.body;
    try {
        const data = await db.surveyResponse.findByPk(updatedData.id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            data.set(updatedData);
            await data.save();
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Delete a survey response
exports.deleteRecord = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.surveyResponse.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            await db.surveyResponse.destroy({
                where: { id: id }
            });
            res.status(204).send({ message: message.deleted });
        }
    }
    catch (err) {
        res.status(400).send({ message: err.message || message.failed });
    }
};