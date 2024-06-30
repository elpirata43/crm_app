"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account',
        onDelete: 'CASCADE'
      });
    }
  }
  Order.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      license: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bodies: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extras: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
