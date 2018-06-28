<template>
  <div class="zpmain-wrapper">
    <router-view :key="key"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
<style lang="scss">
.zpmain-wrapper {
  width: 100%;
  min-width: 998px;
}
</style>
