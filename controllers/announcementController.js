const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  const { title, message, type, audience } = req.body;

  try {
    const announcement = new Announcement({
      title,
      message,
      type,
      audience,
      createdBy: req.user.id
    });

    const saved = await announcement.save();
    res.status(201).json({ msg: 'Announcement published', announcement: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
