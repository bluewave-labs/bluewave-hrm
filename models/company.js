module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "company",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyWebsite: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyLogo: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      administratorEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyDomain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitSuite: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateProvince: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalZipCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
      initialAutoIncrement: 100000,
    }
  );
};
