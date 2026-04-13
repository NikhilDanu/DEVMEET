const router = require("express").Router();
const auth = require("../middleware/jwt");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");

router.post("/", auth, sendMessage); // 🔥 auth added
router.get("/:id", auth, getMessages);

module.exports = router;