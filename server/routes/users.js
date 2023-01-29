const express = require('express');
const router = express.Router();

const {
  models: { User },
} = require('../../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

/* GET users listing. */

// res.send(status, body) is deprecated: Use res.status(status).send(body) instead
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

// get own user from token
router.get('/my-profile', requireToken, async (req, res, next) => {
  try {
    const user = req.user.dataValues;
    res.json({ username: user.username, firstName: user.firstName });
    // console.log(req.user.dataValues.username);
  } catch (error) {
    next(error);
  }
});

// router.get('/my-profile', requireToken, async (req, res, next) => {
//   try {
//     // const users = await User.findAll();
//     // res.send(users);
//     res.status(200).json(req.user);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
