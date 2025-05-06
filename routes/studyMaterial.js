const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Token verification
const lectureOnly = require('../middleware/lectureOnly'); // Only admins can add materials
const studyMaterialController = require('../controllers/studyMaterialController');

// Create study material for a module
router.post('/add', auth, lectureOnly, studyMaterialController.createStudyMaterial);

module.exports = router;