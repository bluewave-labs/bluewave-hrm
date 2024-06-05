const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const bcrypt = require("bcrypt");
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
sequelize.authenticate().then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require the models
db.administrator = require('./administrator')(sequelize, Sequelize);
db.changeHistory = require('./changeHistory')(sequelize, Sequelize);
db.company = require('./company')(sequelize, Sequelize);
db.department = require('./department')(sequelize, Sequelize);
db.document = require('./document')(sequelize, Sequelize);
db.emergencyContact = require('./emergencyContact')(sequelize, Sequelize);
db.employee = require('./employee')(sequelize, Sequelize);
db.permission = require('./permission')(sequelize, Sequelize);
db.role = require('./role')(sequelize, Sequelize);
db.socialProfile = require('./socialProfile')(sequelize, Sequelize);
db.team = require('./team')(sequelize, Sequelize);
db.timeOff = require('./timeOff')(sequelize, Sequelize);
db.timeOffHistory = require('./timeOffHistory')(sequelize, Sequelize);
db.companySocialProfile = require('./companySocialProfile')(sequelize, Sequelize);
db.reportTo = require('./reportTo')(sequelize, Sequelize);
db.employeeAnnualTimeOff = require('./employeeAnnualTimeOff')(sequelize, Sequelize);
db.administratorPermission = require('./administratorPermission')(sequelize, Sequelize);

//Establishing the relationships
db.employee.hasMany(db.reportTo, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.reportTo.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.role.hasMany(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'roleId',
});

db.employee.belongsTo(db.role, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'roleId',
});

db.employee.hasMany(db.document,{
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

 db.document.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
 });

 db.team.hasMany(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'teamId',
});

db.employee.belongsTo(db.team, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'teamId',
});

db.employee.hasMany(db.changeHistory, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.changeHistory.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.employee.hasMany(db.administrator, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.administrator.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.employee.hasMany(db.timeOffHistory, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.timeOffHistory.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.employee.hasMany(db.socialProfile, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.socialProfile.belongsTo(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'empId',
});

db.company.hasMany(db.companySocialProfile, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'companyId',
});

db.companySocialProfile.belongsTo(db.company, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'companyId',
});

db.timeOff.hasMany(db.timeOffHistory, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'timeOffId',
});

db.timeOffHistory.belongsTo(db.timeOff, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'timeOffId',
});

db.emergencyContact.hasMany(db.employee, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'id',
});

db.employee.belongsTo(db.emergencyContact, {
  onDelete: 'CASCADE',
  OnUpdate: 'CASCADE',
  foreignKey: 'id',
});

db.timeOff.belongsToMany(db.employee, { through: db.employeeAnnualTimeOff });
db.employee.belongsToMany(db.timeOff, { through: db.employeeAnnualTimeOff });

db.permission.belongsToMany(db.administrator, { through: db.administratorPermission });
db.administrator.belongsToMany(db.permission, { through: db.administratorPermission });

module.exports = db;