const express = require('express');
const router = express.Router();
const eventApplyController = require('../controllers/eventApplyController'); // adjust path if needed

// Create new EventApply
router.post('/', eventApplyController.createEventApply);

// Get all EventApplies
router.get('/', eventApplyController.getAllEventApplies);

// Get one EventApply by ID
router.get('/id/:id', eventApplyController.getEventApplyById);

// Update EventApply by ID
router.put('/id/:id', eventApplyController.updateEventApply);

// Delete EventApply by ID
router.delete('/id/:id', eventApplyController.deleteEventApply);

// Search EventApplies by query params studentId and/or eventId
router.get('/search', eventApplyController.searchEventApplies);

module.exports = router;
