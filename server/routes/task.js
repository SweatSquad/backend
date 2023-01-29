const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

const {
  models: { Workout, Exercise, User, Task },
} = require('../../db');

router.post('/add', requireToken, async (req, res, next) => {
  try {
    console.log(req.body);
    const task = await Task.create({ name: req.body.name });
    // const token =
    //     const { id } = jwt.verify(token, 'process.env.JWT');
    //     const user = await User.findByPk(id);
    const user = req.user;
    user.addTask(task);
    res.send(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
