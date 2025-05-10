const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// CRUD routes
router.post('/create', auth, adminOnly, userController.createUser);
router.get('/', auth, adminOnly, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, adminOnly, userController.updateUser);
router.delete('/:id', auth, adminOnly, userController.deleteUser);

// Search users
router.get('/search/query', auth, adminOnly, userController.searchUser);

module.exports = router;
