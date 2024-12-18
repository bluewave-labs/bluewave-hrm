const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

const convertFileToBase64 = (document) => {
    document.file = document.file && document.file.toString("base64");
};

//Retrieve all files
exports.showAll = async (req, res, next) => {
    const data = await db.file.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!data) {
        res.send("No results found");
    }
    else {
        for (let d of data) {
            convertFileToBase64(d);
        }
        res.send(data);
    }
};

//Retrieve a file with a given id
exports.showOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.file.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            convertFileToBase64(data);
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Retrieve all files with a given onboarding id
exports.showAllByOnboarding = async (req, res, next) => {
    const onBoardingId = req.params.onboardingid;
    try {
        const data = await db.file.findAll({
            where: { onBoardingId: onBoardingId }
        });
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            for (let d of data) {
                convertFileToBase64(d);
            }
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Create a file
exports.createRecord = async (req, res, next) => {
    try {
        const data = await db.file.create(req.body);
        res.status(201).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};

//Update a file
exports.updateRecord = async (req, res, next) => {
    const updatedData = req.body;
    try {
        const data = await db.file.findByPk(updatedData.id);
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

//Delete a file
exports.deleteRecord = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.file.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            await db.video.destroy({
                where: { id: id }
            });
            res.status(204).send({ message: message.deleted });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};