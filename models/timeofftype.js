module.exports = (sequelize, Sequelize) => {
    const TimeOffType = sequelize.define('TimeOffType', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        tableName: 'TimeOffTypes',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        underscored: true
    });

    return TimeOffType;
};
