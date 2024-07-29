module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "employeeAnnualTimeOff",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      yearNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hoursAllowed: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      cumulativeHoursTaken: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
