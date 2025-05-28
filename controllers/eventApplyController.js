const EventApply = require('../models/EventApply'); // adjust path as needed

// Create a new EventApply
exports.createEventApply = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const newApplication = new EventApply({ studentId, eventId });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all EventApply records
exports.getAllEventApplies = async (req, res) => {
  try {
    const applications = await EventApply.find()
      .populate({
        path: 'studentId',
        populate: { path: 'user', select: 'firstName email' }
      })
      .populate('eventId', 'title message date');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one EventApply by ID
exports.getEventApplyById = async (req, res) => {
  try {
    const application = await EventApply.findById(req.params.id)
      .populate('studentId', 'firstName email')
      .populate('eventId', 'title message');
    if (!application) {
      return res.status(404).json({ error: 'EventApply not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update EventApply by ID
exports.updateEventApply = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const updated = await EventApply.findByIdAndUpdate(
      req.params.id,
      { studentId, eventId },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'EventApply not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete EventApply by ID
exports.deleteEventApply = async (req, res) => {
  try {
    const deleted = await EventApply.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'EventApply not found' });
    }
    res.status(200).json({ message: 'EventApply deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search EventApply by studentId or eventId (query params)
exports.searchEventApplies = async (req, res) => {
  try {
    const { studentId, eventId } = req.query;

    const query = {};
    if (studentId) query.studentId = studentId;
    if (eventId) query.eventId = eventId;

    const results = await EventApply.find(query)
      .populate('studentId', 'firstName email')
      .populate('eventId', 'title message');

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
