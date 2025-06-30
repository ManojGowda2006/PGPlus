const Announcement = require('../models/Announcement');

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const announcement = await Announcement.create({ title, content, type });
    res.status(201).json({ message: 'Announcement created', announcement });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating announcement' , err : error.message});
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;

    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, content, type },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json({ message: 'Announcement updated', announcement: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating announcement', err: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement', err: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
