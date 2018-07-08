<template>
  <div>
    Card
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    pushRouter() {
      this.$router.push({
        name: "problem",
        params: {
          id: this.number
        }
      });
    }
  }
};
</script>

<style scoped>
</style>