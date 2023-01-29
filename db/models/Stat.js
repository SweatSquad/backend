const Sequelize = require('sequelize');
const db = require('../db');

const Stat = db.define('stat', {
  height: {
    type: Sequelize.INTEGER,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Stat;
