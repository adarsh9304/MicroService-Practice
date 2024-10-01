const express = require("express");
const logger = require("./logger");
const axios = require("axios");
const { sendMessageToOrder, sendOrderToQueue } = require("./sendOrder");
const { listenOrderResponse } = require("./listen_order_res");
const { getSocketIO, initiateSocketServer } = require("./socket_connection");

const app = express();
app.use(express.json());

// const io = getSocketIO(app);
// initiateSocketServer(io);

app.get("/call-order", async (req, res) => {
  logger.info({
    message: "Inside call order",
    service: "customer-service",
    timestamp: new Date().toISOString()
  });

  await sendMessageToOrder("Customer clicked on order");
  res.send("Response come from call order");
});

app.get("/update-status-to-complete-socket", async (req, res) => {
  console.log("inside status to complete socket");

  io.emit("status-update", { status: "complete" });

  res
    .status(200)
    .json({ message: "Status updated to complete and sent via socket" });
});

app.get("/", async (req, res) => {
  console.log("inside controller of webhook");

  // for loop for subscrupdate-status-to-complete-webhookibed clients and will send event to all
  // brainstroming on usecases
  // actions which client wants , give listing to them
  // webhoock table
  // webhook logs table -> webhook id , status , error message , req.header , res.header,data
  // inside for loop try catch and store in both

  const resHook = await axios.get(
    "http://localhost:3002/webhook-event-receive"
  );
  res.send(resHook);
});

listenOrderResponse();

app.post("/create-order", async (req, res) => {
  const { customerId, orderId } = req.body;
  logger.info({
    message: "Creating order",
    customerId,
    orderId,
    status: "OrderCreated",
    service: "customer-service",
    timestamp: new Date().toISOString()
  });

  await sendOrderToQueue({ customerId, orderId, status: "OrderCreated" });
  res.send("Order placed");
});

app.get("/", (req, res) => {
  res.send("Response come from customer");
});

app.listen(3001, () => {
  logger.info({
    message: "Customer Service started on port 3001",
    service: "customer-service",
    timestamp: new Date().toISOString()
  });
});
