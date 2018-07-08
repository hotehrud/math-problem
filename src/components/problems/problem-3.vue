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
      ref="piece"
      v-on:move="move"
      v-on:batch="selectPosition"
      v-on:onClickEvent="reset"
      :key="index"
      :idx="index" 
      :x="item.x" 
      :y="item.y"
      :width="item.width">
      <img slot="image" src="../../assets/coin.png">
    </piece>

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

import image from "../../assets/coin.png";

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
      prevX: 0,
      prevY: 0,
      removeIndex: -1,
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
    reset(obj) {
      let idx = obj.idx;
      this.prevX = obj.x;
      this.prevY = obj.y;
      if (idx !== this.prevIdex) {
        this.tempX = -9999;
        this.tempY = -9999;
      }
      this.tempX = this.prevX;
      this.tempY = this.prevY;
      this.prevIdex = idx;
    },
    selectPosition(idx) {
      const piece = this.points[idx];
      piece.x = this.tempX;
      piece.y = this.tempY;
      piece.width = this.tempWidth;
      piece.height = this.tempHeight;

      if (this.prevX !== this.tempX || this.prevY !== this.tempY) {
        // remove coin
        const removeIdx = this.findRemoveCoin(
          this.prevX,
          this.prevY,
          this.tempX,
          this.tempY
        );
        if (removeIdx > -1) {
          for (let i in this.points) {
            const item = this.points[i];
          }
          const removeCoin = this.points[removeIdx];
          removeCoin.x = -9999;
          removeCoin.y = -9999;
        }
      }
    },
    isPossible(x, y) {
      if (this.prevX === x && this.prevY === y) {
        return true;
      }
      // already exist
      for (let i in this.points) {
        let v = this.points[i];
        if (v.x === x && v.y === y) {
          return false;
        }
      }
      // prevX => current coin, x => candidate in board
      let absX = Math.abs(this.prevX - x);
      let absY = Math.abs(this.prevY - y);
      let dist = (this.height + this.width) * 2;

      // 2 exceed
      if (absX > dist || absY > dist) {
        return false;
      }

      if (
        (absX === dist && absY === 0) ||
        (absY === dist && absX === 0) ||
        (absX === dist && absY === dist)
      ) {
        // line direction, diagonal
        if (this.checkCoin(x, y)) {
          return true;
        }
        return false;
      }

      return false;
    },
    checkCoin(x, y) {
      const idx = this.findRemoveCoin(this.prevX, this.prevY, x, y);
      if (idx > -1) {
        return true;
      } else {
        return false;
      }
    },
    findRemoveCoin(ax, ay, bx, by) {
      // ax,ay => currentPosition, bx,by => movePosition
      let dist = this.height + this.width;
      let betweenX = this.prevX;
      let betweenY = this.prevY;

      if (ax > bx) {
        // left
        betweenX = ax - dist;
        if (ay < by) {
          // bottom
          betweenY += dist;
        } else if (ay > by) {
          // top
          betweenY -= dist;
        } else {
          betweenY += 0;
        }
      } else if (ax < bx) {
        // right
        betweenX = ax + dist;
        if (ay < by) {
          // bottom
          betweenY += dist;
        } else if (ay > by) {
          // top
          betweenY -= dist;
        } else {
          betweenY += 0;
        }
      } else {
        if (ay < by) {
          betweenY += dist;
        } else {
          betweenY -= dist;
        }
      }

      for (let i in this.points) {
        const item = this.points[i];
        if (item.x === betweenX && item.y === betweenY) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.match-empty {
  border-radius: 25%;
}
</style>
