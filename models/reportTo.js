module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "reportTo",
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
        empMgrId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        priority: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
      }
    );
  };
  