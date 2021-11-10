require('dotenv').config();

const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });
const pgerr = require('pg-error-constants');

pgp.pg.types.setTypeParser(1114, (str) => str);

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const db = pgp(config);

module.exports = { db, pgp, pgerr };
