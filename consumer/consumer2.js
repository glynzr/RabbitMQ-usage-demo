// consumer.js for Consumer 2
const amqp = require('amqplib');
require('dotenv').config({ path: '../.env' });

async function consumeEmails() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'email';

    await channel.assertQueue(queue, { durable: true });

    console.log(`[Consumer2] Waiting for messages in ${queue}...`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const email = JSON.parse(msg.content.toString());
        console.log(`[Consumer2] Received email:`, email);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in Consumer2:', error);
  }
}

consumeEmails();
