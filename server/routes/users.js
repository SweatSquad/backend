const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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

// @desc Add a user during for the registration process
// @route POST /api/users/registerUser
// @access Private

router.post('/registerUser', async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body

  // Confirm Data
  if (!username || !email || !password){
    return res.status(400).json({ message: "Not all required fields are entered" }) 
  }

  // Duplicate Check
  const duplicateName = await User.findOne({ where: { username: username } })

  if (duplicateName){
    return res.status(409).json({ message: "Duplicate username" }) 
  }

  const duplicateEmail = await User.findOne({ where: { email: email } })

  if (duplicateEmail){
    return res.status(409).json({ message: "Duplicate email address"}) 
  }

  //Create User Object
  const userObject = { username, firstName, lastName, email, password }

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: "Invalid user data recieved" })
  }

})

// @desc Check to see if user account exists with login credentials
// @route Get /api/users/loginUser
// @access Private

router.get('/loginUser', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password ) {
    return res.status(400).json({ message: "Not all required fields are entered" }) 
  }

  const foundUser = await User.findOne({ where: { username: username } })

  if (!foundUser || !(bcrypt.compareSync(password, foundUser.password))) {
    return res.status(400).json({ message: "Invalid username/password" }) 
  }

  return res.status(201).json({ message: `Logging in user: ${username} `})

})

module.exports = router;
