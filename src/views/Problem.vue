<template>
  <component 
    :is="componentLoader" 
    class="problem-container"/>
</template>

<script>
export default {
  data() {
    return {
      uid: this.$route.params.id
    };
  },
  created() {},
  computed: {
    componentLoader() {
      return () => import(`@/components/problems/${this.uid}`);
      // return () => import(`@/components/problems/problem-${this.pNumber}`);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>