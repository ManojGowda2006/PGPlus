const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
  try {
    const { title, description, roomNumber } = req.body;
    const complaint = await Complaint.create({
      title,
      description,
      roomNumber,
      raisedBy: req.userId,
    });
    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint' });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ raisedBy: req.userId });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('raisedBy roomNumber');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
};
