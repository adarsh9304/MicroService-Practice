const express = require('express');
const logger = require('./logger');
const { listenForOrders } = require('./listen_for_order');
const { orderSocket } = require('./customer_socket');
const { listenOrderCB } = require('./circuit_breaker');

const app = express();
app.use(express.json());

// listenForOrders();
listenOrderCB()
// orderSocket();


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
