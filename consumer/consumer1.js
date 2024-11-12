// consumer.js for Consumer 1
const amqp = require('amqplib');
require('dotenv').config({ path: '../.env' });

async function consumeEmails() {
  try {
    console.log('Connecting to RabbitMQ at:', process.env.RABBITMQ_URL);

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'email';

    await channel.assertQueue(queue, { durable: true });

    console.log(`[Consumer1] Waiting for messages in ${queue}...`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const email = JSON.parse(msg.content.toString());
        console.log(`[Consumer1] Received email:`, email);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in Consumer1:', error);
  }
}

consumeEmails();
