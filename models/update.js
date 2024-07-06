module.exports = function(sequelize, Sequelize) {
    return sequelize.define(
        "update",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            empId: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },

        },
        {
            sequelize,
            freezeTableName: true,
            timestamps: true
        }
    );
};