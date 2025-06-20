const Announcement = require('../models/Announcement');

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const announcement = await Announcement.create({ title, content, type });
    res.status(201).json({ message: 'Announcement created', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement' });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
};
