<template>
  <div class="match" 
    :style="{
      position: 'absolute',
      zIndex: zIndex,
      transform: 'translate(' + translateX + 'px,' + translateY + 'px)',
      width: w + 'px',
      height: h + 'px'
    }"
    @click="clickBindingEvent">
  </div>
</template>

<script>
let reduce = 8;

export default {
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
  data() {
    return {
      translateX: this.x,
      translateY: this.y,
      moving: false,
      zIndex: 9998
    };
  },
  mounted() {
    this.$nextTick(() => {
      const pos = this.$parent.$refs.board.$el.getBoundingClientRect();
      this.translateX += pos.left;
      this.translateY += pos.top;
    });
  },
  computed: {
    w() {
      if (this.width > this.height) {
        return this.width;
      } else {
        return this.width - reduce;
      }
    },
    h() {
      if (this.width > this.height) {
        return this.height - reduce;
      } else {
        return this.height;
      }
    }
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
      this.translateX = e.pageX;
      this.translateY = e.pageY;
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
.match {
  &:before {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    border-radius: 80%;
    background-color: #ff3636;
    z-index: 2;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 4px;
    left: 4px;
    background-color: #ffbb00;
    border-radius: 3px;
  }
}
</style>
