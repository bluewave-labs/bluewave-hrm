require("dotenv").config();
const message = require("../../constants/messages.json");
const {
  createNotification,
  retrieveNotification,
  deleteNotification,
  updateNotificationStatus,
  retrieveNotificationByRecipient,
  retrieveAllNotifications,
} = require("../helper/notificationCRUD");

//Retrieve all notifications
exports.showAll = async (req, res, next) => {
  try {
    const data = await retrieveAllNotifications();
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).json({ message: message.notFound });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};

// Retrieve all notifications for a given employee
exports.showAllByEmployee = async (req, res, next) => {
  try {
    const data = await retrieveNotificationByRecipient(req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).json({ message: message.notFound });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};

//Retrieve notification with a given id
exports.showOne = async (req, res, next) => {
  try {
    const notificationId = req.params.id;
    const data = await retrieveNotification(notificationId);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).json({ message: message.notFound });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};

//Create a notification
exports.createRecord = async (req, res, next) => {
  try {
    const data = await createNotification(req.body);
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};

//Update a notification status of a recipient
exports.updateRecord = async (req, res, next) => {
  try {
    const { notificationId, employeeEmpId, status } = req.body;
    let data = await updateNotificationStatus(
      notificationId,
      employeeEmpId,
      status
    );
    if (data) {
      data = await retrieveNotification(notificationId);
      res.status(200).json({ message: data });
    } else {
      res.status(404).json({ message: message.notFound });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};

//Delete a notification with a given id
exports.deleteRecord = async (req, res, next) => {
  try {
    const data = await deleteNotification(req.params.id);
    if (data > 0) {
      res.status(200).json({ message: message.deleted });
    } else {
      res.status(404).json({ message: message.notFound });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || message.failed });
  }
};
