const knex = require("knex");

const database = knex({
  client: "pg", // pg is the database library for postgreSQL on knexjs
  connection: {
    host: "127.0.0.1", // Your local host IP
    user: "postgres", // Your postgres user name
    password: "cotix1", // Your postgres user password
    database: "cloud-p0" // Your database name
  }
});

module.exports = database;