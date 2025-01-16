module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offboarding",
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
      signedDocumentAck: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      step:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }, 
      startedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      accessToken: {
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
