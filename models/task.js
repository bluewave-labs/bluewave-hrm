module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "task",
        {
            //Task ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //ID number of the onboarding process this task belongs to
            onBoardingId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            //Order number of task
            index: {
                type: Sequelize.INTEGER
            },
            //Task name
            name: {
                type: Sequelize.STRING
            },
            //Flag determining whether this task has been set as completed
            done: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        },
        //Sequelize table config details
        {
            sequelize,
            freezeTableName: true,
            timestamps: true
        }
    );
};