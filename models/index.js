const Sequelize = require("sequelize");
require("dotenv").config();

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

db.reportTo = require("./reportTo")(sequelize, Sequelize);
db.employeeAnnualTimeOff = require("./employeeAnnualTimeOff")(
  sequelize,
  Sequelize
);

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

db.employee.belongsTo(db.employee, { foreignKey: "managerId", as: "Manager" });

db.timeOff.belongsToMany(db.employee, { through: db.employeeAnnualTimeOff });
db.employee.belongsToMany(db.timeOff, { through: db.employeeAnnualTimeOff });

module.exports = db;
