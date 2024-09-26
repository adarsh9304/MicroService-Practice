const amqplib=require('amqplib');

const rabbitMQ = 'amqp://localhost';

async function sendMessageToOrder(message){
   try{
      const connection=await amqplib.connect(rabbitMQ);
     const queueName='order_queue';
    
     const channel=await connection.createChannel();

     await channel.assertQueue(queueName,{
        durable:false
     })

     channel.sendToQueue(queueName,Buffer.from(message));
     console.log('sent message is:',message)

   }
   catch(err){
    console.log('Error ocuured',err)
   }
}

async function sendOrderToQueue(orderDetails){
   try{
      const connection=await amqplib.connect(rabbitMQ);
     
       const queueName='orderdetail_queue'
       const channel=await connection.createChannel();

       await channel.assertQueue(queueName,{durable:false});
       channel.sendToQueue(queueName,Buffer.from(JSON.stringify(orderDetails)));

       console.log('customer service , send order to orderdetail_queue')
   }
   catch(err){
      console.log('Error in sending order to queue',err)
   }
}

module.exports={
    sendMessageToOrder,
    sendOrderToQueue
}