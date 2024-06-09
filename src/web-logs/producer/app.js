const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'web-logs-producer',
  brokers: ['kafka:9092'],  // Connect to Kafka container
});

const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  setInterval(async () => {
    const logMessage = {
      request: 'GET /home',
      ip: '192.168.1.1',
      responseTime: 123,
    };
    await producer.send({
      topic: 'web-logs',
      messages: [{value: JSON.stringify(logMessage)}],
    });
    console.log('Sent log message:', logMessage);
  }, 120000);
};

produce().catch(console.error);
