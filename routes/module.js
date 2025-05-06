// routes/module.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');           // ✅ Auth middleware
const adminOnly = require('../middleware/adminOnly'); // ✅ Admin-only check
const moduleController = require('../controllers/moduleController');

router.post('/add', auth, adminOnly, moduleController.createModule);

module.exports = router;
