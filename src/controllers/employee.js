const dayjs = require("dayjs");
const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const appUser = require("./appUser");
const { getAuthUser } = require("../../config/authJwt");
const { runAtSpecificTimeOfDay } = require("../helper/utils");
const timeOffController = require("./timeOff");

const autoDelete = async () => {
  let employeeCount = 0;
  let userCount = 0;
  console.log("Executing auto delete...");
  const startTime = dayjs();
  const employees = await db.employee.findAll({
    where: { autoDeleteAt: { [db.Sequelize.Op.ne]: null } },
  });
  for (let employee of employees) {
    const daysLeft = dayjs(employee.autoDeleteAt).diff(dayjs(), "d");
    if (daysLeft < 1) {
      employee.set({
        autoDeleteAt: null,
      });
      await employee.save();
      await employee.destroy();
      employeeCount++;
    }
  }
  const users = await db.appUser.findAll({
    where: { autoDeleteAt: { [db.Sequelize.Op.ne]: null } },
  });
  for (let user of users) {
    const daysLeft = dayjs(user.autoDeleteAt).diff(dayjs(), "d");
    if (daysLeft < 1) {
      user.set({
        access: "Revoked",
        autoDeleteAt: null,
      });
      await user.save();
      await user.destroy();
      userCount++;
    }
  }
  const endTime = dayjs();
  console.log(
    `Auto delete completed at" ${dayjs().format("YYYY-MM-DD hh:mm:ss:A")}`
  );
  const str = `${employeeCount} employee record(s) and ${userCount} user record(s) removed in ${endTime.diff(
    startTime
  )} millisecond(s)`;
  console.log(str);
};
try {
  runAtSpecificTimeOfDay(23, 59, autoDelete);
} catch (error) {
  console.log(error);
  console.log("Auto delete failed.")
}


const predefinedColors = [
  "#7F56D9", // 1st place
  "#9E77ED", // 2nd place
  "#B692F6", // 3rd place
  "#D6BBFB", // 4th place
  "#E9D7FE", // 5th place
  "#EAECF0", // Other
];

// Utility function to sum values of an array of objects
const sumValues = (arr) => {
  let sum = 0;
  arr.forEach((element) => {
    sum += parseInt(element.value);
  });
  return sum;
};

const getTopFive = (results) => {
  const arr = [];
  const size = results.length > 6 ? 6 : results.length;
  for (let i = 0; i < size; i++) {
    const data = { id: i + 1 };
    arr.push(data);
    if (i < 5) {
      data.label = results[i].label;
      data.value = parseInt(results[i].value);
      data.color = predefinedColors[i];
    } else {
      data.label = "Other";
      data.value = sumValues(results.slice(5));
      data.color = predefinedColors[i];
    }
  }
  return arr;
};

//Utility function to change photo to base64
const convertPhotoToBase64 = (employee) => {
  employee.photo = employee.photo && employee.photo.toString("base64");
  if (employee.Manager) {
    employee.Manager.photo =
      employee.Manager.photo && employee.Manager.photo.toString("base64");
  }
};

const employeeQueryObject = {
  include: [
    "role",
    "department",
    "team",
    "socialProfiles",
    {
      model: db.employee,
      as: "Manager",
    },
  ],
};

