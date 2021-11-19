module.exports = io => {
  console.log("chatController called");
  io.on("connection", client => {
    console.log("new connection");

    client.on("disconnect", () => {
      console.log("user disconnected");
    });

    client.on("message", () => {
      io.emit("message", {
        content: "Hello"
      });
    });
  });
};
