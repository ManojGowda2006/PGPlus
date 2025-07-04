const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const complaint = await Complaint.create({
      title,
      description,
      raisedBy: req.userId,
    });
    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint',err:error.message });
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
    const complaints = await Complaint.find().populate({
      path : 'raisedBy',
      select : 'fullName'
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints' });
  }
};

const updateComplaint = async (req, res) => {
  try{
    const {id} = req.params
    const {status} = req.body;
    const complaint = await Complaint.findById(id)
    if(!complaint){
      return res.status(404).json({message : "No complaint found"})
    }
    if(status){
      complaint.status = status
    }
    await complaint.save()

    res.status(200).json({message : "Status updated"})

  }catch(err){
    res.status(500).json({message : "Internal server error"})
  }
}

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaint
};
