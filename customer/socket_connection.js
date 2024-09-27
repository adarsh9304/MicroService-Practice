const { Server } = require("socket.io");
const http = require("http");

const getSocketIO = (app) => {
  // binding express app instance as http server to socket server
  const server = http.createServer(app);

  server.listen(3005); // socket server listen  ws://localhost:3005
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  return io;
};

const initiateSocketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("Customer service connected to socket");
    listenSocketEvents({
      socket,
      eventName: "status-update-response"
    });
  });

  return io;
};

const listenSocketEvents = (socketListenData) => {
  const { socket, eventName } = socketListenData;
  socket.on(eventName, (data) => {
    console.log("Data from service B", data);
  });
};

module.exports = {
  getSocketIO,
  initiateSocketServer
};
