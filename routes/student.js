// routes/student.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');           // ✅ Auth middleware
const adminOnly = require('../middleware/adminOnly'); // ✅ Admin-only check
const studentController = require('../controllers/studentController');

router.post('/add', auth, adminOnly, studentController.createStudent);

module.exports = router;
