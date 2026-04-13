const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      conversationId: req.body.conversationId,
      sender: req.user._id, // 🔥 from token
      text: req.body.text,
    });

    const message = await newMessage.populate("sender", "name");

    res.status(200).json({
      _id: message._id,
      senderId: message.sender._id,
      sender: message.sender,
      text: message.text,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).populate("sender", "name");

    const formatted = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.sender._id,
      sender: msg.sender,
      text: msg.text,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json(err);
  }
};