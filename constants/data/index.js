const fs = require("fs");

const displayInfo = (size, tableName) => {
  console.log(
    `Insert operation successful. ${size} ${
      size > 1 ? "records" : "record"
    } inserted into the ${tableName} table.`
  );
};

const removeKey = (data, key) => {
  data.forEach((element) => {
    delete element[key];
  });
};
//Note: properties serving as primary key in data are removed to enable autoIncrement to work.
module.exports = {
  populateUpdateTable: async function (db) {
    const datas = require("./update.json");
    removeKey(datas, "id");
    const results = await db.update.bulkCreate(datas, {
      validate: true
    });
    displayInfo(results.length, "update");
  },

  populateRoleTable: async function (db) {
    const datas = require("./role");
    removeKey(datas, "id");
    let count = 0;
    for (let data of datas) {
      await db.role.create({
        roleTitle: data.title,
        minimumSalary: data.minimumSalary,
        maximumSalary: data.maximumSalary,
      });
      count++;
    }
    displayInfo(count, "role");
  },
 
  populateUserTable: async function (db) {
    const users = require("./appUser.json");
    removeKey(users, "id");
    const results = await db.appUser.bulkCreate(users, {
      validate: true,
    });
    displayInfo(results.length, "appUser");
  },
  populateTeamTable: async function (db) {
    const teamData = require("./team.json");
    removeKey(teamData, "id");

    const results = await db.team.bulkCreate(teamData, {
      validate: true,
    });
    displayInfo(results.length, "team");
  },
  populateTimeOffTable: async function (db) {
    const data = require("./timeOff.json");
    removeKey(data, "id");
    const results = await db.timeOff.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "timeOff");
  },
  populatePermissionTable: async function (db) {
    const data = require("./permission.json");
    removeKey(data, "id");
    const results = await db.permission.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "permission");
  },
  populateCompanyTable: async function (db) {
    const data = require("./company.json");
    removeKey(data, "id");
    const imageFile = fs.readFileSync("./constants/data/logo.jpeg", {
      encoding: "base64",
    });
    for (let d of data) {
      d.companyLogo = imageFile;
    }
    const results = await db.company.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "company");
  },
  populateDepartmentTable: async function (db) {
    const data = require("./department.json");
    removeKey(data, "id");
    const results = await db.department.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "department");
  },
  populateEmployeeTable: async function (db) {
    const data = require("./employee.json");
    const path = "./constants/data/images/";
    if (fs.existsSync(path)) {
      for (let d of data) {
        console.log(d);
         const img = fs.readFileSync(`${path}${d.empId}.png`, {
         encoding: "base64",
        });
        d.photo = img;
      }
    } else {
      const maleImg = fs.readFileSync("./constants/data/male.png", {
        encoding: "base64",
      });
      const femaleImg = fs.readFileSync("./constants/data/female.png", {
        encoding: "base64",
      });
      for (let d of data) {
        d.photo = d.gender === "Male" ? maleImg : femaleImg;
      }
    }

    removeKey(data, "empId");
    const results = await db.employee.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "employee");
  },
  populateDocumentTable: async function (db) {
    const data = require("./document.json");
    removeKey(data, "id");
    const results = await db.document.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "document");
  },
  populateSocialProfileTable: async function (db) {
    const data = require("./socialProfile.json");
    removeKey(data, "id");
    const results = await db.socialProfile.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "socialProfile");
  },
  populateTimeOffHistoryTable: async function (db) {
    const data = require("./timeOffHistory.json");
    removeKey(data, "id");
    const results = await db.timeOffHistory.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "timeOffHistory");
  },
  populateChangeHistoryTable: async function (db) {
    const data = require("./changeHistory.json");
    removeKey(data, "id");
    const results = await db.changeHistory.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "changeHistory");
  },
  populateReportToTable: async function (db) {
    const data = require("./reportTo.json");
    removeKey(data, "id");
    const results = await db.reportTo.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "reportTo");
  },

  populateEmployeeAnnualTimeOffTable: async function (db) {
    const data = require("./employeeAnnualTimeOff.json");
    removeKey(data, "id");
    const results = await db.employeeAnnualTimeOff.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "employeeAnnualTimeOff");
  },

  populateTables: async function (db) {
    console.log("Populating tables...");
    await this.populateRoleTable(db);
    await this.populateTeamTable(db);
    await this.populateTimeOffTable(db);
    await this.populatePermissionTable(db);
    await this.populateCompanyTable(db);
    await this.populateDepartmentTable(db);
    await this.populateEmployeeTable(db);
    await this.populateSocialProfileTable(db);
    await this.populateDocumentTable(db);
    await this.populateUserTable(db);
    await this.populateTimeOffHistoryTable(db);
    await this.populateChangeHistoryTable(db);
    await this.populateReportToTable(db);
    await this.populateEmployeeAnnualTimeOffTable(db);
    await this.populateUpdateTable(db);
    console.log("Operation successful, tables Populated.");
  },
};
