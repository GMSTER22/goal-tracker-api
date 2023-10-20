const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { ensureAuth } = require('../middleware/auth');
const { userValidation, validate } = require('../../validation.js');

router.get('/', ensureAuth, userController.getAllUsers);
router.get('/:id', ensureAuth, userController.getOneUser);
// router.get('/:email', userController.getUserByEmail);
router.post('/', ensureAuth, userValidation, validate, userController.createUser);
router.put('/:id', ensureAuth, userValidation, validate, userController.updateUser);
router.delete('/:id', ensureAuth, userController.deleteUser);

module.exports = router;
