<template>
  <div>
    <el-form :model="searchForm" :inline="true">
      <el-form-item :label="$t('topics.searchForm.topic')">
        <el-input v-model="searchForm.topic"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="showDialog = true" type="primary">{{ $t('topics.searchForm.add') }}</el-button>
        <el-button @click="searchTopics" type="primary">{{ $t('topics.searchForm.search') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="topics">
      <el-table-column :label="$t('topics.table.topic')" prop="topic">
        <template v-slot="scope">
          <el-link type="primary" @click="topicMessages(scope.row.topic)">{{ scope.row.topic }}</el-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('topics.table.partition')" prop="partition"/>
      <el-table-column :label="$t('topics.table.leader')" prop="leader"/>
      <el-table-column :label="$t('topics.table.replicas')" prop="replicas"/>
      <el-table-column :label="$t('topics.table.isr')" prop="isr"/>
      <el-table-column :label="$t('topics.table.opera.title')">
        <template v-slot="scope">
          <el-button @click="delTopicByKafkaJs(scope.row.topic)" type="danger">{{
              $t('topics.table.opera.del')
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showDialog" :title="$t('topics.dialog.title')">
      <el-form :model="form" :label-width="80">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('topics.dialog.topic')">
              <el-input v-model="form.topic"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('topics.dialog.partitions')">
              <el-input v-model="form.partitions"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('topics.dialog.replicationFactor')">
              <el-input v-model="form.replicationFactor"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="4">
            <el-button @click="showDialog = false">{{ $t('topics.dialog.cancel') }}</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="createTopicsByKafkaJs">{{ $t('topics.dialog.confirm') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog v-model="showTopicMsg" :title="$t('topicMsg.title')">
      <topic-dialog :table-data="topicMsgList"/>
    </el-dialog>
  </div>
</template>
<script>
import {getAdmin, getConsumer} from "@/utils/kafka.js";
import {isNotBlank, isEmpty} from "@/utils/str.js";
import {getKafkaJs, getKafkaJsAdmin} from "@/utils/kafkaJsUtil.js";
import TopicDialog from '@components/dialog/topicDialog.vue'

export default {
  name: 'TopicsTable',
  props: {
    chooseCluster: Object
  },
  components: {
    TopicDialog
  },
  data() {
    return {
      topics: [],
      searchForm: {
        topic: ''
      },
      showDialog: false,
      form: {
        topic: '',
        partitions: 1,
        replicationFactor: 1
      },
      admin: null,
      topicMsgList: [],
      showTopicMsg: false
    }
  },
  created() {
    this.loadTopics()
  },
  methods: {
    //============KafkaNode==================
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
        console.log(res, 'resLoadTopics')
        const entries = Object.entries(res[1].metadata)
        entries.map(item => {
          this.topics.push(item[1][0])
        })
      });
    },
    createTopics() {
      const topics = [{...this.form}]
      const admin = getAdmin(this.chooseCluster)
      admin.createTopics(topics, (err, res) => {
        console.log('err', err)
        console.log('res', res)
        this.loadTopics()
      })
      this.showDialog = false
    },
    // ==============KafkaJS ================
    async initAdmin() {
      const client = getKafkaJs(this.chooseCluster);
      const admin = client.admin();
      await admin.connect();
      this.admin = admin
    },
    async createTopicsByKafkaJs() {
      await this.initAdmin()
      const admin = this.admin
      const topics = [
        {
          topic: this.form.topic,
          numPartitions: this.form.partitions,
          replicationFactor: this.form.replicationFactor
        }
      ]
      try {
        await admin.createTopics({topics});
        console.log(`topics.createSuccess`);
        this.showDialog = false
        this.loadTopics()
        await this.loadTopicsByKafkaJs()
      } catch (error) {
        console.log(`topics.createFailed\nretry with kafka-node`, error);
        this.createTopics()
      } finally {
        await admin.disconnect();
      }
    },
    async delTopicByKafkaJs(topic) {
      await this.initAdmin()
      const admin = this.admin
      await admin.deleteTopics({
        topics: [topic],
        timeout: 5000
      }).then(async resp => {
        console.log(resp, 'resp')
        this.searchTopics()
      })
    },
    async loadTopicsByKafkaJs() {
      await this.initAdmin()
      const listTopics = await this.admin.listTopics()
      console.log(listTopics)
    },
    topicMessages(topic) {
      this.showTopicMsg = true
      const consumer = getConsumer(this.chooseCluster, [{topic}], {});
      this.topicMsgList = []
      consumer.on('message', (message) => {
        this.topicMsgList.push(message)
      })
    }
  }
}
</script>
<style></style>
