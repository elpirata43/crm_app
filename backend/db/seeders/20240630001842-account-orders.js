"use strict";
const { Order } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const orderData = [
  {
    accountId: 1,
    vin: "1FTFW1EF1EKF12345",
    model: "International",
    year: 2015,
    price: 75000,
    tax: 9,
    license: 1500,
  },
  {
    accountId: 1,
    vin: "1FTFW1EF1EKF67890",
    model: "International",
    year: 2016,
    price: 82000,
    tax: 9,
    license: 1800,
  },
  {
    accountId: 3,
    vin: "1FTFW1EF1EKF11223",
    model: "International",
    year: 2017,
    price: 95000,
    tax: 10,
    license: 1200,
  },
  {
    accountId: 4,
    companyName: "Company 4",
    vin: "1FTFW1EF1EKF33445",
    model: "International",
    year: 2018,
    price: 105000,
    tax: 9,
    license: 2000,
  },
  {
    accountId: 5,
    vin: "1FTFW1EF1EKF55667",
    model: "International",
    year: 2019,
    price: 120000,
    tax: 10,
    license: 1400,
  },
  {
    accountId: 5,
    vin: "1FTFW1EF1EKF77889",
    model: "International",
    year: 2020,
    price: 135000,
    tax: 9,
    license: 2300,
  },
  {
    accountId: 7,
    companyName: "Company 7",
    vin: "1FTFW1EF1EKF99112",
    model: "International",
    year: 2021,
    price: 150000,
    tax: 9,
    license: 1700,
  },
  {
    accountId: 8,
    vin: "1FTFW1EF1EKF21334",
    model: "International",
    year: 2022,
    price: 165000,
    tax: 10,
    license: 2200,
  },
  {
    accountId: 9,
    vin: "1FTFW1EF1EKF43556",
    model: "International",
    year: 2023,
    price: 180000,
    tax: 9,
    license: 2500,
  },
  {
    accountId: 9,
    vin: "1FTFW1EF1EKF65778",
    model: "International",
    year: 2024,
    price: 195000,
    tax: 10,
    license: 2000,
  },
];


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Order.bulkCreate(orderData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Orders'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      accountId: { [Op.in]: [ 1, 2, 3] }
    ,}, {});  }
};
