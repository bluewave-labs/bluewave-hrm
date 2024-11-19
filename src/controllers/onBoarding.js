const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const mailService = require("../helper/email");
const EmailService = require("../helper/emailServices");
const mjml2html = require("mjml");

//Retrieve all onboarding processes
exports.showAll = async (req, res, next) => {
    const data = await db.onBoarding.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    if (!data) {
        res.send("No results found");
    }
    else {
        res.send(data);
    }
};

//Retrieve an onboarding process with a given id
exports.showOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.onBoarding.findByPk(id);
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

//Retrieve an onboarding process with a given employee id
exports.showByEmployee = async (req, res, next) => {
    const empId = req.params.empid;
    try {
        let [data, created] = await db.onBoarding.findOrCreate({
            where: { empId: empId },
            defaults: {
                empId: empId,
                stepNumber: 0,
                watchedVideos: false,
                readDocuments: false,
                isComplete: false
            }
        });
        if (created) {
            const files = await db.fileName.findAll();
            const tasks = await db.taskName.findAll();
            const survey = await db.surveyQuestion.findAll();
            console.log(tasks);
            console.log(survey);
            console.log(files);
            for (const f of files) {
                //Some function to tailor the file to the new employee should execute here
                await db.file.create({
                    onBoardingId: data.id,
                    title: f.title,
                    name: f.name,
                    file: f.file,
                    category: f.category,
                    extension: f.extension
                });
            }
            for (const t of tasks) {
                await db.task.create({
                    onBoardingId: data.id,
                    index: t.index,
                    name: t.text,
                    done: false
                });
            }
            for (const q of survey) {
                await db.surveyResponse.create({
                    onBoardingId: data.id,
                    orderNumber: q.orderNumber,
                    empId: data.empId,
                    question: q.question,
                    answer: ""
                });
            }
            res.status(201).send(data);
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

//Create an onboarding process
/*
exports.createRecord = async (req, res, next) => {
    try {
        console.log(req.body);
        const data = await db.onBoarding.create(req.body);
        const tasks = await db.taskName.findAll();
        const survey = await db.surveyQuestion.findAll();
        console.log(tasks);
        console.log(survey);
        for (const t of tasks) {
            await db.task.create({
                onBoardingId: data.id,
                index: t.index,
                name: t.text,
                done: false
            });
        }
        for (const q of survey) {
            await db.surveyResponse.create({
                onBoardingId: data.id,
                orderNumber: q.orderNumber,
                empId: data.empId,
                question: q.question,
                answer: ""
            });
        }
        res.status(201).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};
*/

//Update an onboarding process
exports.updateRecord = async (req, res, next) => {
    const updatedData = req.body;
    try {
        const data = await db.onBoarding.findByPk(updatedData.id);
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

//Delete an onboarding process
exports.deleteRecord = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await db.onBoarding.findByPk(id);
        if (data === null) {
            res.status(404).send("Not found!");
        }
        else {
            await db.onBoarding.destroy({
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

//Send an email to HR to notify them that an employee has finished onboarding
exports.completeOnboarding = async (req, res, next) => {
    const empId = req.params.empid;
    const employee = await db.employee.findByPk(empId);
    const { firstName, lastName } = employee;

    try {
        const context = {
            employeeName: `${firstName} ${lastName}`,
            senderName: "BlueWave Labs Management"
        };

        const emailService = new EmailService();
        const messageId = await emailService.buildAndSendEmail(
            "onboarding",
            context,
            "gabriel.chan166@gmail.com",
            "An employee has completed Onboarding"
        );
        console.log(`Email sent successfully! Message ID: ${messageId}`);
        res.status(200).send("Email sent");
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message || message.failed });
    }
};