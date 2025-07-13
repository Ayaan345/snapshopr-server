const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");

// Import only the functions you exported
const {
  createConversation,
  getOrCreateConversation,
  getUserConversations
} = require("../controllers/chatCtrl");

// POST - create or fetch conversation
router.post("/conversation", createConversation);

// GET - fetch all conversations for a user
router.get("/conversations/:userId", getUserConversations);

// GET /api/chat/conversation/:conversationId
router.post("/conversation", getOrCreateConversation);

// NEW: GET /api/chat/conversation/:conversationId
router.get(
  "/conversation/:conversationId",
  async (req, res, next) => {
    try {
      const convo = await Conversation.findById(req.params.conversationId);
      if (!convo) return res.status(404).json({ error: "Not found" });
      // return the participants array
      return res.json({ participants: convo.participants });
    } catch (err) {
      return next(err);
    }
  }
);



module.exports = router;
