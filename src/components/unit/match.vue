<template>
  <div 
    class="match" 
    :style="[staticStyle, {transform: translateXY}]"
    @mousedown="initialClick">
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
  mounted() {
    this.translateX = this.x;
    this.translateY = this.y;
  },
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
      return "translate(" + this.translateX + "px, " + this.translateY + "px)";
    }
  },
  methods: {
    move(e) {
      this.translateX = e.clientX - 10;
      this.translateY = e.clientY - 10;
    },
    initialClick() {
      if (moving) {
        document.removeEventListener("mousemove", this.move);
        moving = !moving;
        this.$parent.tracking(this.idx, false);
        return;
      }

      this.$parent.tracking(this.idx, true);
      moving = !moving;

      document.addEventListener("mousemove", this.move, false);
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
