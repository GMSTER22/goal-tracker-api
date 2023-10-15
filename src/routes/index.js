const router = require('express').Router();
const swaggerDocRouter = require('./swagger.route');
const mongodb = require('../database/database');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.use('/users', require('./users.route'));
router.use('/goals', require('./goals.route'));
router.use('/comments', require('./comments.route'));
router.use('/categories', require('./categories.route'));

router.use('/', swaggerDocRouter);

router.get('/', ensureGuest, (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});
router.get('/login', ensureAuth, async (req, res) => {
  try {
    res.send(`<h1>${req.user.firstName}, Welcome to the Goal Tracker API</h1>`);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
