module.exports = function (sequelize, Sequelize) {
  return sequelize.define(
    "notification",
    {
      //Notification ID number of a notification object
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Title of the notification
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //Notification message
      message: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      //ID number of the new employee or employee that creates a time of request
      empId: {
        type: Sequelize.INTEGER,
      },
      //Time off history id
      timeOffHistoryId: {
        type: Sequelize.INTEGER,
      },
    },
    //Sequelize Table config details
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
