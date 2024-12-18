module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "satisfactionSurveyResponse",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      respondentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
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
