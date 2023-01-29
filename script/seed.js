const {
  db,
  models: { User, Stat, Exercise, Workout },
} = require('../db');

async function seed() {
  await db.sync({ force: true });
  console.log('db syncing.......');

  try {
    // create mock users
    const ty = await User.create({
      username: 'tylen',
      firstName: 'tylen',
      lastName: 'carroll',
      email: 'mail@gmail.com',
      password: '123',
    });
    const kt = await User.create({
      username: 'katie',
      firstName: 'katie',
      lastName: 'b',
      email: 'maill@gmail.com',
      password: '123',
    });
    // create mock stats
    const tyStat = await Stat.create({
      height: 190,
      weight: 220,
    });

    // create mock workouts

    const armWorkout = await Workout.create({
      name: 'Bicep Blaster',
      muscleGroup: 'arms',
    });
    const legWorkout = await Workout.create({
      name: '4 Larger Legs',
      muscleGroup: 'Legs',
    });
    const backWorkout = await Workout.create({
      name: 'Lower Back Blowout',
      muscleGroup: 'Back/Legs',
    });

    // create mock exercises
    const curl = await Exercise.create({
      name: 'Bicep Curl',
      muscleGroup: 'Arms',
      description: 'Pump the iron aagghhhhh',
    });
    const cableCurl = await Exercise.create({
      name: 'Cable Curl',
      description: 'shock the muscle',
      muscleGroup: 'Arms',
    });
    const legCurl = await Exercise.create({
      name: 'Leg Curl',
      description: 'Get a pump',
      muscleGroup: 'Legs/Hamstrings',
    });
    const squat = await Exercise.create({
      name: 'Barbell Squat',
      description: 'Push it',
      muscleGroup: 'Legs',
    });
    const deadlift = await Exercise.create({
      name: 'Deadlift',
      description: 'Watch your form',
      muscleGroup: 'Back/Legs',
    });
    const bentOverRow = await Exercise.create({
      name: 'Barbell Bent Over Row',
      description: 'Go HEAVY',
      muscleGroup: 'Back',
    });

    // create the associations

    // users stats and exercises
    await ty.setStat(tyStat);
    await kt.addExercise(curl);
    await ty.addExercise(curl);

    // workouts and exercises
    await armWorkout.addExercises([curl, cableCurl]);
    await legWorkout.addExercises([squat, deadlift, legCurl]);
    await backWorkout.addExercises([deadlift, bentOverRow]);

    // users and workouts
    await ty.addWorkouts(armWorkout, backWorkout);
    await kt.addWorkout(legWorkout);


    console.log(`seeded successfully`);
  } catch (err) {
    console.error(err);
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
