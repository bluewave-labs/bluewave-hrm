module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "offBoardingSurvey",
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
  