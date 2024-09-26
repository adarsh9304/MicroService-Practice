const express = require('express');
const { listenForOrders } = require('./listen_for_order');
// const { ReceivedFromCustomer } = require('./receivedMsgCust');

const app = express();
app.use(express.json());

// ReceivedFromCustomer()
listenForOrders()

app.get('/order-temp',(req,res)=>{
  res.send('Response come from Order and req from customer')
})

app.get('/',(req,res)=>{
  res.send('Response come from Order')
})

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
