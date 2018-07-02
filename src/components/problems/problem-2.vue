<template>
  <div class="body-container">
    <board-area 
      :width="width" 
      :height="height" 
      :rowNumber="row" 
      :colNumber="col" 
      ref="board"
      class="board-container" />

    <match 
      v-for="(item, index) in points" 
      ref="piece"
      v-on:move="move"
      v-on:batch="selectPosition"
      v-on:onClickEvent="reset"
      :key="index"
      :idx="index" 
      :x="item.x" 
      :y="item.y" 
      :width="item.width" 
      :height="item.height" />

      <div 
        class="match-empty"
        :style="{
          position: 'absolute',
          transform: 'translate(' + tempX + 'px,' + tempY + 'px)',
          width: tempWidth + 'px',
          height: tempHeight + 'px',
          backgroundColor: 'gray'
        }">
      </div>
  </div>
</template>

<script>
import Match from "@/components/shared-components/matchItem";
import { Tracking } from "@/mixins/tracking";

let width = 20;
let height = 60;
export default {
  components: {
    Match
  },
  mixins: [Tracking],
  data() {
    return {
      width: width,
      height: height,
      row: 6,
      col: 6,
      tempX: -9999,
      tempY: -9999,
      tempWidth: 0,
      tempHeight: 0,
      points: [
        {
          x: height * 2 + width * 2,
          y: height * 2 + width * 3,
          width: width,
          height: height
        },
        {
          x: height * 3 + width * 3,
          y: height * 2 + width * 3,
          width: width,
          height: height
        },
        {
          x: height * 4 + width * 4,
          y: height * 2 + width * 3,
          width: width,
          height: height
        },
        {
          x: height * 0 + width * 0,
          y: height * 3 + width * 4,
          width: width,
          height: height
        },
        {
          x: height * 1 + width * 1,
          y: height * 3 + width * 4,
          width: width,
          height: height
        },
        {
          x: height * 2 + width * 2,
          y: height * 3 + width * 4,
          width: width,
          height: height
        },
        {
          x: height * 3 + width * 3,
          y: height * 3 + width * 4,
          width: width,
          height: height
        },
        {
          x: height * 2 + width * 3,
          y: height * 2 + width * 2,
          width: height,
          height: width
        },
        {
          x: height * 3 + width * 4,
          y: height * 2 + width * 2,
          width: height,
          height: width
        },
        {
          x: height * 0 + width * 1,
          y: height * 3 + width * 3,
          width: height,
          height: width
        },
        {
          x: height * 1 + width * 2,
          y: height * 3 + width * 3,
          width: height,
          height: width
        },
        {
          x: height * 2 + width * 3,
          y: height * 3 + width * 3,
          width: height,
          height: width
        },
        {
          x: height * 3 + width * 4,
          y: height * 3 + width * 3,
          width: height,
          height: width
        },
        {
          x: height * 0 + width * 1,
          y: height * 4 + width * 4,
          width: height,
          height: width
        },
        {
          x: height * 1 + width * 2,
          y: height * 4 + width * 4,
          width: height,
          height: width
        },
        {
          x: height * 2 + width * 3,
          y: height * 4 + width * 4,
          width: height,
          height: width
        }
      ]
    };
  },
  methods: {
    move(pos) {
      let x = pos.x;
      let y = pos.y;
      let idx = pos.idx;

      this.points[idx].x = x;
      this.points[idx].y = y;

      this.findClosestPosition(this.$refs.board.$refs.allow, x, y, idx);
    },
    reset(idx) {
      if (idx !== this.prevIdex) {
        this.tempX = -9999;
        this.tempY = -9999;
      }
      this.tempWidth = this.points[idx].width;
      this.tempHeight = this.points[idx].height;
      this.prevIdex = idx;
    },
    selectPosition(idx) {
      const match = this.points[idx];
      match.x = this.tempX;
      match.y = this.tempY;
      match.width = this.tempWidth;
      match.height = this.tempHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.match-empty {
  border-radius: 25%;
}
</style>
