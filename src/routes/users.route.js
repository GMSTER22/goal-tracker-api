const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.get('/email', userController.getOneUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