// Utility function to assign timeOff to new employee
const assignTimeOffToEmployee = async (empId) => {
  try {
    const timeOff = await db.timeOff.findAll();
    for (let time of timeOff) {
      timeOffController.assignTimeOff(time, empId);
    }
  } catch (error) {
    console.log(error);
  }
};
// Expected an object with a property named managerIds with an array attribute
// Expected data format {managerIds: [1,2,3]}
exports.removeEmployeeManager = async (req, res) => {
  try {
    const managerIds = req.body.managerIds;
    // Find affected employees
    const employees = await db.employee.findAll({
      attributes: ["empId", "firstName", "lastName", "email"],
      where: { managerId: managerIds },
      order: ["firstName", "lastName"],
    });

    await db.employee.update(
      { managerId: null },
      {
        where: {
          managerId: managerIds,
        },
      }
    );
    // Send a list of affected employees
    res.send(employees);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
//Expected data format [{managerId:1, empIds: [2,3,4]}, {managerId: 5, empIds:[6,7,8]}]
exports.changeEmployeeManager = async (req, res) => {
  try {
    const data = req.body;
    let count = 0; // Count the number of changes
    for (let element of data) {
      const result = await db.employee.update(
        { managerId: element.managerId },
        {
          where: {
            empId: element.empIds,
          },
        }
      );
      count += parseInt(result);
    }

    res.send({
      status: message.updated,
      managerCount: data.length,
      employeeCount: count,
    });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
exports.showEmployeeWithNoManager = async (req, res) => {
  try {
    const employees = await db.employee.findAll({
      attributes: ["empId", "firstName", "lastName", "email"],
      where: { managerId: null },
      order: ["firstName", "lastName"],
    });
    return res.send(employees);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

exports.showManagers = async (req, res) => {
  const managers = await db.appUser.findAll({
    attributes: ["empId", "firstName", "lastName", "email"],
    order: ["firstName", "lastName"],
    where: { permissionId: [1, 2], empId: { [db.Sequelize.Op.ne]: null } },
  });
  res.json(managers);
};

exports.showAll = async (req, res) => {
  //include: { all: true, nested: false }, // This will display all the data pertaining to employee table
  const employee = await db.employee.findAll(employeeQueryObject);
  if (!employee) {
    return res.send("No results found");
  }
  for (let index = 0; index < employee.length; index++) {
    convertPhotoToBase64(employee[index]);
  }
  res.send(employee);
};

exports.showAllTerminated = async (req, res) => {
  //include: { all: true, nested: false }, // This will display all the data pertaining to employee table
  const employee = await db.employee.findAll({
    ...employeeQueryObject,
    where: { deletedAt: { [db.Sequelize.Op.ne]: null } },
    paranoid: false,
  });
  if (!employee) {
    return res.send("No results found");
  }
  for (let index = 0; index < employee.length; index++) {
    convertPhotoToBase64(employee[index]);
  }
  res.send(employee);
};

exports.showMyTeam = async (req, res) => {
  const managerId = req.body.managerId;
  if (!managerId) {
    return res.send([]);
  }
  const employee = await db.employee.findAll({
    ...employeeQueryObject,
    where: { managerId: managerId },
  });
  if (!employee) {
    return res.send([]);
  }
  for (let index = 0; index < employee.length; index++) {
    convertPhotoToBase64(employee[index]);
  }
  // console.log(employee.length);
  res.send(employee);
};

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id, employeeQueryObject);
  if (employee) {
    convertPhotoToBase64(employee);
    res.status(200).send(employee);
  } else {
    res.status(400).send("Not found!");
  }
};

exports.showAllByManager = async (req, res) => {
  if (!req.params.id) {
    return res.send(null);
  }
  const employee = await db.employee.findAll({
    include: [
      {
        model: db.employee,
        as: "Manager",
      },
    ],
    where: { managerId: req.params.id },
  });
  if (!employee) {
    return res.send("No results found");
  }
  for (let index = 0; index < employee.length; index++) {
    employee[index].photo =
      employee[index].photo && employee[index].photo.toString("base64");
    if (employee[index].Manager) {
      employee[index].Manager.photo =
        employee[index].Manager.photo &&
        employee[index].Manager.photo.toString("base64");
    }
  }
  res.send(employee);
};

exports.findOneByEmail = async (req, res) => {
  if (!req.body.email) {
    return res.send(null);
  }
  const query = {
    ...employeeQueryObject,
    where: { email: req.body.email.toLowerCase() },
  };
  const employee = await db.employee.findOne(query);
  if (employee) {
    convertPhotoToBase64(employee);
    res.status(200).json(employee);
  } else {
    res.send(null);
  }
};

exports.finalizeOnboarding = async (req, res) => {
  const { empId } = req.body;
  const data = {
    empId,
    updated: false,
    completedOnboardingAt: null,
    message: null,
  };
  try {
    if (!empId) {
      data.message = "empId cannot be null";
      return res.status(200).json(data);
    }
    const employee = await db.employee.findByPk(empId);
    if (!employee) {
      // No results
      data.message = `No result found for empId ${empId}`;
    } else if (employee.completedOnboardingAt) {
      data.message = "Employee has already completed onboarding process";
      data.completedOnboardingAt = employee.completedOnboardingAt;
    } else {
      const date = new Date();
      employee.completedOnboardingAt = date;
      await employee.save();
      data.updated = true;
      data.completedOnboardingAt = date;
      data.message = "Record updated successfully";
    }
  } catch (error) {
    console.log(error);
    data.message = `Operation failed due to ${error}`;
  }
  res.status(200).json(data);
};

exports.createRecord = async (req, res) => {
  try {
    const inputs = req.body.inputs;
    // console.log(inputs);
    const data = await db.employee.create(inputs, {
      include: ["socialProfiles"],
    });
    /**
     * Create an appUser account for new employee added.
     * But check if there exists appUser account for the used email.
     * This is necessary because appUser account for system administrator
     * was created via auth controller.
     */
    const email = data.toJSON().email.toLowerCase();
    const empId = data.toJSON().empId;

    let user = await db.appUser.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          {
            email: email,
          },
          { empId: empId },
        ],
      },
    });
    // If user exists, update record. User is the system admin.
    if (user) {
      user.set({
        empId,
        email,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
      });
      await user.save();
      res.status(201).json(data);
    } else {
      req.body = {
        empId,
        email,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        frontendUrl: req.body.frontendUrl,
      };
      appUser.createRecord(req, res);
    }
    // Assign time off to new employee
    assignTimeOffToEmployee(empId);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  try {
    const employee = await db.employee.findByPk(updatedData.empId);
    employee.set(updatedData);
    await employee.save();

    /**
     * It is necessary to update appUser table as well to ensure both tables,
     * employee & appUser, are in sync. It is assumed that each employee is a user as well.
     * The columns to be updated in appUser table are: firstName, lastName, email & empId.
     * The other columns can be updated through appUser controller
     */
    const email = req.body.email
      ? req.body.email.toLowerCase()
      : req.body.email;
    const empId = req.body.empId;

    const user = await db.appUser.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          {
            email: email,
          },
          { empId: empId },
        ],
      },
    });
    // user is not expected to be null but there is no crime in checking.
    if (user) {
      user.set({
        empId,
        email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await user.save();
    }
    res.status(200).json({ user: email });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//   Expected body format
//   {
//     "empId": 3,
//     "date": "2024-08-21T12:11:28.950Z",
//     "terminationReason":"Personal",
//     "terminationNote": "Goodbye"
// }

exports.deleteRecord = async (req, res) => {
  try {
    const data = req.body;
    const employee = await db.employee.findByPk(data.empId);
    if (!employee) {
      throw { message: "Termination failed." };
    }

    const dateDiff = dayjs(data.date).diff(dayjs());

    employee.set({
      terminationReason: data.terminationReason,
      terminationNote: data.terminationNote,
      autoDeleteAt: dateDiff > 0 ? data.date : null, // Auto soft deletion later
    });
    await employee.save();
    if (dateDiff <= 0) {
      await employee.destroy();
    }

    const user = await db.appUser.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          {
            email: employee.email,
          },
          { empId: employee.empId },
        ],
      },
    });
    if (user) {
      user.set({
        access: dateDiff > 0 ? user.access : "Revoked", // Set to revoked later
        autoDeleteAt: dateDiff > 0 ? data.date : null, // Auto soft deletion later
      });
      await user.save();
      if (dateDiff <= 0) {
        await user.destroy();
      }
    }
    res.send({
      message: message.deleted,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err.message || message.failed,
    });
  }
};

