const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  const { studentId, moduleId, date, status, note } = req.body;

  try {
    const attendance = new Attendance({
      studentId,
      moduleId,
      date,
      status,
      note
    });

    const savedAttendance = await attendance.save();
    res.status(201).json({ msg: 'Attendance recorded', attendance: savedAttendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
