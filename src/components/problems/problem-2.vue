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
      this.findClosestPosition(
        this.$refs.board.$refs.allow,
        pos.x,
        pos.y,
        pos.idx
      );
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
</style>
