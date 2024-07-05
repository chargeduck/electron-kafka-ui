<template>
  <div>
    <span style="color: #00b0e8; text-align: center;font-size: 40px;margin: 5px auto">Kafka UI</span>
    <el-menu
        class="el-menu-vertical-demo"
    >
      <el-menu-item
        @click="changeTable(0, null)"
      >
<!--        <img
            class="svgClass"
            src="../../assets/kafka.svg"
            alt="kafka">-->
        {{ $t('cluster.title') }}
      </el-menu-item>
    </el-menu>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        v-for="(item, index) in clusterArr"
        :key="index"
    >
      <el-sub-menu index="1">
        <template #title>
          <img
              class="svgClass"
              src="../../assets/kafka.svg"
              alt="kafka">
          <span @click="changeTable(0, null)">{{ item.cluster}}</span>
        </template>
        <el-menu-item @click="changeTable(1, item)">Metadata</el-menu-item>
        <el-menu-item @click="changeTable(2, item)">Brokers</el-menu-item>
        <el-menu-item @click="changeTable(3, item)">Topics</el-menu-item>
        <el-menu-item @click="changeTable(4, item)">Consumers</el-menu-item>
        <el-menu-item @click="changeTable(5, item)">Producers</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'clusterMenu',
  props: {
    clusterArr: Array,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    changeTable(val , item) {
      this.$emit('update-table-active', val, JSON.stringify(item))
    }
  }
}
</script>
<style>
.container {
  font-size: 16px;
  float: left;
  text-align: left;
}
.svgClass{
  width: 60px; margin-right: 10px
}
</style>
