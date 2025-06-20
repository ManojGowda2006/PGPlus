const Facility = require('../models/Facility');

const createFacility = async (req, res) => {
  try {
    const { name, type } = req.body;
    const facility = await Facility.create({ name, type });
    res.status(201).json({ message: 'Facility added', facility });
  } catch (error) {
    res.status(500).json({ message: 'Error adding facility' });
  }
};

const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await Facility.findByIdAndUpdate(
      id,
      { status: req.body.status, updatedBy: req.userId },
      { new: true }
    );
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json({ message: 'Facility updated', facility });
  } catch (error) {
    res.status(500).json({ message: 'Error updating facility' });
  }
};

const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facilities' });
  }
};

module.exports = {
  createFacility,
  updateFacility,
  getFacilities,
};
