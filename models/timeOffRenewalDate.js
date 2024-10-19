module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "timeOffRenewalDate",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        renewalDate: {
          type: Sequelize.DATE,
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
  