const express = require('express');
const { getOrderFromOrderService } = require('./directHttpOrder');
const { sendMessageToOrder } = require('./sendMsgOrder');

const app = express();
app.use(express.json());

app.get('/call-order',async (req,res)=>{
  console.log('inside call order')
  // const response=await getOrderFromOrderService();
  await sendMessageToOrder('Customer clicked on order')
  // res.send(response)
  res.send('Response come from call order')
})

app.get('/',(req,res)=>{
  res.send('Response come from customer')
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
