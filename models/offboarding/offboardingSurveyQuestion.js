module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offboardingSurveyQuestion",
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
