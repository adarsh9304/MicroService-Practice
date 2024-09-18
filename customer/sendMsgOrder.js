const amqplib=require('amqplib');

async function sendMessageToOrder(message){
   try{
     const rabbitMQ='amqp://rabbitmq:5672'
     const queueName='order_queue';
    
     const connection=await amqplib.connect(rabbitMQ);
     const channel=await connection.createChannel();

     await channel.assertQueue(queueName,{
        durable:false
     })

     channel.sendToQueue(queueName,Buffer.from(message));
     console.log('sent message is:',message)

     setTimeout(() => {
        connection.close()
     }, 500);

   }
   catch(err){
    console.log('Error ocuured',err)
   }
}

module.exports={
    sendMessageToOrder
}