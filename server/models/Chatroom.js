const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
});

module.exports = mongoose.model("Chatroom", ChatroomSchema);
