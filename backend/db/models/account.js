"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: 'Owner'
      });
    }
  }
  Account.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fleetSize: {
        type: DataTypes.INTEGER,
      },
      lookingFor: {
        type: DataTypes.STRING,
      },
      equipmentType: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
