module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "satisfactionSurveyRespondent",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Anonymous",
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Anonymous",
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hasCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completedAt: {
        type: Sequelize.DATE,
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
