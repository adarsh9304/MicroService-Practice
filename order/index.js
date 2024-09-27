const express = require('express');
const logger = require('./logger');
const http=require('http');
const {Server}=require('socket.io')
const {io:Client}=require('socket.io-client')
const { listenForOrders } = require('./listen_for_order');

const app = express();
app.use(express.json());

const customerSocket=Client('ws://localhost:3005');

customerSocket.on('connect', () => {
  console.log('Order service connected to customer service socket');
});

customerSocket.on('status-update',(data)=>{
  console.log('Received status update from customer service:',data)
  customerSocket.emit('status-update-response',{received:true})
})

listenForOrders();

app.get('/order-temp', (req, res) => {
  logger.info({
    message: 'Temporary order endpoint hit',
    service: 'order-service',
    timestamp: new Date().toISOString()
  });

  res.send('Response come from Order and req from customer');
});

app.get('/webhook-event-receive',(req,res)=>{
  console.log('successfully received from the order ms')
})

app.get('/', (req, res) => {
  res.send('Response come from Order');
});

app.listen(3002, () => {
  logger.info({
    message: 'Order Service started on port 3002',
    service: 'order-service',
    timestamp: new Date().toISOString()
  });
});
