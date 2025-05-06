const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const announcementController = require('../controllers/announcementController');

router.post('/create', auth, lectureOnly, announcementController.createAnnouncement);

module.exports = router;
