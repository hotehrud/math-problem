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
      :key="index"
      :idx="index" 
      :startX="startPosition.x" 
      :startY="startPosition.y" 
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
import Piece from "@/components/shared-components/Piece";
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
      tempX: 0,
      tempY: 0,
      startPosition: {
        x: 0,
        y: 0
      },
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
  mounted() {
    let rect = this.$el.getBoundingClientRect();
    this.startPosition.x = rect.left;
    this.startPosition.y = rect.top;
  },
  methods: {
    move(pos) {
      this.findClosestPosition(
        this.$refs.board.$refs.inner,
        pos.x,
        pos.y,
        pos.idx
      );
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
</style>
