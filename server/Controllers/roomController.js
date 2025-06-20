const Room = require('../models/Room');
const User = require('../models/User');

// Owner: Create new room
const createRoom = async (req, res) => {
  try {
    const { doorNumber, occupants } = req.body;

    const room = await Room.create({ doorNumber, occupants: occupants || [] });
    res.status(201).json({ message: 'Room created', room });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
};

// Owner: Add or remove tenants from a room
const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { occupants } = req.body;

    const room = await Room.findByIdAndUpdate(roomId, { occupants }, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room updated', room });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room' });
  }
};

// Owner: Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('occupants', 'fullName email phone');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rooms' });
  }
};

// Tenant: Get room & occupants
const getMyRoom = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.roomNumber) {
      return res.status(404).json({ message: 'You are not assigned to any room.' });
    }

    const room = await Room.findById(user.roomNumber).populate('occupants', 'fullName email phone');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving room' });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  getAllRooms,
  getMyRoom,
};
