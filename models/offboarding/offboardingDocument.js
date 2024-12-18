module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "offboardingDocument",
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
      },
      documentFile: {
        type: Sequelize.BLOB,
        allowNull: false,
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
