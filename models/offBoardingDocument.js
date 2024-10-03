module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offBoardingDocument",
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

      documentFile: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      documentCategory: {
        type: Sequelize.STRING,
      },
      documentExtension: {
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
