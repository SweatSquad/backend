const Sequelize = require('sequelize');
const db = require('../db');

const Exercise = db.define('exercise', {
  name: {
    type: Sequelize.STRING,
  },
  muscleGroup: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Exercise;
