const { Kafka } = require('kafkajs')



// https://kafka.js.org/docs/getting-started
export function getKafkaJs(chooseCluster) {
    console.log(chooseCluster.bootstrapServers, 'chooseCluster')
    return new Kafka({
        clientId: chooseCluster.uuid,
        brokers: [chooseCluster.bootstrapServers],
    })
}

export function getKafkaJsAdmin(chooseCluster) {
    const kafka = getKafkaJs(chooseCluster);
    console.log('kafka', kafka)
    return kafka.admin()
}

