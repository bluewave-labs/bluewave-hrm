module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "surveyQuestion",
        {
            //Survey question ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //Question text
            question: {
                type: Sequelize.STRING,
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