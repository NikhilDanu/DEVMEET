const mongoose = require("mongoose");

const joinTeamSchema = new mongoose.Schema({
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  team:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  status:{
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
},
{timestamps: true},
);

module.exports = mongoose.model("JoinRequest" , joinTeamSchema)