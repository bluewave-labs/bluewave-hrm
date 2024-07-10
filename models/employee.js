module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('Employee',{
        empID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
          superID:{
            type: Sequelize.INTEGER,
            allowNull:false,

          },
          superEmail: {
            type: Sequelize.STRING,
            allowNULL: false,
          },
          sick: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          vacation: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          beaverment: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          type:{
            type: Sequelize.STRING,
            allowNull: false
          }
        }, {
            sequelize,
            freezeTableName: true,
            timestamps: false,
        });

        return Employee;
}