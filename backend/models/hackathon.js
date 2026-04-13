const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required : true,
  },
  location: {
  type: String,
  required: true,
},
startDate: {
  type: Date,
  required: true,
},

endDate: {
  type: Date,
  required: true,
},

  registrationDeadline: Date,

  url: String,
  image: String,

  mode: {
    type: String,
    enum: ["Online", "Offline" , "Hybrid"],
    default: "Online",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hackathon", hackathonSchema);