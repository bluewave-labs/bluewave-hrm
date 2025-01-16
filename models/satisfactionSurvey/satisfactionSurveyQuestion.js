module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "satisfactionSurveyQuestion",
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
      orderNumber: {
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
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
