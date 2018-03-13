<template>
  <div 
    class="match" 
    :style="[staticStyle, {transform: translateXY}]"
    @mousedown="click">
  </div>
</template>

<script>
let moving = false;

export default {
  name: "Match",
  props: {
    idx: {
      type: Number
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  components: {},
  data() {
    return {
      translateX: 0,
      translateY: 0
    };
  },
  computed: {
    staticStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    },
    translateXY() {
      return "translate(" + this.x + "px, " + this.y + "px)";
    }
  },
  methods: {
    click(e) {
      this.$parent.matchClick(this.idx)
    }
  }
};
</script>

<style lang="scss" scoped>
.match {
  position: absolute;
  background-color: black;
}
</style>
