// controllers/moduleController.js
const Module = require('../models/Module');

exports.createModule = async (req, res) => {
  const { courseId, moduleName } = req.body;

  try {
    const newModule = new Module({ courseId, moduleName });
    await newModule.save();

    res.status(201).json({ msg: 'Module created successfully', module: newModule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
