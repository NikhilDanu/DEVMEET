const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  maxSize: { 
    type: Number, 
    default: 4 
  },
  description: { 
    type: String 
  },
  skills: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);