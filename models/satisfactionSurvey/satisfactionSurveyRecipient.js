module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "satisfactionSurveyRecipient",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
  );
};
