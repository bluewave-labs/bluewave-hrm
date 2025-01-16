module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "video",
        {
            //Video ID number
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            //Video title
            title: {
                type: Sequelize.STRING
            },
            //Video source
            src: {
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