<template>
  <div class="toolbar">
    <button
      class="menu cursor"
      @click="open">
      <svg viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>
    </button>
    <div class="page-title">
      <h1>{{ pageName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {};
  },
  computed: {
    pageName() {
      return this.$route.name;
    }
  },
  methods: {
    open(e) {
      e.stopPropagation();
      this.$store.commit("setSidebarStatus", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  top: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  min-height: 65px;
  padding: 0 1rem;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.21);
  @include respond-to($large-desktop) {
    width: calc(100% - #{ $sidebar-width });
    left: 256px;
  }
}
.menu {
  display: block;
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  @include respond-to($large-desktop) {
    display: none;
  }
}
.page-title h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 0 1rem;
}
</style>