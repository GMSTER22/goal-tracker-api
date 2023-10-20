const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goals.controller');
const { ensureAuth } = require('../middleware/auth');
const { goalValidation, validate } = require('../../validation.js');

router.get('/', ensureAuth, goalController.getAllGoals);
router.get('/:id', ensureAuth, goalController.getOneGoal);
router.post('/', ensureAuth, goalValidation, validate, goalController.createGoal);
router.put('/:id', ensureAuth, goalValidation, validate, goalController.updateGoal);
router.delete('/:id', ensureAuth, goalController.deleteGoal);

module.exports = router;
