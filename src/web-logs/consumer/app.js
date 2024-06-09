// webLogsConsumer.js
const {Kafka} = require('kafkajs');
const {InfluxDB, Point} = require('@influxdata/influxdb-client');


const kafka = new Kafka({
  clientId: 'web-logs-consumer',
  brokers: ['kafka:9092'],
});

const token = process.env.INFLUXDB_TOKEN;
const url = 'http://influxdb:8086';
const org = 'm1pex';
const bucket = 'kafka_data';

const influx = new InfluxDB({url, token});
const writeApi = influx.getWriteApi(org, bucket, 'ns');

writeApi.useDefaultTags({ host: 'web-logs-consumer' });

const consumer = kafka.consumer({groupId: 'web-logs-group'});

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({topic: 'web-logs', fromBeginning: true});
  
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      try {
        const log = JSON.parse(message.value.toString());
        const point = new Point('web_logs')
          .tag('host', 'web-logs-consumer')
          .stringField('request', log.request)
          .stringField('ip', log.ip)
          .intField('responseTime', log.responseTime);
        
        writeApi.writePoint(point);
        await writeApi.flush();
        console.log('Inserted log to InfluxDB:', log);
      } catch (error) {
        console.error('Error processing message:', error.message);
      }
    },
  });
};

consume().catch(error => {
  console.error('Error in consumer:', error.message);
});
