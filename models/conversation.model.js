const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
  {
    teamId: String,
    members: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);