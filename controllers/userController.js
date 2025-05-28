const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create user
exports.createUser = async (req, res) => {
  const { firstName, lastName, address, contact, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      address,
      contact,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user count
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search by email
exports.searchUser = async (req, res) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required.' });
    }

    const users = await User.find({ email: { $regex: email, $options: 'i' } })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments({
      email: { $regex: email, $options: 'i' },
    });

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user count grouped by role
exports.getUserCountByRole = async (req, res) => {
  try {
    const counts = await User.aggregate([
      {
        $group: {
          _id: "$role", // Group by the 'role' field
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          role: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ counts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In your userController.js
exports.getUsersByRole = async (req, res) => {
  const role = req.query.role;
  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
