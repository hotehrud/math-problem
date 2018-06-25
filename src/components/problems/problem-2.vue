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
      v-on:move="move"
      v-on:batch="selectPosition"
      :key="index" ref="match" 
      :idx="index" 
      :startX="startPosition.x" 
      :startY="startPosition.y" 
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
import Match from "@/components/shared-components/Match";

let width = 20;
let height = 60;
let row = 6;
let col = 6;
export default {
  components: {
    Match
  },
  data() {
    return {
      width: width,
      height: height,
      row: row,
      col: col,
      tempX: 0,
      tempY: 0,
      tempWidth: width,
      tempHeight: height,
      startPosition: {
        x: 0,
        y: 0
      },
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
  mounted() {
    let rect = this.$el.getBoundingClientRect();
    this.startPosition.x = rect.left;
    this.startPosition.y = rect.top;
  },
  methods: {
    move(pos) {
      this.findClosestPosition(pos.x, pos.y, pos.idx);
    },
    findClosestPosition(targetX, targetY, idx) {
      let target;
      let sx = this.startPosition.x;
      let sy = this.startPosition.y;
      this.min = 99999999999;
      this.$refs.board.$refs.allow.forEach((candidate, i) => {
        let point = candidate.getBoundingClientRect();
        let x = point.x - sx;
        let y = point.y - sy;

        if (!this.isExist(x, y)) {
          let temp = distance(x, y, targetX, targetY);
          if (this.min > temp) {
            this.min = temp;
            target = candidate;
          }
        }
      });

      const rect = target.getBoundingClientRect();
      const match = this.points[idx];

      match.width = rect.width;
      match.height = rect.height;

      this.tempX = rect.left - this.startPosition.x;
      this.tempY = rect.top - this.startPosition.y;
      this.tempWidth = rect.width;
      this.tempHeight = rect.height;

      function distance(cx, cy, mx, my) {
        return (mx - cx) * (mx - cx) + (my - cy) * (my - cy);
      }
    },
    selectPosition(idx) {
      const match = this.points[idx];
      match.x = this.tempX;
      match.y = this.tempY;
      match.width = this.tempWidth;
      match.height = this.tempHeight;
    },
    isExist(x, y) {
      for (let i in this.points) {
        let v = this.points[i];
        if (v.x === x && v.y === y) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
