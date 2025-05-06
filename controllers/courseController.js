// controllers/courseController.js

const Course = require('../models/Course');
const User = require('../models/User');

// Create course (admin only)
exports.createCourse = async (req, res) => {
    const { courseName, courseDirector } = req.body;

    try {
        // Make sure the logged-in user is an admin
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'You do not have permission to add courses' });
        }

        const newCourse = new Course({
            courseName,
            courseDirector,
        });

        await newCourse.save();
        res.status(201).json({ msg: 'Course added successfully', course: newCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all courses with courseDirector details
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('courseDirector', 'firstName email role'); // Populate with selected fields
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};