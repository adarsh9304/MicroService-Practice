const express = require('express');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Response come from customer')
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
