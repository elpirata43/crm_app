// "use strict";
// const { Account } = require("../models");
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA; // define your schema in options object
// }
// const accountData = [
//   {
//     ownerId: 1,
//     companyName: "Company 1",
//     businessType: "Construction",
//     fleetSize: 5,
//     lookingFor: "Dump Truck",
//     equipmentType: "Dump Truck",
//     email: "abc@user.io",
//     phoneNumber: 555-555-5555,
//     address: "123 Main Street",
//     city: "Example City",
//     state: "CA",
//     zipCode: 94611,
//   },
//   {
//     ownerId: 1,
//     companyName: "Company 2",
//     businessType: "Landscaping",
//     fleetSize: 2,
//     lookingFor: "Water Truck",
//     equipmentType: "Flatbed",
//     email: "flower@user.io",
//     phoneNumber: 555-555-5555,
//     address: "123 Main Street",
//     city: "Example City",
//     state: "CA",
//     zipCode: 94611,
//   },
//   {
//     ownerId: 1,
//     companyName: "Company 3",
//     businessType: "Transport",
//     fleetSize: 2,
//     lookingFor: "Sleeper",
//     equipmentType: "Sleeper",
//     email: "hauling@user.io",
//     phoneNumber: 555-555-5555,
//     address: "123 Main Street",
//     city: "Example City",
//     state: "CA",
//     zipCode: 94611,
//   },
// ];

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await Account.bulkCreate(accountData, { validate: true });
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete(options, "Accounts", null, {});
//   },
// };
