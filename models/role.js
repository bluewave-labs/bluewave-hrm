module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "role",
    {
      roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roleTitle: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      minimumSalary: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      maximumSalary: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
