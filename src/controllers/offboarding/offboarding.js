const db = require("../../../models");
require("dotenv").config();
const crypto = require("crypto");
const message = require("../../../constants/messages.json");
const EmailService = require("../../helper/emailServices");
const nofitication = require("../../helper/notificationCRUD");
const utils = require("../../helper/utils");

exports.showAll = async (req, res) => {
  try {
    const data = await db.offboarding.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.offboardingSurveyResponse,
        },
        {
          model: db.offboardingSignedDocument,
        },
      ],
    });
    if (!data) {
      res.send("No results found");
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.showOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.offboarding.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.offboardingSurveyResponse,
        },
        { model: db.offboardingSignedDocument },
      ],
      where: { id: id },
    });
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.findByEmployee = async (req, res) => {
  try {
    const { empId } = req.body;
    console.log(empId);
    const data = await db.offboarding.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.offboardingSurveyResponse,
        },
        { model: db.offboardingSignedDocument },
      ],
      where: { empId: empId },
    });
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.findByToken = async (req, res) => {
  if (!req.body.token) {
    return res.status(400).json({
      error: message.invalidToken,
    });
  }

  //Hash the plain token
  const token = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  //Find offboarding record based on the parameter token
  const data = await db.offboarding.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: db.offboardingSurveyResponse,
      },
      { model: db.offboardingSignedDocument },
    ],
    where: { accessToken: token },
  });
  if (!data) {
    // If data is null, the token is invalid or expired
    return res.status(400).json({
      error: message.invalidToken,
    });
  }
  if (!data.startedAt) {
    // Set start time
    await data.set({ startedAt: new Date() });
    await data.save();
  }
  res.status(200).send(data);
};

exports.createRecord = async (req, res) => {
  try {
    const { empId, email, frontendUrl } = req.body;
    // Create token
    const token = crypto.randomBytes(64).toString("hex");
    // Hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Create offboarding data
    const data = await db.offboarding.create({
      empId,
      accessToken: hashedToken,
    });

    // Create survey response objects
    const questions = await db.offboardingSurveyQuestion.findAll({
      attributes: ["orderNumber", "question"],
    });
    // For each of the questions, create a response object
    for (let q of questions) {
      const r = {
        orderNumber: q.orderNumber,
        question: q.question,
        empId,
        offboardingId: data.id,
      };
      const response = await db.offboardingSurveyResponse.create(r);
      await data.addOffboardingSurveyResponse(response);
    }

    const url = `${frontendUrl}off-boarding/${token}`;
    //console.log("\n\n\nToken", url, "\n\n\n");

    const context = await utils.createEmailContext({ empId, db });
    context.url = url;  
    const emailService = new EmailService();
    const messageId = await emailService.buildAndSendEmail(
      "offboardingSurveyInvitation",
      context,
      email, // to be replaced with the receiver's email
      "Offboarding Survey" // Subject
    );
    console.log(`Email sent successfully! Message ID: ${messageId}`);

    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.offboarding.findByPk(updatedData.id);
    await data.set(updatedData);
    await data.save();

    // Update documents by adding the new onces
    const documents = updatedData.offboardingSignedDocuments;
    if (documents && documents.length > 0) {
      for (let doc of documents) {
        if (doc.id) {
          // Document already saved, do not add again
          continue;
        }
        const docData = await db.offboardingSignedDocument.create(doc);
        await data.addOffboardingSignedDocuments(docData);
      }
    }

    // Update responses
    const responses = updatedData.offboardingSurveyResponses;
    if (responses && responses.length > 0) {
      for (let item of responses) {
        const id = item.id;
        const responseData = await db.offboardingSurveyResponse.findByPk(id);
        if (responseData) {
          await responseData.set(item);
          await responseData.save();
        }
      }
    }
    // Get array ids of the deleted files
    const deletedFiles = updatedData.deletedOffboardingSignedDocuments;
    if (deletedFiles && deletedFiles.length > 0) {
      await db.offboardingSignedDocument.destroy({
        where: { id: deletedFiles },
      });
      // Remove from through table as well
      await db.offboardingDocumentation.destroy({
        where: { offboardingSignedDocumentId: deletedFiles },
      });
    }

    // Fetch updated record from the database
    let newData = await db.offboarding.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.offboardingSurveyResponse,
        },
        { model: db.offboardingSignedDocument },
      ],
      where: { id: data.id },
    });
    res.status(200).send(newData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.offboarding.destroy({
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
  const { offboardingId, dashboardUrl } = req.body;
  try {
    const offboarding = await db.offboarding.findByPk(offboardingId);
    const update = {
      isCompleted: true,
      completedAt: new Date(),
      accessToken: null, // Clear to prevent access after submission
    };
    await offboarding.set(update);
    await offboarding.save();

    // Send notification to hr admin
    const employee = await db.employee.findByPk(offboarding.empId, {
      attributes: ["firstName", "lastName"],
    });

    // Get hrm admin
    const admins = await db.appUser.findAll({
      attributes: ["empId"],
      where: { permissionId: 1 },
    });
    const recipientId = [];
    for (let admin of admins) {
      recipientId.push(admin.empId);
    }

    const nofiticationData = {
      subject: `Employee Offboarding Notice`,
      message: `${employee.firstName} ${employee.lastName} has completed an exit survey.`,
      recipientId,
    };
    await nofitication.createNotification(nofiticationData);
    res.status(200).send("Survey submitted.");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};
