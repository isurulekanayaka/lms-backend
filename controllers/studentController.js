// controllers/studentController.js

const User = require('../models/User');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');

exports.createStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    contact,
    email,
    password,
    courseIds,
    parentFirstName,
    parentLastName,
    parentAddress,
    parentContact,
    parentEmail,
    parentPassword
  } = req.body;

  try {
    // Check if student email already exists
    const existingStudentUser = await User.findOne({ email });
    if (existingStudentUser) {
      return res.status(400).json({ msg: 'Student email already exists' });
    }

    // Check if parent email already exists
    const existingParentUser = await User.findOne({ email: parentEmail });
    if (existingParentUser) {
      return res.status(400).json({ msg: 'Parent email already exists' });
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedStudentPassword = await bcrypt.hash(password, salt);
    const hashedParentPassword = await bcrypt.hash(parentPassword, salt);

    // Create student user
    const studentUser = new User({
      firstName,
      lastName,
      address,
      contact,
      email,
      password: hashedStudentPassword,
      role: 'student'
    });
    const savedStudentUser = await studentUser.save();

    // Create student record
    const student = new Student({
      user: savedStudentUser._id,
      courses: courseIds
    });
    const savedStudent = await student.save();

    // Create parent user
    const parentUser = new User({
      firstName: parentFirstName,
      lastName: parentLastName,
      address: parentAddress,
      contact: parentContact,
      email: parentEmail,
      password: hashedParentPassword,
      role: 'parent'
    });
    const savedParentUser = await parentUser.save();

    // Create parent record
    const parent = new Parent({
      user: savedParentUser._id,
      student: savedStudent._id
    });
    const savedParent = await parent.save();

    res.status(201).json({
      msg: 'Student and parent registered successfully',
      student: savedStudent,
      parent: savedParent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
