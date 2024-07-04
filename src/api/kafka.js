const kafka = require('kafka-node')
let client = null

export function connKafka(chooseCluster) {
    const kafkaClient = new kafka.KafkaClient({
        kafkaHost: chooseCluster.bootstrapServers
    })
    kafkaClient.on('ready', () => {
        client = kafkaClient
    })
}

export function getAdmin(chooseCluster) {
    if (client == null || client.ready === false) {
        connKafka(chooseCluster)
    }
    const kafkaClient = new kafka.KafkaClient({
        kafkaHost: chooseCluster.bootstrapServers
    })
    const admin =  new kafka.Admin(kafkaClient)
    return admin;
}
