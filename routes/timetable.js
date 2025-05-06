const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly'); // restrict access to lectures
const timetableController = require('../controllers/timetableController');

router.post('/publish', auth, lectureOnly, timetableController.publishTimetable);

module.exports = router;
