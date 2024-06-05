module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "administratorPermission",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      administratorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      isGranted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
  );
};
