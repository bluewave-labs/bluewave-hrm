module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offBoarding",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      answer1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer5: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      SignedDocumentAck: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isCompleted: {
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
