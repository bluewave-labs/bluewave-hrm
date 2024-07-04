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
        allowNull: true,
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
        allowNull: true,
      },
      companyDomain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unitSuite: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateProvince: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postalZipCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebookUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twitterUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedinUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
    }
  );
};
