const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Types.ObjectId,
    ref: "Chatroom",
    required: "Chatroom is required!",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: "User is required!",
  },
  message: {
    type: String,
    required: "Message is required!",
  },
});

module.exports = mongoose.model("Message", MessageSchema);
