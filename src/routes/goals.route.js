const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goals.controller');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, goalController.getAllGoals);
router.get('/:id', ensureAuth, goalController.getOneGoal);
router.post('/', ensureAuth, goalController.createGoal);
router.put('/:id', ensureAuth, goalController.updateGoal);
router.delete('/:id', ensureAuth, goalController.deleteGoal);

module.exports = router;
