const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

const {
  models: { Workout, Exercise, User },
} = require('../../db');

/* GET workout listing. */
router.get('/', async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({ include: Exercise });
    res.status(200).send(workouts);
  } catch (error) {
    next(error);
  }
});

// GET specific workout by name with attached exercises
router.get('/:workoutName', async (req, res, next) => {
  const workoutName = req.params.workoutName;
  try {
    const workout = await Workout.findOne({
      where: { name: workoutName },
      include: Exercise,
    });
    res.status(200).send(workout);
  } catch (error) {
    next(error);
  }
});

// GET specific workouts by muscle group with attached exercises
router.get('/type/:muscleGroup', async (req, res, next) => {
  const muscleGroup = req.params.muscleGroup;
  try {
    const workouts = await Workout.findAll({
      where: { muscleGroup },
      include: Exercise,
    });
    res.status(200).send(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/new-workout', requireToken, async (req, res, next) => {
  try {
    const { id } = jwt.verify(token, 'process.env.JWT');
    const user = await User.findByPk(id);

    const workout = await Workout.create({
      name: req.params.name,
      muscleGroup: req.params.muscleGroup,
    });
    user.addWorkout;
    console.log(artist);
    await artist[0].addAlbum(album);
    res.sendStatus(201);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Workout already exists');
    } else {
      next(err);
    }
  }
});

module.exports = router;
