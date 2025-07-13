module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New user:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`📥 ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", (data) => {
      // data: { roomId, senderId, text, timestamp? }
      io.to(data.roomId).emit("receiveMessage", {
        senderId: data.senderId,
        text: data.text,
        timestamp: data.timestamp || Date.now(),
      });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
