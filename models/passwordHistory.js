const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "passwordHistory",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      passwordCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
