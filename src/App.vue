<template>
  <div id="app">
    <kafka/>
  </div>
</template>

<script>
import kafka from "@/components/kafka.vue";

export default {
  name: 'App',
  components: {
    kafka
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
