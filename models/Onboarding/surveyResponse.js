module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "surveyResponse",
        {
            //Survey response ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //ID number of the onboarding process this response belongs to
            onBoardingId: {
                type: Sequelize.INTEGER,
            },
            //Order number of response
            orderNumber: {
                type: Sequelize.INTEGER
            },
            //ID number of the employee this response belongs to
            empId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            //Text of question this response is answering
            question: {
                type: Sequelize.STRING,
                allowNull: false
            },
            //Text of response
            answer: {
                type: Sequelize.STRING,
                defaultValue: ""
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