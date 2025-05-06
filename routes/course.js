// routes/course.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Assuming you have an auth middleware to verify token
const courseController = require('../controllers/courseController');
const adminOnly = require('../middleware/adminOnly');

router.post('/add', auth, adminOnly, courseController.createCourse);
// routes/course.js
router.get('/all', auth, courseController.getCourses);


module.exports = router;
