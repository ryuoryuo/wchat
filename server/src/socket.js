import socketio from "socket.io";


const setupSocket = server => {
  const io = socketio(server);

  const users = [];
  const messages = [];
  const typingUsers = {};

  io.on("connection", socket => {
    let username = "Anonymous";

    socket.on("msg", msg => {
      const fullMessage = { username, message: msg, socketId: socket.id };

      io.emit("chat message", fullMessage);

      messages.push(fullMessage);

      if (messages.length > 10) {
        messages.splice(0, 1);
      }
    });

    socket.on("typing", isTyping => {
      if (isTyping && !(socket.id in typingUsers)) {
        typingUsers[socket.id] = username;
      }

      if (!isTyping && socket.id in typingUsers) {
        delete typingUsers[socket.id];
      }

      socket.broadcast.emit("set typing", typingUsers);
    });

    socket.on("add user", nickname => {
      username = nickname || "Anonymous";

      users.push(username);

      io.emit("set users", users);
    });

    socket.on("disconnect", () => {
      io.emit("chat message", `${username} disconnected`);

      // deleting user from typingusers array
      if (socket.id in typingUsers) {
        delete typingUsers[socket.id];
        socket.broadcast.emit("set typing", typingUsers);
      }

      if (users.indexOf(username) !== -1) {
        const userIndex = users.indexOf(username);

        users.splice(userIndex, 1);

        socket.broadcast.emit("set users", users);
      }
    });
  });
};

export default setupSocket;
