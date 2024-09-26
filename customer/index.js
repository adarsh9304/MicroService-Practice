const express = require('express');
// const { getOrderFromOrderService } = require('./directHttpOrder');
const { sendMessageToOrder, sendOrderToQueue } = require('./sendOrder');
const { listenOrderResponse } = require('./listen_order_res');

const app = express();
app.use(express.json());

app.get('/call-order',async (req,res)=>{
  console.log('inside call order')
  // const response=await getOrderFromOrderService();
  await sendMessageToOrder('Customer clicked on order')
  // res.send(response)
  res.send('Response come from call order')
})

listenOrderResponse()

app.post('/create-order',async (req,res)=>{
  const {customerId,orderId}=req.body;
  console.log('customer service , order is creating')
 
  await sendOrderToQueue({ customerId, orderId, status: 'OrderCreated' });

  res.send('Order placed')
})

app.get('/',(req,res)=>{
  res.send('Response come from customer')
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
