const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, userController.getAllUsers);
router.get('/:id', ensureAuth, userController.getOneUser);
// router.get('/:email', userController.getUserByEmail);
router.post('/', ensureAuth, userController.createUser);
router.put('/:id', ensureAuth, userController.updateUser);
router.delete('/:id', ensureAuth, userController.deleteUser);

module.exports = router;
