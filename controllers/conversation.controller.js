const Conversation = require("../models/conversation.model");

exports.createConversation = async (req, res) => {
  try {
    const { teamId, members } = req.body;

    if (!teamId) {
      return res.status(400).json({ message: "teamId required" });
    }

    // 🔥 existing conversation
    let convo = await Conversation.findOne({ teamId });

    // 🔥 create if not exists
    if (!convo) {
      convo = await Conversation.create({
        teamId,
        members: members || [], // 🔥 SAFE FIX
      });
    }

    console.log("CONVO CREATED/FETCHED:", convo);

    return res.status(200).json(convo);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};