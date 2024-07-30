import { Server } from "socket.io";
import { saveMessage } from "../Controller/MessageController.js";

const onlineUsers = [];
const addUser = (user, socketId) => {
  const isExist = onlineUsers.find((item) => item.id === user.id);
  if (!isExist) {
    user.socketId = socketId;
    onlineUsers.push(user);
  }
  return null;
};

const removeUser = (socketId) => {
  const isExist = onlineUsers.find((item) => item.socketId === socketId);
  if (isExist) {
    onlineUsers.splice(isExist, 1);
  }
  return null;
};

const socketInit = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("ADD_USER", (user) => {
      addUser(user, socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });

    socket.on("SEND_MESSAGE", async (msg) => {
      const savedMsg = await saveMessage(msg);

      io.to(msg.receiver.socketId)
        .to(msg.sender.socketId)
        .emit("RECEIVED_MSG", savedMsg);
    });

    socket.on("DELETE_MESSAGE", (msg) => {
      socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });
  });
};

export default socketInit;
