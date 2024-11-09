module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "onBoarding",
        {
            //Onboarding process ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //ID number of the employee this onboarding process belongs to
            empId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            //Number representing which step the employee is currently on
            stepNumber: {
                type: Sequelize.INTEGER
            },
            //Flag determining whether the user has watched all the videos
            watchedVideos: {
                type: Sequelize.BOOLEAN
            },
            //Flag determining whether the user has reviewed all the documents
            readDocuments: {
                type: Sequelize.BOOLEAN
            },
            //Flag determining whether the user has completed this onboarding process
            isComplete: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },
        //Sequelize table config details
        {
            sequelize,
            freezeTableName: true,
            timestamps: true
        }
    );
};