// Routes for data summaries
exports.summarizeByDepartments = async (req, res) => {
  try {
    const query = `select d."id", d."departmentName", count(e."empId") as "count" from department d left join employee e ON e."departmentId" = d."id" group by d."id", d."departmentName" order by d."id";`;
    const [results, metadata] = await db.sequelize.query(query);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByJobTitles = async (req, res) => {
  try {
    const query = `select r."roleId", r."roleTitle", count(e."empId") from role r left join employee e on e."roleId" = r."roleId" group by r."roleId", r."roleTitle" order by r."roleId";`;
    const [results, metadata] = await db.sequelize.query(query);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByDepartmentsChartData = async (req, res) => {
  try {
    const query = `SELECT count(e."empId") AS "value", d."departmentName" AS "label" from employee e JOIN department d ON e."departmentId" = d."id" GROUP BY 2 ORDER BY 1 DESC, 2;`;
    const [results, metadata] = await db.sequelize.query(query);
    const data = getTopFive(results);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByNationalities = async (req, res) => {
  try {
    const query = `SELECT count("empId") AS "value", nationality AS "label" FROM employee GROUP BY 2 ORDER BY 1 DESC, 2;`;
    const [results, metadata] = await db.sequelize.query(query);
    const data = getTopFive(results);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByLocations = async (req, res) => {
  try {
    const query = `SELECT count("empId") AS "value", country AS "label" FROM employee GROUP BY 2 ORDER BY 1 DESC, 2;`;
    const [results, metadata] = await db.sequelize.query(query);
    const data = getTopFive(results);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByHeadcounts = async (req, res) => {
  try {
    // const [results, metadata] = await db.sequelize.query(query, {
    // replacements: { departmentName: departmentName.trim().toLowerCase() },
    const date = new Date();
    const year = parseInt(req.params.year);
    // Limit the months to the current month if the year is the current year
    const monthCount = year === date.getFullYear() ? date.getMonth() + 1 : 12;

    const query = `SELECT count("empId") from employee WHERE cast(to_char("hireDate", 'YYYY') AS int) < :year;`;
    const [results, metadata] = await db.sequelize.query(query, {
      replacements: { year: year },
    });
    const prevYearCount = results[0].count;

    //Get the given year monthly headcount.
    const query2 = `SELECT date_part('month', "hireDate") AS "id", to_char("hireDate", 'Mon') AS "month", count("empId") AS "value" FROM employee WHERE cast(to_char("hireDate", 'YYYY') AS int) = :year GROUP BY "month", "id" ORDER BY 1;`;
    const [results2, metadata2] = await db.sequelize.query(query2, {
      replacements: { year: year },
    });
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = [];
    for (let i = 0; i < monthCount; i++) {
      const d = { id: i + 1, month: months[i], value: 0 };
      data.push(d);
    }

    //Iterate through the result
    for (let result of results2) {
      const index = result.id - 1;
      data[index].value = result.value;
    }
    //Obtain cumulative values
    const values = [parseInt(prevYearCount) + parseInt(data[0].value)];

    for (let i = 1; i < monthCount; i++) {
      const d = parseInt(values[i - 1]) + parseInt(data[i].value);
      values.push(d);
    }
    const finalResult = {
      xLabels: months.slice(0, monthCount),
      pData: values,
    };

    res.status(200).send(finalResult);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: message.failed });
  }
};

// Routes for bulk changes, i.e. making changes to multiple employee objects at the same time
exports.changeDepartment = async (req, res) => {
  /*
  The expected data format (how req.body should look like):
  {
  destinationDepartmentId: 2
  employeeEmpIds: [1,2,3]
  }
  destinationDepartmentId is the id of the department where employees will be moved to.
  employeeEmpIds is an array of affected employee ids.
  */
  try {
    const data = await db.employee.update(
      { departmentId: req.body.destinationDepartmentId },
      {
        where: { empId: { [db.Sequelize.Op.in]: req.body.employeeEmpIds } },
      }
    );
    res.status(200).json({ message: `${data} record(s) updated` });
  } catch (err) {
    res.status(400).json({ message: message.failed });
  }
};

exports.changeJob = async (req, res) => {
  /*
  The expected data format (how req.body should look like):
  {
  destinationRoleId: 2
  employeeEmpIds: [1,2,3]
  }
  destinationRoleId is the id of the role where employees will be moved to.
  employeeEmpIds is an array of affected employee ids.
  */

  try {
    const data = await db.employee.update(
      { roleId: req.body.destinationRoleId },
      {
        where: { empId: { [db.Sequelize.Op.in]: req.body.employeeEmpIds } },
      }
    );
    res.status(200).json({ message: `${data} record(s) updated` });
  } catch (err) {
    res.status(400).json({ message: message.failed });
  }
};
