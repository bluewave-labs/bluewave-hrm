module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "document",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      documentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      documentDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateUploaded: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      documentFile: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      documentExtension:{
        type: Sequelize.STRING
      }
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
