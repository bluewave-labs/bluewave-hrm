const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");

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
  const data = await db.timeOffHistory.findByPk(id); //Query using empId
  if (data === null) {
    res.status(400).send("Not found!");
  } else {
    res.status(200).send(data);
  }
};

exports.showAllByEmployee = async (req, res) => {
  const empId = req.params.empid;
  const data = await db.timeOffHistory.findAll({ where: { empId: empId } }); //Query using empId
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
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const data = await db.timeOffHistory.findByPk(updatedData.id);
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
    