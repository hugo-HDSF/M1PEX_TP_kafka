// iotSensorsProducer.js
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'iot-sensors-producer',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  setInterval(async () => {
    const sensorData = {
      temperature: 22.5,
      humidity: 60,
    };
    await producer.send({
      topic: 'iot-sensors',
      messages: [{value: JSON.stringify(sensorData)}],
    });
    console.log('Sent sensor data:', sensorData);
  }, 120000);
};

produce().catch(console.error);
