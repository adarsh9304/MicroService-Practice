const express = require('express');
const cors=require('cors')
const proxy=require('express-http-proxy')

const app = express();

app.use(express.json());

app.use(cors())

app.use('/customer',proxy('http://localhost:3001'));
app.use('/order',proxy('http://localhost:3002'))


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
