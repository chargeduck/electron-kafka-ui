<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" :icon="CirclePlus" @click="showDialog = true">{{ $t('cluster.searchForm.add') }}
        </el-button>
        <el-button type="danger" :icon="Delete" @click="clearLocalStorage">{{ $t('cluster.searchForm.clear') }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-table :data="clusterArr">
      <el-table-column type="index" width="80" :label="$t('cluster.table.index')"/>
      <el-table-column prop="cluster" :label="$t('cluster.table.cluster')"/>
      <el-table-column prop="bootstrapServers" :label="$t('cluster.table.bootstrapServers')"/>
      <el-table-column prop="version" :label="$t('cluster.table.version')"/>
      <el-table-column prop="brokerCount" :label="$t('cluster.table.brokerCount')"/>
      <el-table-column prop="partitions" :label="$t('cluster.table.partitions')"/>
      <el-table-column prop="topics" :label="$t('cluster.table.topics')"/>
      <el-table-column prop="production" :label="$t('cluster.table.production')"/>
      <el-table-column prop="consumption" :label="$t('cluster.table.consumption')"/>
      <el-table-column :label="$t('cluster.table.opera.label')">
        <template v-slot="scope">
          <el-button @click="removeCluster(scope.row.uuid)" type="danger">{{ $t('cluster.table.opera.remove') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="showDialog" :title="$t('cluster.dialog.title')">
      <el-form :model="form" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('cluster.dialog.cluster')">
              <el-input v-model="form.cluster"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('cluster.dialog.bootstrapServers')">
              <el-input
                  v-model="form.bootstrapServers"
                  placeholder="localhost:9092"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">Zookeeper</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('cluster.dialog.zkHost')">
              <el-input v-model="form.zkHost" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('cluster.dialog.zkPort')">
              <el-input v-model="form.zkPort" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click="showDialog = false">取消</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="saveClusterConn">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {v4 as uuidV4} from "uuid";
import {CirclePlus, Delete} from "@element-plus/icons-vue";

export default {
  name: 'ClusterTable',
  computed: {
    Delete() {
      return Delete
    },
    CirclePlus() {
      return CirclePlus
    }
  },
  props: {
    clusterArr: Array,
    localStorageKey: String
  },
  data() {
    return {
      showDialog: false,
      form: {
        cluster: '',
        bootstrapServers: '',
        zkHost: '',
        zkPort: 2181,
        uuid: ''
      }
    }
  },
  watch: {
    clusterArr: {
      handler(newVal, oldVal) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(newVal))
      },
      deep: true
    }
  },
  methods: {
    saveClusterConn() {
      this.form.uuid = uuidV4()
      this.$emit('update-cluster-arr', [...this.clusterArr, this.form])
      this.showDialog = false
    },
    clearLocalStorage() {
      localStorage.removeItem(this.localStorageKey)
      this.$emit('update-cluster-arr', [])
      this.$message.success('清除成功')
    },
    removeCluster(uuid) {
      this.$emit('update-cluster-arr', this.clusterArr.filter(item => item.uuid !== uuid))
    }
  }
}
</script>
<style></style>
