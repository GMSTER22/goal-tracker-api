const router = require('express').Router();
const swaggerDocRouter = require('./swagger.route');

// router.get('/books', async (req, res) => {
//   const books = await mongodb.getDb().collection('books').find({}).toArray();

//   res.status(200).json(books);
// });
// router.get('/users', async (req, res) => {
//   const users = await mongodb.getDb().collection('users').find({}).toArray();
// })

router.use('/users', require('./users.route'));
router.use('/goals', require('./goals.route'));
router.use('/comments', require('./comments.route'));
router.use('/categories', require('./categories.route'));

router.use('/', swaggerDocRouter);

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Goal Tracker API</h1>');
});

module.exports = router;
