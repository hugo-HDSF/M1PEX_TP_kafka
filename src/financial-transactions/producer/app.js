// financialTransactionsProducer.js
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'financial-transactions-producer',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  setInterval(async () => {
    const transaction = {
      account: '123456',
      amount: 100.0,
      type: 'credit',
    };
    await producer.send({
      topic: 'financial-transactions',
      messages: [{value: JSON.stringify(transaction)}],
    });
    console.log('Sent transaction:', transaction);
  }, 120000);
};

produce().catch(console.error);
