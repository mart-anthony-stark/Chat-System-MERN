const app = require("./app");
const mongoose = require("mongoose");
const Message = require("./models/Message");
const User = require("./models/User");

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log(`Database connected`);
  } catch (error) {
    console.log(error);
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const jwt = require("jwt-then");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    next();
  } catch (error) {}
});

io.on("connection", (socket) => {
  console.log("Connected to socket: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("Joined: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("Left: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        user: socket.userId,
      });
    }
  });
});
