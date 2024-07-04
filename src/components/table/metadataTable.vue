<template>
  <div>
    <el-form :data="metadata">
      <el-form-item label="brokersMetadata">
        <el-input v-model="metadata.brokerMetadata"></el-input>
      </el-form-item>
      <el-form-item label="brokerMetadataLastUpdate">
        <el-input v-model="metadata.brokerMetadataLastUpdate"/>
      </el-form-item>
      <el-form-item label="brokers">
        <el-input v-model="metadata.brokers"/>
      </el-form-item>
      <el-form-item label="clientId">
        <el-input v-model="metadata.clientId"/>
      </el-form-item>
      <el-form-item label="connecting">
        <el-input v-model="metadata.connecting"/>
      </el-form-item>
      <el-form-item label="correlationId">
        <el-input v-model="metadata.correlationId"/>
      </el-form-item>
      <el-form-item label="initialHosts">
        <el-input v-model="metadata.initialHosts"/>
      </el-form-item>
      <el-form-item label="longpollingBrokers">
        <el-input v-model="metadata.longpollingBrokers"/>
      </el-form-item>
      <el-form-item label="noAckBatchOptions">
        <el-input v-model="metadata.noAckBatchOptions"/>
      </el-form-item>
      <el-form-item label="options">
        <el-input v-model="metadata.options"/>
      </el-form-item>
      <el-form-item label="ready">
        <el-input v-model="metadata.ready"/>
      </el-form-item>
      <el-form-item label="ssl">
        <el-input v-model="metadata.ssl"/>
      </el-form-item>
    </el-form>
    <el-input type="textarea"
              v-model="metadataJson"
              :autosize="{ minRows: 2, maxRows: 20 }"
    >

    </el-input>
    <el-button @click="loadMetadata">Refresh</el-button>
  </div>

</template>
<script>
const kafka = require('kafka-node')
const moment = require('moment')
export default {
  name: 'MetadataTable',
  props: {
    chooseCluster: Object
  },
  data() {
    return {
      metadata: {
        brokerMetadata: [],
        brokerMetadataLastUpdate: ''
      },
      client: null,
      metadataJson: ''
    }
  },
  created() {
    console.log(this.chooseCluster, 'chooseCluster')
    this.loadMetadata()
  },
  methods: {
    loadMetadata() {
      const kafkaClient = new kafka.KafkaClient({
        kafkaHost: this.chooseCluster.bootstrapServers
      });
      kafkaClient.on('ready', () => {
        this.metadata = {
          ...kafkaClient,
          brokerMetadata: JSON.stringify(kafkaClient.brokerMetadata, null, 2),
          brokerMetadataLastUpdate: moment(kafkaClient.brokerMetadataLastUpdate).format('yyyy-MM-DD HH:mm:ss'),
          brokers: JSON.stringify(kafkaClient.brokers, null, 2),
          longpollingBrokers: JSON.stringify(kafkaClient.longpollingBrokers, null, 2),
          initialHosts: JSON.stringify(kafkaClient.initialHosts, null, 2),
          options: JSON.stringify(kafkaClient.options, null, 2)
        }
        this.metadataJson = JSON.stringify(kafkaClient, null, 2)
      })

    }
  }
}
</script>
<style></style>
