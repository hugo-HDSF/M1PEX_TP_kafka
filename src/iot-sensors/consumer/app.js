// iotSensorsConsumer.js
const {Kafka} = require('kafkajs');
const {InfluxDB, Point} = require('@influxdata/influxdb-client');


const kafka = new Kafka({
  clientId: 'iot-sensors-consumer',
  brokers: ['kafka:9092'],
});

const token = process.env.INFLUXDB_TOKEN;
const url = 'http://influxdb:8086';
const org = 'm1pex';
const bucket = 'kafka_data';

const influx = new InfluxDB({url, token});
const writeApi = influx.getWriteApi(org, bucket, 'ns');

writeApi.useDefaultTags({host: 'iot-sensors-consumer'});

const consumer = kafka.consumer({groupId: 'iot-sensors-group'});

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({topic: 'iot-sensors', fromBeginning: true});
  
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      try {
        const sensorData = JSON.parse(message.value.toString());
        const point = new Point('iot_sensors')
          .tag('host', 'iot-sensors-consumer')
          .floatField('temperature', sensorData.temperature)
          .floatField('humidity', sensorData.humidity);
        
        writeApi.writePoint(point);
        await writeApi.flush();
        console.log('Inserted sensor data to InfluxDB:', sensorData);
      } catch (error) {
        console.error('Error processing message:', error.message);
      }
    },
  });
};

consume().catch(error => {
  console.error('Error in consumer:', error.message);
});
