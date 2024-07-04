module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "changeHistory",
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
          date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          changeType: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          changeFrom: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          changeTo: {
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