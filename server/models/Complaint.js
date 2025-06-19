const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
