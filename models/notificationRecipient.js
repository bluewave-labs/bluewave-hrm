module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "notificationRecipient",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: "new",
          validate: {
            isIn: [["new", "seen", "waiting"]],
          },
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: false,
      }
    );
  };
  