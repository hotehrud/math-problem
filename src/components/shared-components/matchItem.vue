<template>
  <div class="match" 
    :style="{
      position: 'absolute',
      zIndex: zIndex,
      transform: 'translate(' + translateX + 'px,' + translateY + 'px)',
      width: this.width + 'px',
      height: this.height + 'px',
      backgroundColor: 'blue'
    }"
    @click="clickBindingEvent">
  </div>
</template>

<script>
let moving = false;

export default {
  props: {
    idx: {
      type: Number
    },
    startX: {
      type: Number
    },
    startY: {
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
  data() {
    return {
      translateX: this.x,
      translateY: this.y,
      moving: false,
      zIndex: 9998
    };
  },
  methods: {
    clickBindingEvent(e) {
      e.stopPropagation();
      if (this.moving) {
        // batch
        document.removeEventListener("mousemove", this.changePositionMatch);
        this.moving = false;
        this.zIndex = 9998;
        this.$emit("batch", this.idx);
        this.$nextTick(() => {
          if (this.x < 0 && this.y < 0) {
            return;
          }
          this.translateX = this.x;
          this.translateY = this.y;
        });
        return;
      } else {
        // move
        this.moving = true;
        this.zIndex = 9999;
        this.$emit("onClickEvent", this.idx);
        document.addEventListener("mousemove", this.changePositionMatch);
      }
    },
    changePositionMatch(e) {
      this.translateX = e.pageX - this.startX;
      this.translateY = e.pageY - this.startY;
      this.$emit("move", {
        x: this.translateX,
        y: this.translateY,
        idx: this.idx
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
