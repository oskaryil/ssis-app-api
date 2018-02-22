/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * @description
 * @file knexfile.js
 * @author: Oskar Yildiz <oskar> 2018-02-16T12:44:20+01:00
 * // -------------------------------------------------
 * Make sure this file is part of its proper namespace
 * and project before moving on.
 * // -------------------------------------------------
 * Code-tags conventionally should be used (See below) :
 * TODO - Something that someone need to do.
 * DOING - Self remind for what you are doing.
 * CONSIDER - Reminder to consider a change or addition.
 * BUG - The below section of a code cause a bug.
 * FIXME - The below section of code need to be fixed.
 * HACK - The below section of code is a workaround.
 * XXX - Any notation important enough to consider implementing.
 * CLARIFY - Very incomprehensible section of code below.
 *
 * Created by Oskar Yildiz <oskar> on 2018-02-16T12:44:20+01:00.
 * Last modified by oskar on 2018-02-16T12:48:24+01:00
 *
 */

const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URL_DEV,
    migrations: {
      directory: path.join(__dirname, '/src/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/src/db/seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.POSTGRES_URL_PROD,
    migrations: { directory: path.join(__dirname, '/src/db/migrations') },
    seeds: { directory: path.join(__dirname, '/src/db/seeds') }
  }
};
