const express = require('express');
const { ReceivedFromCustomer } = require('./receivedMsgCust');

const app = express();
app.use(express.json());

ReceivedFromCustomer()

app.get('/order-temp',(req,res)=>{
  res.send('Response come from Order and req from customer')
})

app.get('/',(req,res)=>{
  res.send('Response come from Order')
})

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
