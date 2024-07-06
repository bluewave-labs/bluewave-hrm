const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");

//Retrieve all notifications
exports.showAll = async (req, res, next) => {
    const data = await db.update.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (data) {
        res.status(200).send(data);
    }
    else {
        res.status(404).json({ message: message.notFound });
    }
};

//Retrieve notification with a given id
exports.showOne = async (req, res, next) => {
    const data = await db.update.findByPk(req.params.id);
    if (data) {
        res.status(200).send(data);
    }
    else {
        res.status(404).json({ message: message.notFound });
    }
};

//Create a notification
exports.createRecord = async (req, res, next) => {
    try {
        const data = await db.update.create(req.body);
        res.status(201).json({data})
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message || message.failed });
    }
};

//Update a notification with a given id
exports.updateRecord = async (req, res, next) => {
    try {
        let data = await db.update.findByPk(req.params.id);
        if (data) {
            data.set(req.body);
            await data.save();
            res.status(200).json({ message: data });
        }
        else {
            res.status(404).json({ message: message.notFound });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message || message.failed });
    }
};

//Delete a notification with a given id
exports.deleteRecord = async (req, res, next) => {
    try {
        const data = await db.update.destroy({ where: { id: req.params.id }});
        if (data > 0) {
            res.status(204).json({ message: message.deleted})
        }
        else {
            res.status(404).json({ message: message.notFound });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message || message.failed });
    }
};