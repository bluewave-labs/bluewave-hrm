const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    'sid@POSGRESQL2024',
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

db.Employee = require('./employee')(sequelize, Sequelize);
db.TimeOffType = require('./timeofftype')(sequelize,Sequelize);

module.exports = db;
