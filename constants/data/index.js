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
        //console.log(d);
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

  populateFileNameTable: async function (db) {
    const data = require("./fileName.json");
    const jobOffer = fs.readFileSync("./constants/data/job_offer.pdf", {
      encoding: "base64",
    });
    const NDA = fs.readFileSync("./constants/data/NDA.pdf", {
      encoding: "base64",
    });
    data[0].file = jobOffer;
    data[1].file = NDA;
    const results = await db.fileName.bulkCreate(data, {
      validate: true,
    });
    displayInfo(results.length, "file");
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

  populateOffboardingTables: async function (db) {
    const questionData = require("./offboarding/offboardingSurveyQuestion.json");
    const responseData = require("./offboarding/offboardingSurveyResponse.json");
    const offboardingData = require("./offboarding/offboarding.json");
    const docData = require("./offboarding/offboardingDocument.json");
    const surveyData = require("./offboarding/offboardingSurvey.json");
    const ndaPath = "./constants/data/offboarding/NDA.pdf";
    const leaveLetterPath =
      "./constants/data/offboarding/resignation-letter.docx";
    // Create survey questions
    let results = await db.offboardingSurveyQuestion.bulkCreate(questionData, {
      validate: true,
    });
    // Create offboarding
    results = await db.offboarding.bulkCreate(offboardingData, {
      validate: true,
    });
    // Create survey response
    results = await db.offboardingSurveyResponse.bulkCreate(responseData, {
      validate: true,
    });
    // Create offboarding survey
    results = await db.offboardingSurvey.bulkCreate(surveyData, {
      validate: true,
    });

    // Read document files
    const leaveLetter = fs.readFileSync(leaveLetterPath, {
      encoding: "base64",
    });

    const nda = fs.readFileSync(ndaPath, {
      encoding: "base64",
    });

    // Update document files
    docData[0].documentFile = leaveLetter;
    docData[1].documentFile = nda;

    // Create documents
    results = await db.offboardingDocument.bulkCreate(docData, {
      validate: true,
    });

    // Create signed documents
    docData[0]["offboardingId"] = 1;
    docData[1]["offboardingId"] = 1;

    await db.offboardingSignedDocument.bulkCreate(docData, {
      validate: true,
    });

    // Create offboarding documentation - linking offboarding to signed documents
    results = await db.offboardingDocumentation.bulkCreate(
      [
        {
          offboardingId: 1,
          offboardingSignedDocumentId: 1,
        },
        {
          offboardingId: 1,
          offboardingSignedDocumentId: 2,
        },
      ],
      {
        validate: true,
      }
    );

    console.log("Offboarding records successfully created");
  },

  populateSatisfactionSurveyTables: async function (db) {
    const respondentData = require("./satisfactionSurvey/satisfactionSurveyRespondent.json");
    const surveyData = require("./satisfactionSurvey/satisfactionSurvey.json");
    const questionData = require("./satisfactionSurvey/satisfactionSurveyQuestion.json");
    const responseData = require("./satisfactionSurvey/satisfactionSurveyResponse.json");
    const recipientData = require("./satisfactionSurvey/satisfactionSurveyRecipient.json");

    // Create satisfactionSurvey
    await db.satisfactionSurvey.bulkCreate(surveyData, {
      validate: true,
    });
    // Create survey questions
    await db.satisfactionSurveyQuestion.bulkCreate(questionData, {
      validate: true,
    });
    // Create survey respondent
    await db.satisfactionSurveyRespondent.bulkCreate(respondentData, {
      validate: true,
    });
    // Create survey response
    await db.satisfactionSurveyResponse.bulkCreate(responseData, {
      validate: true,
    });
    // Create survey repcipient
    await db.satisfactionSurveyRecipient.bulkCreate(recipientData, {
      validate: true,
    });
    console.log("Satisfaction survey records successfully created");
  },

  populateTimeOffRenewalDateTable: async function (db) {
    const date = new Date(`${new Date().getFullYear() + 1}-Jan-01`); // January first of the following year
    await db.timeOffRenewalDate.create({ renewalDate: date });
  },

  populateRequiredTables: async function (db) {
    console.log("Populating required tables...");
    await this.populatePermissionTable(db);
    await this.populateTimeOffRenewalDateTable(db);
    console.log("Operation successful, required tables Populated.");
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
    await this.populateNotificationTable(db);
    await this.populateVideoTable(db);
    await this.populateFileNameTable(db);
    await this.populateSurveyQuestionTable(db);
    await this.populateTaskNameTable(db);
    // await this.populateOnboardingTable(db);
    // await this.populateTaskTable(db);
    // await this.populateSurveyResponseTable(db);
    await this.populateOffboardingTables(db);
    await this.populateSatisfactionSurveyTables(db);
    await this.populateTimeOffRenewalDateTable(db);
    console.log("Operation successful, tables Populated.");
  },
};
