const amqplib=require('amqplib')

const { processOrderAndRespond } = require("./process_order");

async function listenForOrders() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queueName = 'orderdetail_queue';

        await channel.assertQueue(queueName, { durable: false });

        channel.consume(queueName, async (message) => {
            const orderDetails = JSON.parse(message.content.toString());
            console.log(`Order Service: Received order ${orderDetails.orderId}`);

            await processOrderAndRespond(orderDetails);

            channel.ack(message);
        });
    } catch (err) {
        console.error('Error in listening for orders:', err);
    }
}

module.exports={
    listenForOrders
}