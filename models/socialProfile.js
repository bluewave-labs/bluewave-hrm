module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "socialProfile",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mediumName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      profileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
