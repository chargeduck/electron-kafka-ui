<template>
  <div>
    <el-form :data="searchForm" :inline="true">
      <el-form-item>
        <el-button @click="search">{{ $t('topicMsg.searchForm.search') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)">
      <el-table-column type="expand">
        <template #default="props">
          <el-form :label-width="80">
            <el-form-item :label="$t('topicMsg.expand.key')">
              <el-input
                  type="textarea"
                  v-model="props.row.key"
              />
            </el-form-item>
            <el-form-item :label="$t('topicMsg.expand.value')">
              <el-input
                  type="textarea"
                  v-model="props.row.value"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" width="80" label="index"/>
      <el-table-column prop="highWaterOffset" width="200" label="highWaterOffset"/>
      <el-table-column prop="key" label="key" width="100"/>
      <el-table-column prop="offset" width="80" label="offset"/>
      <el-table-column prop="partition" width="80" label="partition"/>
      <el-table-column prop="topic" width="100" label="topic"/>
      <el-table-column prop="value" width="100" show-overflow-tooltip label="value"/>
    </el-table>

    <!-- 分页 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'TopicDialog',
  props: {
    tableData: Array
  },
  data() {
    return {
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentTableData: []
    }
  },
  created() {
    this.total = this.tableData.length
    this.currentTableData = this.tableData
    console.log(this.currentTableData)
  },
  methods: {
    search() {

    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
}
</script>
<style></style>
