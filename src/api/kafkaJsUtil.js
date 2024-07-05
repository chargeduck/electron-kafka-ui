const { Kafka } = require('kafkajs')

// https://kafka.js.org/docs/getting-started
export function connByKafkaJs(chooseCluster) {
    return new Kafka({
        clientId: chooseCluster.uuid,
        brokers: [chooseCluster.bootstrapServers]
    })
}

export function getKafkaJsAdmin(chooseCluster) {
    const kafka = connByKafkaJs(chooseCluster);
    return kafka.admin()
}
