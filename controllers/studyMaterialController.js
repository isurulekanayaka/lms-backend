const StudyMaterial = require('../models/StudyMaterial');

exports.createStudyMaterial = async (req, res) => {
  const { moduleId, title, description, fileUrl } = req.body;

  try {
    const newMaterial = new StudyMaterial({
      moduleId,
      title,
      description,
      fileUrl
    });

    await newMaterial.save();
    res.status(201).json({ msg: 'Study material added successfully', material: newMaterial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

