<template>
  <div>
    <el-form :model="searchForm">
      <el-form-item :label="$t('topics.searchForm.topic')">
        <el-input v-model="searchForm.topic"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="createTopics">{{$t('topics.searchForm.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="topics">
      <el-table-column label="topic" prop="topic"/>
      <el-table-column label="partition" prop="partition"/>
      <el-table-column label="leader" prop="leader"/>
      <el-table-column label="replicas" prop="replicas"/>
      <el-table-column label="isr" prop="isr"/>
    </el-table>
  </div>
</template>
<script>
import {getAdmin} from "@/api/kafka.js";

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
    }
  }
}
</script>
<style></style>
