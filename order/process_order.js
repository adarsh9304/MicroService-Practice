const amqplib = require('amqplib');

async function processOrderAndRespond(orderDetails) {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const responseQueue = 'order_response_queue';

        await channel.assertQueue(responseQueue, { durable: false });

        if (orderDetails.customerId % 2 === 0) {
            console.log(`Order Service: Order approved.`);
            orderDetails.status = 'OrderApproved';
        } else {
            console.log(`Order Service: Order rejected.`);
            orderDetails.status = 'OrderRejected';
        }

        channel.sendToQueue(responseQueue, Buffer.from(JSON.stringify(orderDetails)));
    } catch (err) {
        console.error('Error in processing order:', err);
    }
}

module.exports = {
    processOrderAndRespond
};
