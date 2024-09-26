const express = require('express');
const logger = require('./logger');
const { sendMessageToOrder, sendOrderToQueue } = require('./sendOrder');
const { listenOrderResponse } = require('./listen_order_res');

const app = express();
app.use(express.json());

app.get('/call-order', async (req, res) => {
  logger.info({
    message: 'Inside call order',
    service: 'customer-service',
    timestamp: new Date().toISOString()
  });

  await sendMessageToOrder('Customer clicked on order');
  res.send('Response come from call order');
});

listenOrderResponse();

app.post('/create-order', async (req, res) => {
  const { customerId, orderId } = req.body;
  logger.info({
    message: 'Creating order',
    customerId,
    orderId,
    status: 'OrderCreated',
    service: 'customer-service',
    timestamp: new Date().toISOString()
  });

  await sendOrderToQueue({ customerId, orderId, status: 'OrderCreated' });
  res.send('Order placed');
});

app.get('/', (req, res) => {
  res.send('Response come from customer');
});

app.listen(3001, () => {
  logger.info({
    message: 'Customer Service started on port 3001',
    service: 'customer-service',
    timestamp: new Date().toISOString()
  });
});
