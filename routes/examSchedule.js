const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const examScheduleController = require('../controllers/examScheduleController');

router.post('/publish', auth, lectureOnly, examScheduleController.publishExamSchedule);

module.exports = router;
