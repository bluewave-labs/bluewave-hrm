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
    const imageFile = fs.readFileSync("./constants/data/logo.png", {
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
  populateOffBoardingDocumentTable: async function (db) {
    const data = require("./offBoardingDocument.json");
    removeKey(data, "id");
    const results = await db.offBoardingDocument.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "offBoardingDocument");
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

  populateNotificationTable: async function (db) {
    const data = require("./notification.json");
    const results = await db.notification.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "notification");

    const recipientData = require("./notificationRecipient.json");
    const results2 = await db.notificationRecipient.bulkCreate(recipientData, {
      validate: true,
    });
    displayInfo(results2.length, "notificationRecipient");
  },

  populateVideoTable: async function (db) {
    const data = require("./video.json");
    const results = await db.video.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "video");
  },

  populateFileTable: async function (db) {
    const data = require("./file.json");
    const jobOffer = fs.readFileSync("./constants/data/job_offer.docx", {
      encoding: "base64",
    });
    const NDA = fs.readFileSync("./constants/data/NDA.pdf", {
      encoding: "base64",
    });
    data[0].file = jobOffer;
    data[1].file = NDA;
    const results = await db.file.bulkCreate(data, {
      validate: true
    });
    displayInfo(results.length, "file")
  },

  populateSurveyQuestionTable: async function (db) {
    const data = require("./onBoardingSurveyQuestion.json");
    const results = await db.surveyQuestion.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "surveyQuestion");
  },

  populateTaskNameTable: async function (db) {
    const data = require("./taskName.json");
    const results = await db.taskName.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "taskName");
  },

  populateOnboardingTable: async function (db) {
    const data = require("./onBoarding.json");
    const results = await db.onBoarding.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "onBoarding");
  },

  populateTaskTable: async function (db) {
    const data = require("./task.json");
    const results = await db.task.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "task");
  },

  populateSurveyResponseTable: async function (db) {
    const data = require("./onBoardingSurveyResponse.json");
    const results = await db.surveyResponse.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "surveyResponse");
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
    await this.populateOffBoardingDocumentTable(db);
    await this.populateUserTable(db);
    await this.populateTimeOffHistoryTable(db);
    await this.populateChangeHistoryTable(db);
    await this.populateReportToTable(db);
    await this.populateEmployeeAnnualTimeOffTable(db);
    await this.populateNotificationTable(db);
    await this.populateVideoTable(db);
    await this.populateFileTable(db);
    await this.populateSurveyQuestionTable(db);
    await this.populateTaskNameTable(db);
    // await this.populateOnboardingTable(db);
    // await this.populateTaskTable(db);
    // await this.populateSurveyResponseTable(db);
    console.log("Operation successful, tables Populated.");
  },
};
