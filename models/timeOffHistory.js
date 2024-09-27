module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "timeOffHistory",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hours: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approvalAuthorityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timeOffId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      requestDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      decisionDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
          isAfterRequestDate(value) {
            if (value < this.requestDate) {
              throw new Error("Decision date must be after request date.");
            }
          },
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending",
        validate: {
          isIn: [["Approved", "Declined", "Pending", "Deleting", "Cancelled"]],
        },
        set(value) {
          // Capitalize the first character
          const newValue = value
            ? value[0].toUpperCase() + value.slice(1).toLowerCase()
            : value;
          this.setDataValue("status", newValue);
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
