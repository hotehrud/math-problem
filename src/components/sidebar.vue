<template>
  <div 
    class="sidebar"
    v-bind:class="{'sidebar-open': show}"
    @click="propagationPrevent">

    <slot/>

    <div class="made-with">
      <h4>
        Made with
        <a href="https://vuejs.org">
          <div class="vue"></div>
        </a>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  components: {},
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    propagationPrevent(e) {
      e.stopPropagation();
    }
  }
};
</script>

<style lang="scss" scpoed>
$made-color: #546e7a;

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
  transform: translate3d(-100%, 0, 0);
  width: $sidebar-width;
  color: #fff;
  background-color: $primary-color;
  @include respond-to($large-desktop) {
    transform: translateZ(0);
  }
  .made-with {
    position: absolute;
    bottom: 0;
    width: inherit;
    color: $made-color;
    h4 {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 0.4rem;
      .vue {
        width: 1rem;
        height: 1rem;
        margin-left: 0.25rem;
        color: $made-color;
        background: url(../assets/images/logo.png);
        background-size: 100% 100%;
      }
    }
  }
}
.sidebar-open {
  transform: translateZ(0);
}
</style>