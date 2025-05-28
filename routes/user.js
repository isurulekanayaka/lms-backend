const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Search users
router.get('/search/query', auth, adminOnly, userController.searchUser);

// get user count
router.get('/count', auth, adminOnly, userController.getUserCount);

// CRUD routes
router.post('/create', auth, adminOnly, userController.createUser);
router.get('/all', auth, adminOnly, userController.getAllUsers);
router.get('/id/:id', auth, userController.getUserById);
router.put('/id/:id', auth, adminOnly, userController.updateUser);
router.delete('/id/:id', auth, adminOnly, userController.deleteUser);

module.exports = router;
