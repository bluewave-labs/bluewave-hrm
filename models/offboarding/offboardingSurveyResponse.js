module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offboardingSurveyResponse",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderNumber: {
        type: Sequelize.INTEGER,
      },
      offboardingId: {
        type: Sequelize.INTEGER,
      },
      empId: {
        type: Sequelize.INTEGER,
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
