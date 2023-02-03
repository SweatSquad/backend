const router = require('express').Router();
const {
  models: { User, Workout },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate({
        username: req.body.username,
        password: req.body.password,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.registerUser({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    user = await User.findByPk(user.id, {
      attributes: ['username', 'isAdmin', 'firstName'],
      include: Workout,
    });
    res.send(user.dataValues);
  } catch (ex) {
    next(ex);
  }
});
