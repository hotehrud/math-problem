<template>
  <div class="frame">
    <component :is="componentLoader" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pNumber: this.$route.params.id
    };
  },
  created() {},
  computed: {
    componentLoader() {
      return () => import(`@/components/problems/problem-${this.pNumber}`);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>