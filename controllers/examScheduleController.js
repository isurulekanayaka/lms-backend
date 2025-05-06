const ExamSchedule = require('../models/ExamSchedule');

exports.publishExamSchedule = async (req, res) => {
  const { moduleId, date, startTime, endTime, note } = req.body;

  try {
    const schedule = new ExamSchedule({
      moduleId,
      date,
      startTime,
      endTime,
      note
    });

    const saved = await schedule.save();
    res.status(201).json({ msg: 'Exam schedule published', schedule: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
