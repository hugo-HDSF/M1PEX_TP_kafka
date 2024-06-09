// financialTransactionsConsumer.js
const {Kafka} = require('kafkajs');
const {InfluxDB, Point} = require('@influxdata/influxdb-client');


const kafka = new Kafka({
  clientId: 'financial-transactions-consumer',
  brokers: ['kafka:9092'],
});

const token = process.env.INFLUXDB_TOKEN;
const url = 'http://influxdb:8086';
const org = 'm1pex';
const bucket = 'kafka_data';

const influx = new InfluxDB({url, token});
const writeApi = influx.getWriteApi(org, bucket, 'ns');

writeApi.useDefaultTags({ host: 'financial-transactions-consumer' });

const consumer = kafka.consumer({groupId: 'financial-transactions-group'});

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: 'financial-transactions',
    fromBeginning: true,
  });
  
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      try {
        const transaction = JSON.parse(message.value.toString());
        const point = new Point('financial_transactions')
          .tag('host', 'financial-transactions-consumer')
          .stringField('account', transaction.account)
          .floatField('amount', transaction.amount)
          .stringField('type', transaction.type);
        
        writeApi.writePoint(point);
        await writeApi.flush();
        console.log('Inserted transaction to InfluxDB:', transaction);
      } catch (error) {
        console.error('Error processing message:', error.message);
      }
    },
  });
};

consume().catch(error => {
  console.error('Error in consumer:', error.message);
});
