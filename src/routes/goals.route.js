const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goals.controller');

router.get('/', goalController.getAllGoals);
router.get('/:id', goalController.getOneGoal);
router.post('/', goalController.createGoal);

module.exports = router;