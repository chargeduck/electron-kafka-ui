<template>
  <div class="container">
    <el-container>
      <el-aside>
        <cluster
            :cluster-arr="clusterArr"
            :table-active="tableActive"
            @update-table-active="updateTableActive"
            @update-cluster-arr="updateClusterArr"/>
      </el-aside>
      <el-main>
        <el-card>
          <cluster-table
              v-if="tableActive === 0"
              :clusterArr="clusterArr"
              :localStorageKey="localStorageKey"
              @update-table-active="updateTableActive"
              @update-cluster-arr="updateClusterArr"/>
          <metadata-table
              v-if="tableActive === 1"
              :choose-cluster="chooseCluster"
          />
          <topics-table
              v-if="tableActive === 3"
              :choose-cluster="chooseCluster"
          />
          <topic-dialog
            v-if="tableActive === 4"

          />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Cluster from "@components/cluster/index.vue"
import ClusterTable from "@components/table/clusterTable.vue"
import MetadataTable from "@components/table/metadataTable.vue"
import TopicsTable from "@components/table/topicsTable.vue";
import TopicDialog from "@components/dialog/topicDialog.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'kafka',
  components: {
    TopicDialog,
    TopicsTable,
    Cluster,
    ClusterTable,
    MetadataTable
  },
  data() {
    return {
      clusterArr: [],
      localStorageKey: 'clusterArr',
      tableActive: 0,
      chooseCluster: {}
    }
  },
  created() {
    this.loadLocalStorageData()
  },
  methods: {
    updateClusterArr(newVal) {
      this.clusterArr = newVal
    },
    loadLocalStorageData() {
      this.clusterArr = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    },
    updateTableActive(val, chooseCluster) {
      this.tableActive = val
      this.chooseCluster = JSON.parse(chooseCluster)
    }
  }
}
</script>
<style>

el-aside {
  width: 20%;
  height: 100%;
  float: left;
}

el-main {
  width: 68%;
  height: 100%;
  float: left;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
