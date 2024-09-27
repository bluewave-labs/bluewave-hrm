const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");
const dayjs = require('dayjs');
const { createNotification } = require("../helper/notificationCRUD");

exports.showAll = async (req, res) => {
  const data = await db.timeOffHistory.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (!data) {
    res.send("No results found");
  } else {
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  //Query using empId
  const data = await db.timeOffHistory.findByPk(id, {
    include: "employee"
  });
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.showAllByEmployee = async (req, res) => {
  const empId = req.params.empid;
  //Query using empId
  const data = await db.timeOffHistory.findAll({ 
    where: { empId: empId },
    include: ["employee", "timeOff"]
  }); 
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.createRecord = async (req, res) => {
  //checking for timeOffHistory name already exists
  try {
    const data = await db.timeOffHistory.create(req.body);
    console.log(data);
    const emp = await db.employee.findByPk(data.empId);
    console.log(emp);
    const empNotification = await createNotification({
      subject: "Your time off request has been sent",
      message: `Your time off request from ${dayjs(data.startDate).format("MMMM D")} to 
        ${dayjs(data.endDate).format("MMMM D")} has been sent.`,
      empId: data.empId,
      timeOffHistoryId: data.id,
      recipientId: [data.empId]
    });
    const manNotification = await createNotification({
      subject: "New time off request",
      message: `${emp.firstName} ${emp.lastName} has requested time off from 
        ${dayjs(data.startDate).format("MMMM D")} to ${dayjs(data.endDate).format("MMMM D")}.`,
      empId: data.empId,
      timeOffHistoryId: data.id,
      recipientId: [emp.managerId]
    });
    res.status(201).json({
      data: data,
      empNotification: empNotification,
      manNotification: manNotification
    });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.timeOffHistory.findByPk(updatedData.id);
    let notification;
    //Case 1: Employee is modifying an upcoming time off request (Pending/Approved -> Pending)
    if (["Pending", "Approved"].includes(data.status) && updatedData.status === "Pending") {
      const emp = await db.employee.findByPk(data.empId);
      const empNotification = await createNotification({
        subject: "Your time off request has been sent",
        message: `Your time off request from ${dayjs(updatedData.startDate).format("MMMM D")} to
          ${dayjs(updatedData.endDate).format("MMMM D")} has been sent.`,
        empId: data.empId,
        timeOffHistoryId: data.id,
        recipientId: [data.empId]
      });
      const manNotification = await createNotification({
        subject: "New time off request",
        message: `${emp.firstName} ${emp.lastName} has requested time off from 
          ${dayjs(updatedData.startDate).format("MMMM D")} to ${dayjs(updatedData.endDate).format("MMMM D")}.`,
        empId: data.empId,
        timeOffHistoryId: data.id,
        recipientId: [emp.managerId]
      });
      data.set(updatedData);
      await data.save();
      res.status(200).json({ 
        data: data,
        empNotification: empNotification,
        manNotification: manNotification
      });
    }
    //Case 2: Manager is approving or rejecting a time off request (Pending -> Approved/Declined)
    else if (data.status === "Pending" && ["Approved", "Declined"].includes(updatedData.status)) {
      notification = await createNotification({
        subject: `Your time off request has been ${updatedData.status === "Approved" ? "approved" : "rejected"}`,
        message: `Your time off request from ${dayjs(data.startDate).format("MMMM D")} to 
          ${dayjs(data.endDate).format("MMMM D")} has been 
          ${updatedData.status === "Approved" ? "approved" : "rejected"}.`,
        empId: data.empId,
        timeOffHistoryId: updatedData.id,
        recipientId: [data.empId]
      });
      data.set(updatedData);
      await data.save();
      res.status(200).json({
        data: data,
        notification: notification
      });
    }
    //Case 3: Employee is requesting to delete an upcoming time off request (Pending -> Deleting)
    else if (data.status === "Pending" && updatedData.status === "Deleting") {
      const emp = await db.employee.findByPk(data.empId);
      notification = await createNotification({
        subject: "Employee would like to delete time off request",
        message: `${emp.firstName} ${emp.lastName} would like to cancel the time off request from
          ${dayjs(data.startDate).format("MMMM D")} to ${dayjs(data.endDate).format("MMMM D")}.`,
        empId: data.empId,
        timeOffHistoryId: updatedData.id,
        recipientId: [emp.managerId]
      });
      data.set(updatedData);
      await data.save();
      res.status(200).json({
        data: data,
        notification: notification
      });
    }
    //Case 4: Manager deletes time off request  (Deleting -> Cancelled)
    else if (data.status === "Deleting" && updatedData.status === "Cancelled") {
      notification = await createNotification({
        subject: "Your time off request has been deleted",
        message: `Your time off request from ${dayjs(data.startDate).format("MMMM D")} to 
          ${dayjs(data.endDate).format("MMMM D")} has been deleted.`,
        empId: data.empId,
        timeOffHistoryId: updatedData.id,
        recipientId: [data.empId]
      });
      data.set(updatedData);
      await data.save();
      res.status(200).json({
        data: data,
        notification: notification
      });
    }
    //Case 5: Manager refuses to delete time off request (Deleting -> Pending)
    else if (data.status === "Deleting" && updatedData.status === "Pending") {
      notification = await createNotification({
        subject: "Your time off request was not deleted",
        message: `Your manager did not confirm your attempt to delete your time off request from 
          ${dayjs(data.startDate).format("MMMM D")} to ${dayjs(data.endDate).format("MMMM D")}.`,
        empId: data.empId,
        timeOffHistoryId: updatedData.id,
        recipientId: [data.empId]
      });
      data.set(updatedData);
      await data.save();
      res.status(200).json({
        data: data,
        notification: notification
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.timeOffHistory.destroy({
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

/***
 * Create time off periods
 * {
        user: {
            avatar: AvatarImage,
            name:
            role:
        },
        from:
        to: 
        type: 
        amount: 
        note:
        status:
    }
 *
 */
    exports.timeOffPeriods = async (req, res) => {
      const empId = req.params.empid;
      if (!empId) {
        console.log("Cannot find the employee ID in timeOff Periods history");
        return res.status(400).send("Employee ID is required");
      }
    
      try {
        const timeOffData = await db.timeOffHistory.findAll({
          where: {
            empId: empId
          },
          include: [
            {
              model: db.employee
            },
          ]
        });
    
        const userInformation = [];
        for (const data of timeOffData) {
          const roleData = await db.role.findOne({
            where:{
              roleId: data.employee.roleId
            }
          })
          let roleProp = roleData.roleTitle
          const user = {
            name: `${data.employee.firstName} ${data.employee.lastName}`,
            avatar: data.employee.photo.toString("base64"),
            role: roleProp
            }

          const info = {
            from: data.startDate,
            to: data.endDate,
            amount: data.hours,
            note: data.note,
            status: data.status
          }
          info.user = user;
          userInformation.push(info);
       }
    
        res.send(userInformation);
      } catch (error) {
        console.error("Error fetching time off periods:", error);
        res.status(500).send("An error occurred while fetching time off periods");
      }
    };
    