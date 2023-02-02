const Sequelize = require('sequelize');
const pkg = require('../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//we can add the .env to the gitignore and store the database password below (cna be different for each use
// but we will probably have to reconfigure this when we figure out deplotment)
const db = new Sequelize(databaseName, 'postgres', '7aa7aa7a8a', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: 5432,
});
// above is the code for connection to the database on Windows

// below is the code for connecting to the database on Mac
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   config
// );

module.exports = db;
