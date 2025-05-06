const FacilityFee = require('../models/FacilityFee');

exports.addFacilityFee = async (req, res) => {
  const { courseId, feeAmount, description } = req.body;

  try {
    const fee = new FacilityFee({
      courseId,
      feeAmount,
      description
    });

    const savedFee = await fee.save();
    res.status(201).json({ msg: 'Facility fee added', fee: savedFee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
