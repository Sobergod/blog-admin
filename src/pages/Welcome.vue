<template>
    <div>
        欢迎
    </div>
</template>

<script>
import AX from "lib/axios-conf.js";
export default {
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function() {
      AX("/", "get")
        .then(res => {
          console.log(res);
        })
        .catch(error => {
        });
    }
  }
};
</script> 

<style scoped>
</style>