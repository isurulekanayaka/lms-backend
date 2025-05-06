const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const feeController = require('../controllers/facilityFeeController');

router.post('/add', auth, adminOnly, feeController.addFacilityFee);

module.exports = router;
