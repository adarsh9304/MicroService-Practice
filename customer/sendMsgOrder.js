const amqplib=require('amqplib');

async function sendMessageToOrder(message){
   try{
    const rabbitMQ = 'amqp://3.110.188.66:5672';
     const queueName='order_queue';
    
     const connection=await amqplib.connect(rabbitMQ);
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

module.exports={
    sendMessageToOrder
}