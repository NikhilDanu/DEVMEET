const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: true,
    minlength: 30,
  },

  skills: {
    type: [String],
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);