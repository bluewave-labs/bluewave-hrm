module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "team",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teamLeadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      teamDescription: {
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
