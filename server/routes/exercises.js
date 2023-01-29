var express = require('express');
var router = express.Router();

const {
  models: { Exercise },
} = require('../../db');

/* GET exercises listing. */

router.get('/', async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).send(exercises);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
