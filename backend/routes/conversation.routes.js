const express = require("express");
const router = express.Router();

const {
  createConversation,
} = require("../controllers/conversation.controller");

// ✅ CREATE OR GET CONVERSATION
router.post("/", createConversation);

module.exports = router; // 🔥 IMPORTANT (गलती यहीं होती है)