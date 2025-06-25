const Room = require('../models/Room');
const User = require('../models/User');

// Owner: Create new room
const createRoom = async (req, res) => {
  try {
    console.log("Room create body:", req.body);
    const { doorNumber, tenants, status, type } = req.body;

    const room = await Room.create({ doorNumber, tenants: tenants || [] , status, type});
    res.status(201).json({ message: 'Room created', room });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error creating room' });
  }
};

// Owner: Add or remove tenants from a room
const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { tenants } = req.body;

    const room = await Room.findByIdAndUpdate(roomId, { tenants }, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room updated', room });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room' });
  }
};

// Owner: Get all rooms
const   getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('tenants', 'fullName email phone');
    res.status(200).json(rooms);
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

const deleteRoom = async(req, res) => {
  try{
    const id = req.params.id;
    console.log(id)
    const room = await Room.findByIdAndDelete(id)
    if(!room){
      res.status(404).json({message : "No room found"})
    }
    res.status(200).json({message:"Room deleted successfully"})
  }catch(err){
    res.status(500).json({message :"Internal service error"})
  }
}

module.exports = {
  createRoom,
  updateRoom,
  getAllRooms,
  getMyRoom,
  deleteRoom
};
