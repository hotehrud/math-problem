<template>
  <div class="list-container">
    <div 
      v-for="item in items" 
      @click="pushRouter(item.link)"
      :aria-label="item.title" 
      class="photo-container">
      <img :src="item.imageURL">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  async created() {
    let requestURL = this.$route.params.id;
    this.items = await this.$http.getJSON(requestURL);
  },
  methods: {
    pushRouter(id) {
      this.$router.push({
        name: "problem",
        params: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  position: absolute;
  @include respond-to($large-desktop) {
    width: calc(100% - #{$sidebar-width});
    left: 256px;
  }
}
.photo-container {
  width: 200px;
  height: 200px;
  cursor: pointer;
  color: #fff;
  &::after {
    content: attr(aria-label);
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.2s;
  }
  &:hover::after {
    opacity: 1;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>