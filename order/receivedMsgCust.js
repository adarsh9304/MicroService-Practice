const amqplib=require('amqplib')

async function ReceivedFromCustomer(message) {
    try{
        const rabbitMQ='amqp://rabbitmq:5672';
        const queueName='order_queue';
       
        const connection=await amqplib.connect(rabbitMQ);
        const channel=await connection.createChannel();

        channel.assertQueue(queueName,{
            durable:false
        });

        channel.consume(queueName,(message)=>{
            const messageContent=message.content.toString();

            console.log('Received messages',messageContent);

            channel.ack(message)
        })

    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    ReceivedFromCustomer
}