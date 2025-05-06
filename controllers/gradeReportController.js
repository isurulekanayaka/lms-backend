const GradeReport = require('../models/GradeReport');
const Student = require('../models/Student');
const Module = require('../models/Module');

exports.publishGradeReport = async (req, res) => {
  const { studentId, moduleId, date, grade, reportUrl, feedback } = req.body;

  try {
    // Optional: Validate student and module exist
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ msg: 'Module not found' });

    const newGradeReport = new GradeReport({
      studentId,
      moduleId,
      date,
      grade,
      reportUrl,
      feedback
    });

    const savedReport = await newGradeReport.save();

    res.status(201).json({
      msg: 'Grade and report published successfully',
      report: savedReport
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
