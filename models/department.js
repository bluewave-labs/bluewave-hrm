module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "department",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      departmentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentManagerId: {
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
