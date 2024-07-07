import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
    console.log(`User added: ${userId}, socket: ${socketId}`);
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log(`User removed: socket ${socketId}`);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`New user connected: ${userId}`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent to ${receiverId}`);
    } else {
      console.log(`Receiver not found: ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.listen("4000");
console.log("Socket server listening on port 4000");
