#!/usr/bin/env node

require('dotenv').config();

const { sequelize } = require('../db/models');

sequelize
    .query(`CREATE SCHEMA IF NOT EXISTS ${process.env.SCHEMA}`, {
        logging: console.log
    })
    .then(_data => process.exit(0))
    .catch(error => console.error(error.message));