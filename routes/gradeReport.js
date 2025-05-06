const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to check token
const lectureOnly = require('../middleware/lectureOnly'); // Ensure only admins can publish grades

const gradeReportController = require('../controllers/gradeReportController');

// Create grade/report (lecture only)
router.post('/publish', auth, lectureOnly, gradeReportController.publishGradeReport);


module.exports = router;
