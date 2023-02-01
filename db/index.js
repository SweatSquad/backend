//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Stat = require('./models/Stat');
const Exercise = require('./models/Exercise');
const Workout = require('./models/Workout');

//associations go here!

// stats
User.hasOne(Stat);
Stat.belongsTo(User);

// exercises
User.belongsToMany(Exercise, { through: 'userExercise' });
Exercise.belongsToMany(User, { through: 'userExercise' });

// workouts
User.belongsToMany(Workout, { through: 'userWorkouts' });
Workout.belongsToMany(User, { through: 'userWorkouts' });

Workout.belongsToMany(Exercise, { through: 'workoutExercises' });
Exercise.belongsToMany(Workout, { through: 'workoutExercises' });

module.exports = {
  db,
  models: {
    User,
    Stat,
    Exercise,
    Workout,
  },
};
