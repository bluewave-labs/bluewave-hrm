module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "file",
        {
            //File ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //ID number of the onboarding process this file belongs to
            onBoardingId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, 
            //File name
            title: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            //File content
            file: {
                type: Sequelize.BLOB,
                allowNull: false
            },
            //File category
            category: {
                type: Sequelize.STRING
            },
            //File type
            extension: {
                type: Sequelize.STRING
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