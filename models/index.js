const Sequelize = require("sequelize");
require("dotenv").config();

/*
const sequelize = new Sequelize("hrm", "admin", "hrm", {
  host: "54.173.233.239",
  port: "5432",
  dialect: "postgres",
  define: {
    //freezeTableName: true,
  },
});
*/
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.dialect,
    define: {
      //freezeTableName: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require the models
db.appUser = require("./appUser")(sequelize, Sequelize);
db.changeHistory = require("./changeHistory")(sequelize, Sequelize);
db.company = require("./company")(sequelize, Sequelize);
db.department = require("./department")(sequelize, Sequelize);
db.document = require("./document")(sequelize, Sequelize);
db.employee = require("./employee")(sequelize, Sequelize);
db.permission = require("./permission")(sequelize, Sequelize);
db.role = require("./role")(sequelize, Sequelize);
db.socialProfile = require("./socialProfile")(sequelize, Sequelize);
db.team = require("./team")(sequelize, Sequelize);
db.timeOff = require("./timeOff")(sequelize, Sequelize);
db.timeOffHistory = require("./timeOffHistory")(sequelize, Sequelize);
db.passwordHistory = require("./passwordHistory")(sequelize, Sequelize);

db.notification = require("./notification")(sequelize, Sequelize);
db.notificationRecipient = require("./notificationRecipient")(
  sequelize,
  Sequelize
);

db.reportTo = require("./reportTo")(sequelize, Sequelize);
db.employeeAnnualTimeOff = require("./employeeAnnualTimeOff")(
  sequelize,
  Sequelize
);

db.timeOffRenewalDate = require("./timeOffRenewalDate")(sequelize, Sequelize);

// offboarding models begin here
db.offboarding = require("./offboarding/offboarding")(sequelize, Sequelize);
db.offboardingSurveyQuestion =
  require("./offboarding/offboardingSurveyQuestion")(sequelize, Sequelize);
db.offboardingSurveyResponse =
  require("./offboarding/offboardingSurveyResponse")(sequelize, Sequelize);
db.offboardingDocument = require("./offboarding/offboardingDocument")(
  sequelize,
  Sequelize
);
db.offboardingSignedDocument =
  require("./offboarding/offboardingSignedDocument")(sequelize, Sequelize);

// through table/models
db.offboardingSurvey = require("./offboarding/offboardingSurvey")(
  sequelize,
  Sequelize
);
db.offboardingDocumentation = require("./offboarding/offboardingDocumentation")(
  sequelize,
  Sequelize
);
// offboarding models end here

// satisfaction models begin here
db.satisfactionSurvey = require("./satisfactionSurvey/satisfactionSurvey")(
  sequelize,
  Sequelize
);
db.satisfactionSurveyQuestion =
  require("./satisfactionSurvey/satisfactionSurveyQuestion")(
    sequelize,
    Sequelize
  );
db.satisfactionSurveyRespondent =
  require("./satisfactionSurvey/satisfactionSurveyRespondent")(
    sequelize,
    Sequelize
  );
db.satisfactionSurveyResponse =
  require("./satisfactionSurvey/satisfactionSurveyResponse")(
    sequelize,
    Sequelize
  );

//through table/model linking employee to a survey
db.satisfactionSurveyRecipient =
  require("./satisfactionSurvey/satisfactionSurveyRecipient")(
    sequelize,
    Sequelize
  );

// satisfaction models end here

//Establishing the relationships
db.employee.hasMany(db.reportTo, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.reportTo.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.role.hasMany(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "roleId",
});

db.employee.belongsTo(db.role, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "roleId",
});

db.department.hasMany(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "departmentId",
});

db.employee.belongsTo(db.department, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "departmentId",
});

db.employee.hasMany(db.document, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.document.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.team.hasMany(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "teamId",
});

db.employee.belongsTo(db.team, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "teamId",
});

db.employee.hasMany(db.changeHistory, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.changeHistory.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.employee.hasMany(db.appUser, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.appUser.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.employee.hasMany(db.timeOffHistory, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.timeOffHistory.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.employee.hasMany(db.socialProfile, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.socialProfile.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.timeOff.hasMany(db.timeOffHistory, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "timeOffId",
});

db.timeOffHistory.belongsTo(db.timeOff, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "timeOffId",
});

db.permission.hasMany(db.appUser, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "permissionId",
});

db.appUser.belongsTo(db.permission, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "permissionId",
});

// ******************** offboarding models relationships start here *******************
db.employee.hasOne(db.offboarding, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});
db.offboarding.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.offboarding.belongsToMany(db.offboardingSurveyResponse, {
  through: { model: db.offboardingSurvey, unique: false },
  constraints: false,
});

db.offboardingSurveyResponse.belongsToMany(db.offboarding, {
  through: { model: db.offboardingSurvey, unique: false },
  constraints: false,
});

db.offboarding.belongsToMany(db.offboardingSignedDocument, {
  through: { model: db.offboardingDocumentation, unique: false },
  constraints: false,
});

db.offboardingSignedDocument.belongsToMany(db.offboarding, {
  through: { model: db.offboardingDocumentation, unique: false },
  constraints: false,
});

// ******************** offboarding models relationships end here *******************

// ******************** satisfaction survery models relationships start here *******************
db.satisfactionSurvey.hasMany(db.satisfactionSurveyRespondent, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});

db.satisfactionSurveyRespondent.belongsTo(db.satisfactionSurvey, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});

db.satisfactionSurvey.hasMany(db.satisfactionSurveyRecipient, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});

db.satisfactionSurveyRecipient.belongsTo(db.satisfactionSurvey, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});

db.satisfactionSurvey.hasMany(db.satisfactionSurveyQuestion, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});

db.satisfactionSurveyQuestion.belongsTo(db.satisfactionSurvey, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "surveyId",
});
db.satisfactionSurveyRespondent.hasMany(db.satisfactionSurveyResponse, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "respondentId",
});

db.satisfactionSurveyResponse.belongsTo(db.satisfactionSurveyRespondent, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "respondentId",
});

// ******************** satisfaction survey models relationships end here *******************

db.appUser.hasMany(db.passwordHistory, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "userId",
});

db.passwordHistory.belongsTo(db.appUser, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "userId",
});

db.employee.hasMany(db.notification, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.notification.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.timeOffHistory.hasMany(db.notification, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "timeOffHistoryId",
});

db.notification.belongsTo(db.timeOffHistory, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "timeOffHistoryId",
});

db.employeeAnnualTimeOff.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.employee.hasMany(db.employeeAnnualTimeOff, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.employee.belongsTo(db.employee, { foreignKey: "managerId", as: "Manager" });

db.timeOff.belongsToMany(db.employee, {
  through: { model: db.employeeAnnualTimeOff, unique: false },
  constraints: false,
});
db.employee.belongsToMany(db.timeOff, {
  through: { model: db.employeeAnnualTimeOff, unique: false },
  constraints: false,
});

db.notification.belongsToMany(db.employee, {
  through: { model: db.notificationRecipient, unique: false },
  constraints: false,
});
db.employee.belongsToMany(db.notification, {
  through: { model: db.notificationRecipient, unique: false },
  constraints: false,
});

module.exports = db;
