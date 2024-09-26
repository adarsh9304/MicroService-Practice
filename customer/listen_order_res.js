const amqplib=require('amqplib');


const rabbitMQ = 'amqp://localhost';

async function listenOrderResponse(){
    try{
    const connection=await amqplib.connect(rabbitMQ);
     const queueName='order_response_queue'

      const channel=await connection.createChannel();

      await channel.assertQueue(queueName,{durable:false});

      channel.consume(queueName,(message)=>{
        const response=JSON.parse(message.content.toString());

        console.log('customer service : Response received');

        if(response.status === 'OrderApproved'){
         console.log('customer service: order approved')
        }
        else{
            console.log('customer service: order rejected')
        }
        channel.ack(message)
      })
    }
    catch(err){
     console.log('Error happened ',err)
    }
}

module.exports={
    listenOrderResponse
}