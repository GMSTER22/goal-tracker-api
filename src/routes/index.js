const router = require('express').Router();
const swaggerDocRouter = require('./swagger.route');

router.use('/users', require('./users.route'));
router.use('/goals', require('./goals.route'));
router.use('/comments', require('./comments.route'));
router.use('/categories', require('./categories.route'));

router.use('/', swaggerDocRouter);

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Goal Tracker API</h1>');
});

module.exports = router;
