import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: process.env.PORT || 8080 });

function handleConnection(socket) {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    // send to all clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
}

server.on("connection", handleConnection);

server.on("listening", () => {
  console.log(`Server started on port ${server.address().port}`);
});
