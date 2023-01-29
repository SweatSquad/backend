const Sequelize = require('sequelize');
const db = require('../db');

const Workout = db.define('workout', {
  name: {
    type: Sequelize.STRING,
  },
  muscleGroup: {
    type: Sequelize.STRING,
  },
});


module.exports = Workout
