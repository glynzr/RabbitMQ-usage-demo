// publisher.js
const amqp = require('amqplib');
require('dotenv').config({ path: '../.env' });

async function publishEmails() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'email';

    await channel.assertQueue(queue, { durable: true });

    setInterval(() => {
      const email = {
        title: `Email Subject - ${Math.random().toString(36).substring(7)}`,
        body: `This is a sample email body.`,
        recipients: [`user${Math.floor(Math.random() * 100)}@example.com`],
        sender: `sender@example.com`
      };
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(email)), {
        persistent: true
      });
      console.log(`Published email: ${JSON.stringify(email)}`);
    }, 5000); // Send email every 5 seconds
  } catch (error) {
    console.error('Error in publisher:', error);
  }
}

publishEmails();
