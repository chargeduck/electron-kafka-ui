<template>
  <div class="container">
    <el-collapse>
      <el-collapse-item
          v-for="(item, index) in brokersMetadata"
          :key="index"
          :title="item.brokerId"
          :name="item.brokerId"
      >
        <el-row>
          <el-link @click="click(item)">
            Brokers
          </el-link>
        </el-row>
        <el-row>
          <el-link @click="click(item)">
            Topics
          </el-link>
        </el-row>
        <el-row>
          <el-link @click="click(item)">
            Consumers
          </el-link>
        </el-row>
        <el-row>
          <el-link @click="click(item)">
            Producers
          </el-link>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'aside',
  data() {
    return {
      brokersMetadata: [
        {
          brokerId: '192.168.242.130'
        },
        {
          brokerId: 'localhost'
        }
      ]
    }
  },
  methods: {
    click(broker) {
      console.log(broker)
    }
  }
}
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  width: 100%;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.menu {
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin: 10px;
}
</style>
