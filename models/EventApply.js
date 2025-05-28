const mongoose = require('mongoose');

const eventApplySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: true,
    validate: {
      validator: async function(value) {
        const Announcement = mongoose.model('Announcement');
        const announcement = await Announcement.findById(value);
        return announcement && announcement.type === 'event';
      },
      message: 'Referenced announcement must be of type "event".'
    }
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const EventApply = mongoose.model('EventApply', eventApplySchema);

module.exports = EventApply;
