module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "satisfactionSurvey",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      welcomeTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      welcomeMessage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endMessage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      anonymous: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
