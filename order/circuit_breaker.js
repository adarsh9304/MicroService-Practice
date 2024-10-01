const amqplib = require('amqplib');
const opossum = require('opossum');

async function processOrder(orderDetails) {
  
    if (Math.random() > 0.7) { 
        throw new Error('Failed to process the order');
    }
    console.log(`Order Service: Successfully processed order ${orderDetails.orderId}`);
}

const breakerOptions = {
    timeout: 5000, // Wait for 5 seconds to process the order, otherwise treat as failure
    errorThresholdPercentage: 50, // Circuit opens if 50% of the requests fail
    resetTimeout: 10000 // Try again after 10 seconds
};

const breaker = new opossum(processOrder, breakerOptions);

breaker.on('open', () => console.log('Circuit Breaker Opened: Stopping message processing.'));
breaker.on('halfOpen', () => console.log('Circuit Breaker Half-Opened: Testing message processing.'));
breaker.on('close', () => console.log('Circuit Breaker Closed: Resuming message processing.'));
breaker.on('failure', (err) => console.log('Circuit Breaker Failure:', err));

async function listenOrderCB() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queueName = 'orderdetail_queue';

        await channel.assertQueue(queueName, { durable: false });

        channel.consume(queueName, async (message) => {
            const orderDetails = JSON.parse(message.content.toString());
            
            try {
                await breaker.fire(orderDetails);
                console.log(`Order Service: Acknowledging order ${orderDetails.orderId}`);
                channel.ack(message); 
            } catch (err) {
                console.log('Error in processing order. Will retry later.', err);
            }
        });
    } catch (err) {
        console.error('Error in listening for orders:', err);
    }
}

module.exports={
    listenOrderCB
}