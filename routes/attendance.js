const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const attendanceController = require('../controllers/attendanceController');

router.post('/mark', auth, lectureOnly, attendanceController.markAttendance);

module.exports = router;
