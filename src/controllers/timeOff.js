const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { getComparator } = require("../helper/utils");
const dayjs = require("dayjs");
const { runAtSpecificTimeOfDay } = require("../helper/utils");

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
// Utility function to set time off renewal date
const createTimeOffRenewalDate = (month) => {
  let selectedMonthIndex = months.indexOf(month.toLowerCase());
  selectedMonthIndex = selectedMonthIndex < 0 ? 0 : selectedMonthIndex % 12;
  const now = new Date();
  const currentMonth = now.getMonth();
  let year =
    currentMonth < selectedMonthIndex
      ? now.getFullYear()
      : now.getFullYear() + 1;
  const dateString = `${year}-${selectedMonthIndex + 1}-01`;
  return new Date(dateString);
};

// Utility function to count the number of times a time off policy has been approved for employees
const getTimeOffUsageCount = async (id) => {
  try {
    const query = `select count(id) from "timeOffHistory" where status = 'Approved' and "timeOffId" = :id;`;
    const [results, metadata] = await db.sequelize.query(query, {
      replacements: { id: id },
    });
    return parseInt(results[0].count);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const assignTimeOffToEmployees = async (timeOff, year) => {
  try {
    const employees = await db.employee.findAll({ attributes: ["empId"] });
    for (let employee of employees) {
      this.assignTimeOff(timeOff, employee.empId, year);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.assignTimeOff = async (timeOff, empId, year) => {
  year = year || new Date().getFullYear();
  const data = {
    yearNumber: year,
    hoursAllowed: timeOff.hours || 9999,
    cumulativeHoursTaken: 0.0,
    timeOffId: timeOff.id,
    employeeEmpId: empId,
  };
  try {
    await db.employeeAnnualTimeOff.create(data);
    console.log(
      `Employee annual timeOff record created for empId ${empId} and timeOffId ${timeOff.id}.`
    );
  } catch (error) {
    console.log(error);
  }
};

// Utility function to update time balance
const updateEmployeeAnnualTimeOffBalance = async (
  empId,
  oldTimeOffId,
  newTimeOffId
) => {
  try {
    const oldEmployeeAnnualTimeOffs = await db.employeeAnnualTimeOff.findAll({
      attributes: [
        "yearNumber",
        "hoursAllowed",
        "cumulativeHoursTaken",
        "timeOffId",
        "employeeEmpId",
      ],
      where: {
        [db.Sequelize.Op.and]: {
          timeOffId: oldTimeOffId,
          employeeEmpId: empId,
        },
      },
      raw: true,
    });

    for (let item of oldEmployeeAnnualTimeOffs) {
      const hoursLeft = item.hoursAllowed - item.cumulativeHoursTaken; //Remaining time from the policy to be deleted in a given year
      const current = await db.employeeAnnualTimeOff.findOne({
        where: {
          [db.Sequelize.Op.and]: {
            timeOffId: newTimeOffId,
            employeeEmpId: empId,
            yearNumber: item.yearNumber,
          },
        },
      });
      const balance = current.hoursAllowed + hoursLeft;
      current.hoursAllowed = balance;
      await current.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const autoRenewEmployeeAnnualtimeOff = async () => {
  try {
    console.log("Checking employee annual time off...");
    const data = await db.timeOffRenewalDate.findOne();
    if (!data) {
      // No renewal date set.
      console.log("Employee annual time off renewal date is not set.");
      return;
    }
    const renewalDate = dayjs(data.renewalDate);
    const today = dayjs();
    // Find the difference between renewal date and today
    const diff = renewalDate.diff(today);
    if (diff > 0) {
      // Renewal date is still in the future
      const str = `Employee annual time off will be auto renewed in ${renewalDate.diff(
        today,
        "day"
      )} day(s).\nEmployee annual time off renewal date: ${renewalDate}`;
      console.log(str);
      return;
    }
    // If you get to this place, reset leave balance for all employees
    const timeOff = await db.timeOff.findAll(); // Get all time off policies
    const employees = await db.employee.findAll({ attributes: ["empId"] }); //Get all employees
    let count = 0; // For counting the number of records created.
    const year = renewalDate.year();
    for (let t of timeOff) {
      for (let e of employees) {
        await this.assignTimeOff(t, e.empId, year);
        count++;
      }
    }
    // Set next renewal date
    const nextRenewalDate = renewalDate.year(year + 1);
    data.renewalDate = nextRenewalDate;
    await data.save();
    const result = {
      timeOff: timeOff.length,
      employees: employees.length,
      recordsCreated: count,
      nextRenewalDate: nextRenewalDate,
    };
    console.log("Summary");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

runAtSpecificTimeOfDay(23, 59, autoRenewEmployeeAnnualtimeOff);

exports.showAll = async (req, res) => {
  const data = await db.timeOff.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
  });
  if (!data) {
    res.send("No results found");
  } else {
    // Add number of usage
    for (let element of data) {
      element["usageCount"] = await getTimeOffUsageCount(element.id);
    }
    res.send(data);
  }
};

exports.showOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.timeOff.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    });
    if (data === null) {
      res.status(400).send("Not found!");
    } else {
      data["usageCount"] = await getTimeOffUsageCount(data.id);
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Not found!");
  }
};
/**
 * When you create a new time off, the time is automatically assigned to all employees. 
 * You may specify the effective year of the time off when you create a new time off.
{
    "category": "Maternity Leave",
    "description": "xxx",
    "hours": 180,
    "year": 2026 //This is optional
  } 
 */
exports.createRecord = async (req, res) => {
  //checking for timeOff name already exists
  try {
    const check = await db.timeOff.findOne({
      where: getComparator(db, "category", req.body.category),
    });
    if (check) {
      return res.send(`${req.body.category} already exists.`);
    }
    const data = await db.timeOff.create(req.body);
    // Assign the new time off to employees
    await assignTimeOffToEmployees(data, req.body.year);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.send({ message: message.failed });
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for timeOff category already exists
  const check = await db.timeOff.findOne({
    where: {
      id: {
        [db.Sequelize.Op.not]: updatedData.id,
      },
      where: getComparator(db, "category", req.body.category),
    },
  });
  if (check) {
    return res.send(`${req.body.category} already exists.`);
  }
  try {
    const data = await db.timeOff.findByPk(updatedData.id);
    data.set(updatedData);
    await data.save();
    res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: message.failed });
  }
};
// This function find the list of employees under the time off policy which is about to be deleted.
// You make a post request to url with the body of the request containing timeOffId of the policy to be deleted.
// {"timeOffId": 5}
exports.initiateDeletion = async (req, res) => {
  const timeOffId = req.body.timeOffId;
  try {
    //Find the affected timeOff policy.
    const timeOff = await db.timeOff.findByPk(timeOffId);
    if (!timeOff) {
      return res.status(400).json({ message: message.notFound });
    }
    // Find all employees under the policy
    const employeeAnnualTimeOff = await db.employeeAnnualTimeOff.findAll({
      attributes: [
        // specify an array where the first element is the SQL function and the second is the alias
        [
          db.Sequelize.fn("DISTINCT", db.Sequelize.col("employeeEmpId")),
          "empId",
        ],
      ],
      where: { timeOffId: timeOffId },
      distinct: true,
      raw: true,
      order: [["empId", "ASC"]],
    });

    const employees = [];
    for (let empId of employeeAnnualTimeOff) {
      employees.push(empId.empId);
    }
    const result = {
      timeOffId,
      employees,
      employeeCount: employees.length,
    };
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message || message.failed,
    });
  }
};
/**
 * This api performs the actual deletion. You make a delete request to the api with the body of the request containing the following information:
{
    "oldTimeOffId": 1,
    "newTimeOffId": 2,
    "employees": [ 1, 2, 3,],
    "employeeCount": 101
}
Note: employees is an array of empId of the affected employees.

 */
exports.confirmDeletion = async (req, res) => {
  //console.log(req.body)
  const { employees, oldTimeOffId, newTimeOffId } = req.body;
  try {
    for (const empId in employees) {
      // Update employee annual time off balance
      await updateEmployeeAnnualTimeOffBalance(
        empId,
        oldTimeOffId,
        newTimeOffId
      );
    }

    //Change reference to the old time of policy to a new one in the employeeAnnualTimeOff table.
    await db.employeeAnnualTimeOff.update(
      { timeOffId: newTimeOffId },
      {
        where: {
          [db.Sequelize.Op.and]: {
            timeOffId: oldTimeOffId,
          },
        },
      }
    );

    //Change reference to the old time of policy to a new one in the time off history table.
    await db.timeOffHistory.update(
      { timeOffId: newTimeOffId },
      {
        where: {
          [db.Sequelize.Op.and]: {
            timeOffId: oldTimeOffId,
          },
        },
      }
    );

    // Remove old time off policy
    const count = await db.timeOff.destroy({
      where: { id: oldTimeOffId },
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
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message || message.failed,
    });
  }
};
/**
 * Thi route creates autorenewal dateThe body of the request should contain the month.
 * For instance, {month: “January”}. The value of the month is case insensitive,
 * and you can use first 3 letters of the month e.g. jan. The url send the following response:
 */
exports.setRenewalDate = async (req, res) => {
  try {
    const month = req.body.month || "jan";
    const date = createTimeOffRenewalDate(month);
    let data = await db.timeOffRenewalDate.findOne();
    if (data) {
      // date already set, update it
      data.renewalDate = date;
      await data.save();
    } else {
      // No date set, create one. This may not happen
      data = await db.timeOffRenewalDate.create({ renewalDate: date });
    }
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.send({ message: message.failed });
  }
};
exports.getRenewalDate = async (req, res) => {
  try {
    const data = await db.timeOffRenewalDate.findOne();
    if (data) {
      const renewalDate = data.renewalDate;
      const monthIndex = renewalDate.getMonth();
      let month = months[monthIndex];
      month = month[0].toUpperCase() + month.slice(1).toLowerCase();
      const response = {
        renewalDate,
        fullMonthName: month,
        abbreviatedMonthName: month.slice(0, 3),
        monthNumber: monthIndex + 1,
        monthIndex,
      };
      res.status(200).send(response);
    } else {
      res.status(400).send("Not found!");
    }
  } catch (error) {
    console.log(error);
    res.send({ message: message.failed });
  }
};

exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db.timeOff.destroy({
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
