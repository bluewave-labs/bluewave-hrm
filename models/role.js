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
        allowNull: false,
      },
      maximumSalary: {
        type: Sequelize.INTEGER,
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
