module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "offboardingSignedDocument",
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
        offboardingId: {
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
        },
        documentDescription: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
      }
    );
  };
  