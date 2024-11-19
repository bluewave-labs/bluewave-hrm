const Sequelize = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize("hrm", "admin", "hrm", {
//   host: "54.173.233.239",
//   port: "5432",
//   dialect: process.env.dialect,
//   define: {
//     //freezeTableName: true,
//   },
//   dialectOptions: {
//     connectTimeout: 60000
//   }
// });
// */
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

db.offBoarding = require("./offBoarding")(sequelize, Sequelize);
db.offBoardingQuestion = require("./offBoardingQuestion")(sequelize, Sequelize);
db.offBoardingResponse = require("./offBoardingResponse")(sequelize, Sequelize);
db.offBoardingDocument = require("./offBoardingDocument")(sequelize, Sequelize);

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

db.offBoardingSurvey = require("./offBoardingSurvey")(sequelize, Sequelize);
db.offBoardingDocumentation = require("./offBoardingDocumentation")(
  sequelize,
  Sequelize
);

db.timeOffRenewalDate = require("./timeOffRenewalDate")(sequelize, Sequelize);

db.onBoarding = require("./onBoarding")(sequelize, Sequelize);
db.video = require("./video")(sequelize, Sequelize);
db.file = require("./file")(sequelize, Sequelize);
db.fileName = require("./fileName")(sequelize, Sequelize);
db.task = require("./task")(sequelize, Sequelize);
db.taskName = require("./taskName")(sequelize, Sequelize);
db.surveyQuestion = require("./surveyQuestion")(sequelize, Sequelize);
db.surveyResponse = require("./surveyResponse")(sequelize, Sequelize);
db.onBoardingSurvey = require("./onBoardingSurvey")(sequelize, Sequelize);

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

db.employee.hasOne(db.offBoarding, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});
db.offBoarding.belongsTo(db.employee, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});

db.offBoarding.belongsToMany(db.offBoardingResponse, {
  through: { model: db.offBoardingSurvey, unique: false },
  constraints: false,
});

db.offBoardingResponse.belongsToMany(db.offBoarding, {
  through: { model: db.offBoardingSurvey, unique: false },
  constraints: false,
});

db.offBoarding.belongsToMany(db.offBoardingDocument, {
  through: { model: db.offBoardingDocumentation, unique: false },
  constraints: false,
});

db.offBoardingDocument.belongsToMany(db.offBoarding, {
  through: { model: db.offBoardingDocumentation, unique: false },
  constraints: false,
});


/*
Remove the following commented codes
db.offBoarding.hasMany(db.offBoardingResponse, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});
db.offBoardingResponse.belongsTo(db.offBoarding, {
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
  foreignKey: "empId",
});
*/

// db.offBoarding.hasMany(db.offBoardingDocument, {
//   onDelete: "CASCADE",
//   OnUpdate: "CASCADE",
//   foreignKey: "empId",
// });
// db.offBoardingDocument.belongsTo(db.offBoarding, {
//   onDelete: "CASCADE",
//   OnUpdate: "CASCADE",
//   foreignKey: "empId",
// });
// db.offBoarding.hasMany(db.document, {
//   onDelete: "CASCADE",
//   OnUpdate: "CASCADE",
//   foreignKey: "empId",
// });
// db.document.belongsTo(db.offBoarding, {
//   onDelete: "CASCADE",
//   OnUpdate: "CASCADE",
//   foreignKey: "empId",
// });
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

db.onBoarding.belongsTo(db.employee, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "empId"
});

db.onBoarding.hasMany(db.file, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "onBoardingId"
});

db.onBoarding.hasMany(db.task, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "onBoardingId"
});

/*
db.onBoarding.hasMany(db.surveyResponse, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "onBoardingId"
});
*/

db.surveyResponse.belongsToMany(db.onBoarding, {
  through: { model: db.onBoardingSurvey, unique: false },
  constraints: false,
});

/*
db.employee.hasMany(db.surveyResponse, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "empId"
});
*/

module.exports = db;
