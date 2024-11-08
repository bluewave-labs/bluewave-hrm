module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "taskName",
        {
            //Task ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true, 
                autoIncrement: true,
                allowNull: false
            },
            //Task order
            index: {
                type: Sequelize.INTEGER
            },
            //Task text
            text: {
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