const Timetable = require('../models/Timetable');

exports.publishTimetable = async (req, res) => {
  const { moduleId, date, startTime, endTime, note } = req.body;

  try {
    const newTimetable = new Timetable({
      moduleId,
      date,
      startTime,
      endTime,
      note
    });

    const savedTimetable = await newTimetable.save();
    res.status(201).json({ msg: 'Timetable published successfully', timetable: savedTimetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
