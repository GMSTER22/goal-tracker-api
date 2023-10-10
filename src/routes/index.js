const router = require('express').Router();
const swaggerDocRouter = require('./swagger.route');
// const mongodb = require('../database/database');

// router.get('/books', async (req, res) => {
//   const books = await mongodb.getDb().collection('books').find({}).toArray();

//   res.status(200).json(books);
// });

router.use('/users', require('./users'));
router.use('/goals', require('./goals'));
router.use('/comments', require('./comments'));
router.use('/categories', require('./categories'));

router.use('/', swaggerDocRouter);

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Goal Tracker API</h1>');
});

module.exports = router;
