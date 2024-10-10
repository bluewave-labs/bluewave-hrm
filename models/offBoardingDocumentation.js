module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "offBoardingDocumentation",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: false,
      }
    );
  };
  