const db = require("../../models");
require("dotenv").config();
const message = require("../../constants/messages.json");
const { Value } = require("@sequelize/core");
const { produce } = require("immer");

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

exports.showManagers = async (req, res) => {
  const departmentLeadId = await db.department.findAll({
    attributes: [["departmentManagerId", "id"]],
  });

  const teamLeadId = await db.team.findAll({
    attributes: [["teamLeadId", "id"]],
  });

  const ids = [];
  for (let emp of departmentLeadId) {
    if (emp.id && !ids.includes(emp.id)) {
      ids.push(emp.id);
    }
  }
  for (let emp of teamLeadId) {
    if (emp.id && !ids.includes(emp.id)) {
      ids.push(emp.id);
    }
  }

  const managers = await db.employee.findAll({
    attributes: ["empId", "firstName", "lastName"],
    order: ["firstName", "lastName"],
    where: { empId: ids },
  });

  res.json(managers);
};

exports.showAll = async (req, res) => {
  const employee = await db.employee.findAll({
    //include: { all: true, nested: false }, // This will display all the data pertaining to employee table
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

exports.showOne = async (req, res) => {
  const id = req.params.id;
  const employee = await db.employee.findByPk(id, {
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
  });
  if (employee === null) {
    res.status(400).send("Not found!");
  } else {
    employee.photo = employee.photo && employee.photo.toString("base64");
    if (employee.Manager) {
      employee.Manager.photo =
        employee.Manager.photo && employee.Manager.photo.toString("base64");
    }
    res.status(200).send(employee);
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
    where: { managerId: req.params.id }
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
  const employee = await db.employee.findOne({
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
    where: { email: req.body.email.toLowerCase() },
  });
  if (employee === null) {
    res.send(null);
  } else {
    employee.photo = employee.photo && employee.photo.toString("base64");
    if (employee.Manager) {
      employee.Manager.photo =
        employee.Manager.photo && employee.Manager.photo.toString("base64");
    }
    res.status(200).json(employee);
  }
};

exports.createRecord = async (req, res) => {
  //checking for email already exists
  const check = await db.employee.findOne({ where: { email: req.body.email } });
  if (check) {
    return res.send(message.alreadyExists);
  }
  try {
    const data = await db.employee.create(req.body, {
      include: ["socialProfiles"],
    });
    res.status(201).json(data);
  } catch (err) {
    res.send(err);
  }
};

exports.updateRecord = async (req, res) => {
  const updatedData = req.body;
  //checking for email already exists
  const check = await db.employee.findOne({
    where: {
      email: req.body.email,
      empId: {
        [db.Sequelize.Op.not]: updatedData.empId,
      },
    },
  });
  if (check) {
    return res.send(message.alreadyExists);
  }
  try {
    const employee = await db.employee.findByPk(updatedData.empId);
    employee.set(updatedData);
    await employee.save();
    res.status(200).json({ message: employee });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteRecord = async (req, res) => {
  const empId = req.params.id;
  try {
    const count = await db.employee.destroy({
      where: { empId: empId },
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
// Routes for data summaries
exports.summarizeByDepartments = async (req, res) => {
  try {
    const query = `select  d."departmentName", count(e."empId") as "count" from employee e JOIN department d ON e."departmentId" = d."id" GROUP BY e."departmentId", d."departmentName" ORDER BY d."departmentName"`;
    const [results, metadata] = await db.sequelize.query(query);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({ message: message.failed });
  }
};

exports.summarizeByJobTitles = async (req, res) => {
  try {
    const query = `select r."roleTitle", count(e."empId") from employee e JOIN role r ON e."roleId" = r."roleId" GROUP BY r."roleTitle" ORDER BY 1;`;
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
    console.log(date.getFullYear());
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
