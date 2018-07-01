<template>
  <div class="body-container">
    <board-area 
      :width="width" 
      :height="height" 
      :rowNumber="row" 
      :colNumber="col" 
      ref="board"
      class="board-container" />

    <piece
      v-for="(item, index) in points"
      v-on:move="move"
      v-on:batch="selectPosition"
      v-on:onClickEvent="reset"
      :key="index"
      :idx="index" 
      :x="item.x" 
      :y="item.y" 
      :width="item.width" />

      <div 
        :style="{
          position: 'absolute',
          transform: 'translate(' + tempX + 'px,' + tempY + 'px)',
          width: height + 'px',
          height: height + 'px',
          backgroundColor: 'gray'
        }">
      </div>
  </div>
</template>

<script>
import Piece from "@/components/shared-components/pieceItem";
import { Tracking } from "@/mixins/tracking";

export default {
  components: {
    Piece
  },
  mixins: [Tracking],
  data() {
    return {
      width: 20,
      height: 60,
      row: 5,
      col: 5,
      tempX: -9999,
      tempY: -9999,
      points: []
    };
  },
  created() {
    // (1 ~ 3, 1 ~ 3)
    let n = 9;
    let i = 0;
    let w = this.width;
    let h = this.height;
    while (i < n) {
      for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 3; c++) {
          let xx = r * (w + h) + w;
          let yy = c * (w + h) + w;
          this.$set(this.points, i, {
            x: xx,
            y: yy,
            width: h
          });
          i++;
        }
      }
    }
  },
  methods: {
    move(pos) {
      let x = pos.x;
      let y = pos.y;
      let idx = pos.idx;

      this.points[idx].x = x;
      this.points[idx].y = y;

      this.findClosestPosition(this.$refs.board.$refs.inner, x, y, idx);
    },
    reset(idx) {
      if (idx !== this.prevIdex) {
        this.tempX = -9999;
        this.tempY = -9999;
      }
      this.prevIdex = idx;
    },
    selectPosition(idx) {
      const piece = this.points[idx];
      piece.x = this.tempX;
      piece.y = this.tempY;
      piece.width = this.tempWidth;
      piece.height = this.tempHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.match-empty {
  border-radius: 25%;
}
</style>
