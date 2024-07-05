<template>
  <div>
    <el-form :model="searchForm">
      <el-form-item :label="$t('topics.searchForm.topic')">
        <el-input v-model="searchForm.topic"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="createTopics">{{ $t('topics.searchForm.add') }}</el-button>
        <el-button @click="searchTopics">{{ $t('topics.searchForm.search') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="topics">
      <el-table-column :label="$t('topics.table.topic')" prop="topic"/>
      <el-table-column :label="$t('topics.table.partition')" prop="partition"/>
      <el-table-column :label="$t('topics.table.leader')" prop="leader"/>
      <el-table-column :label="$t('topics.table.replicas')" prop="replicas"/>
      <el-table-column :label="$t('topics.table.isr')" prop="isr"/>
      <el-table-column :label="$t('topics.table.opera.title')">
        <template v-slot="scope">
          <el-button @click="delTopic(scope.row.topic)">{{ $t('topics.table.opera.del') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getAdmin, getConsumer} from "@/api/kafka.js";
import {isNotBlank, isEmpty} from "@/utils/str.js";

export default {
  name: 'TopicsTable',
  props: {
    chooseCluster: Object
  },
  data() {
    return {
      topics: [],
      searchForm: {
        topic: ''
      },
      addTopic: {
        topic: '123',
        partitions: 1,
        replicationFactor: 1
      }
    }
  },
  created() {
    this.loadTopics()
  },
  methods: {
    searchTopics() {
      if (this.topics === [] || isEmpty(this.searchForm)) {
        this.loadTopics()
      } else {
        this.topics = this.topics.filter(item => {
          let flag = true
          const {topic} = this.searchForm
          if (isNotBlank(topic)) {
            flag = flag && item.topic.indexOf(topic) !== -1
          }
          return flag
        })
      }
    },
    loadTopics() {
      //  { "topic": "test2", "partition": 0, "leader": 1, "replicas": [ 1 ], "isr": [ 1 ] }
      const admin = getAdmin(this.chooseCluster)
      this.topics = []
      admin.listTopics((err, res) => {
        const entries = Object.entries(res[1].metadata)
        entries.map(item => {
          this.topics.push(item[1][0])
        })
      });
    },
    createTopics() {
      const topics = [{...this.addTopic}];
      const admin = getAdmin(this.chooseCluster)
      admin.createTopics(topics, (err, res) => {
        console.log(res, 'res')
        this.loadTopics()
      })
    },
    delTopic(topic) {
      console.log(topic, 'topic')
      const consumer = getConsumer(this.chooseCluster, [{topic}], {
        autoCommit: true,
        autoCommitIntervalMs: 5000
      })
      console.log(consumer, 'consumer')
      consumer.removeTopics([topic], function (err, removed) {
        console.log(err, 'err')
        console.log(removed, 'removed')
      });
      consumer.on('message', (message) => {
        console.log(message, 'message')
      })
    }
  }
}
</script>
<style></style>
