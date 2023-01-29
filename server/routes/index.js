const express = require('express');
const router = express.Router();
module.exports = router;
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/users', require('./users'));
router.use('/exercises', require('./exercises'));
router.use('/workouts', require('./workouts'));
router.use('/task', require('./task'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
