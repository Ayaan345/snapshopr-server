const Conversation = require('../models/conversation');

exports.createConversation = async (req, res, next) => {
  try {
    const { participants } = req.body;
    let convo = await Conversation.findOne({ participants: { $all: participants } });
    if (!convo) {
      convo = await Conversation.create({ participants });
    }
    return res.json({ conversationId: convo._id });
  } catch (err) {
    next(err);
  }
};
exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversationId }).sort("timestamp");
  res.json({ messages });
};
exports.getOrCreateConversation = async (req, res, next) => {
  // …
};

// controllers/chatCtrl.js
exports.getUserConversations = async (req, res, next) => {
  try {
    const convos = await Conversation.find({
      participants: req.params.userId
    });
    res.json(convos);
  } catch (err) {
    next(err);
  }
};

