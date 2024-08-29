const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "appUser",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          const newValue = value ? value.toLowerCase() : value;
          this.setDataValue("email", newValue);
        },
        get() {
          const rawValue = this.getDataValue("email");
          return rawValue ? rawValue.toLowerCase() : null;
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      access: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Permitted",
        validate: {
          isIn: [["Permitted", "Suspended", "Revoked"]],
        },
      },
      permissionId: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        allowNull: true,
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passwordResetTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      autoDeleteAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
