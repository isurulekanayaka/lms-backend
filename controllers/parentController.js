const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Course = require('../models/Course');
const FacilityFee = require('../models/FacilityFee');
const Module = require('../models/Module');
const GradeReport = require('../models/GradeReport');

// CREATE - Add a new parent
exports.createParent = async (req, res) => {
  const { user, student } = req.body;

  try {
    const newParent = new Parent({
      user,
      student
    });

    await newParent.save();
    res.status(201).json({ msg: 'Parent added successfully', parent: newParent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get all parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate('user student');
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get a parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('user student');
    if (!parent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - Update a parent by ID
exports.updateParent = async (req, res) => {
  try {
    const updatedParent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json({ msg: 'Parent updated successfully', parent: updatedParent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Delete a parent by ID
exports.deleteParent = async (req, res) => {
  try {
    const deletedParent = await Parent.findByIdAndDelete(req.params.id);
    if (!deletedParent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json({ msg: 'Parent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getStudentCourseFees = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // Provided by auth middleware

    const parent = await Parent.findOne({ user: loggedInUserId }).populate('student');

    if (!parent) {
      return res.status(404).json({ msg: 'Parent not found' });
    }

    const student = await Student.findById(parent.student._id).populate('courses');

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Get facility fees for each course
    const coursesWithFees = await Promise.all(
      student.courses.map(async (course) => {
        const fees = await FacilityFee.find({ courseId: course._id }).populate('courseId');

        return {
          _id: course._id,
          courseName: course.courseName,
          facilityFees: fees.map((fee) => ({
            _id: fee._id,                  // facilityFeeId
            courseId: fee.courseId?._id,   // courseId
            courseName: fee.courseId?.courseName, // optional, for clarity
            feeAmount: fee.feeAmount,
            description: fee.description,
          })),
        };
      })
    );

    res.status(200).json({
      student: {
        _id: student._id,
        user: student.user,
        courses: coursesWithFees,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentModulesWithGrades = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware (User ID)
    console.log('User ID from token:', userId);

    // Find the Parent by matching the 'user' field to the logged-in user's id
    const parent = await Parent.findOne({ user: userId });
    console.log('Parent found:', parent);

    if (!parent) return res.status(404).json({ msg: 'Parent not found' });

    const studentId = parent.student;
    if (!studentId) return res.status(400).json({ msg: 'This parent has no linked student' });

    // Find grade reports for the student and populate module info
    const gradeReports = await GradeReport.find({ studentId }).populate('moduleId');

    const result = gradeReports.map(report => ({
      moduleName: report.moduleId?.moduleName,
      grade: report.grade,
      feedback: report.feedback,
      date: report.date,
      reportUrl: report.reportUrl
    }));

    res.status(200).json({
      msg: 'Student modules and grades fetched successfully',
      studentId,
      grades: result
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};


