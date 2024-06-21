<p align="center">
  <a><img src="https://static-00.iconduck.com/assets.00/kafka-icon-512x234-uqez3fj8.png" width="200" alt="Kafka Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center">test <a href="https://kafka.apache.org/">Kafka</a></h1>
<h3 align="center"><i>(M1PEX_TP_kafka)</i></h3>

<p align="center">

</p>

<p align="center">
  <p align="center">
    Real-time data streaming platform using <a href="https://kafka.apache.org/">Apache Kafka</a>.
  </p>
    <p align="center">.
        <a href="https://github.com/hugo-HDSF/M1PEX_TP_kafka/issues">Report Bug</a>
        .
        <img src="https://img.shields.io/github/license/ucan-lab/docker-laravel" alt="License" height="15">
    </p>
</p>

<div align="center">

![Node.js](https://img.shields.io/badge/-Node.js_21.2-339933?logo=node.js&logoColor=white)
![Kafka](https://img.shields.io/badge/-Kafka_3.3-231F20?logo=apache-kafka&logoColor=white)
![Grafana](https://img.shields.io/badge/-Grafana_11.0-F46800?logo=grafana&logoColor=white)
![InfluxDB](https://img.shields.io/badge/-InfluxDB_2.7-22ADF6?logo=influxdb&logoColor=white)
![Zookeeper](https://img.shields.io/badge/-Zookeeper_3.9-2181A1?logo=apache-zookeeper&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker_25.0-2496ED?logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/-Docker_Compose_2.24-2496ED?logo=docker&logoColor=white)
</div>

<div align="center">

![Javascript](https://img.shields.io/badge/-Javascript_ES6-F7DF1E?logo=javascript&logoColor=black)

</div>

-----

## Setup

Run the following to set up the streaming data platform:

### Docker :
```shell
make up
```

> [!NOTE] 
> Navigate to http://localhost:3000/dashboards, logon with admin:admin credentials to see the grafana dashboards list and select the `Kafka Data Dashboard` to see the live data.

> [!TIP]  
> Navigate to http://localhost:8086 to see the influxdb dashboard.