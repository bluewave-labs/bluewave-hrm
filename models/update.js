module.exports = function(sequelize, Sequelize) {
    return sequelize.define(
        "update",
        {
            //Update ID number of this notification
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //ID number of employee this notification belongs to
            empId: {
                type: Sequelize.INTEGER
            },
            //Notification status
            status: {
                type: Sequelize.STRING
            },
            //Notification short description
            name: {
                type: Sequelize.STRING
            },
            //Notification full description
            description: {
                type: Sequelize.STRING
            },

        },
        //Sequelize Table config details
        {
            sequelize,
            freezeTableName: true,
            timestamps: true
        }
    );
};