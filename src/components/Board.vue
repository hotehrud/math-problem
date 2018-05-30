<template>
  <div class="board-container">
    <div class="cnt">{{ squareCount }}</div>
    <div v-for="(item, index) in row" ref="allow" class="down" :class="item.uid" :style="[item.style, {transform: item.style.translate}]">
    </div>

    <div v-for="(item, index) in col" ref="allow" class="across" :class="item.uid" :style="[item.style, {transform: item.style.translate}]">
    </div>

    <match v-for="(item, index) in points" :key="index" ref="match" :idx="index" :x="item.x" :y="item.y" :width="item.width" :height="item.height" />

  </div>
</template>

<script>
let moving = false;

import match from "@/components/shared-components/match";

let width = 20;
let height = 60;
let r = 6;
let c = 6;

export default {
  name: "Board",
  props: [],
  components: {
    match
  },
  data() {
    return {
      squareCount: 0,
      limit: 2,
      currentTarget: -1,
      width: 20,
      height: 60,
      mouseX: 0,
      mouseY: 0,
      min: 99999999999,
      prevTarget: null,
      row: [],
      col: [],
      startPos: {
        top: 0,
        left: 0
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
  created() {
    this.$on("matchClick", this.matchClick);

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        let t = i * (height + width) + width;
        let l = j * (height + width);

        this.row.push({
          uid: i + "" + j + "" + i + "" + (j + 1),
          style: {
            translate: "translate(" + l + "px, " + t + "px)",
            width: width + "px",
            height: height + "px"
          }
        });
      }
    }

    for (let i = 0; i < r - 1; i++) {
      for (let j = 0; j < c + 1; j++) {
        let t = j * height;
        let l = i * (height + width) + width;

        if (j > 0 && j < c + 1) {
          t += width * j;
        }

        this.col.push({
          uid: j + "" + i + "" + (j + 1) + "" + i,
          style: {
            translate: "translate(" + l + "px, " + t + "px)",
            width: height + "px",
            height: width + "px"
          }
        });
      }
    }
  },
  mounted() {
    // 성냥맵 위치 파악
    let rect = this.$el.getBoundingClientRect();
    this.startPos.top = rect.top;
    this.startPos.left = rect.left;
  },
  methods: {
    matchClick(idx) {
      this.currentTarget = idx;
      if (moving) {
        // 성냥 배치
        document.removeEventListener("mousemove", this.move);
        moving = !moving;
        this.tracking(idx, false);
        return;
      } else {
        // 성냥 이동
        this.tracking(idx, true);
        this.squareCount = 0;
        moving = !moving;

        document.addEventListener("mousemove", this.move);
      }
    },
    move(e) {
      // 레이아웃에 따른 위치 조절
      this.points[this.currentTarget].x = e.clientX - this.startPos.left;
      this.points[this.currentTarget].y = e.clientY - this.startPos.top;
    },
    check() {
      // 세로 막대기만을 기준으로 사각형 판단
      --this.limit;
      let last = height * (c - 1) + width * (c - 1);
      const array = [
        { x: width * 1 + height * 1, y: width * 3 + height * 2 },
        { x: width * 3 + height * 3, y: width * 3 + height * 2 },
        { x: width * 0 + height * 0, y: width * 4 + height * 3 },
        { x: width * 2 + height * 2, y: width * 4 + height * 3 }
      ];
      array.forEach(v => {
        let temp = 0;
        this.points.forEach(vv => {
          if (v.x === vv.x && v.y === vv.y) return;
          if (v.x + width === vv.x) {
            if (v.y - width === vv.y) {
              // up
              ++temp;
            }
            if (v.y + height === vv.y) {
              // down
              ++temp;
            }
          }
          if (v.x + width + height === vv.x && v.y === vv.y) {
            // right
            ++temp;
          }
        });

        if (temp === 3) {
          ++this.squareCount;
        }
      });

      if (this.squareCount === 4 && this.limit === 0) {
        alert("SUCCESS");
        return;
      }
      if (this.limit === 0) {
        alert("END");
      }
    },
    tracking(idx, start) {
      // start === true ? move : fix
      if (!start) {
        document.removeEventListener("mousemove", this.mouseUpdate);
        document.removeEventListener("mouseenter", this.mouseUpdate);
        if (this.prevTarget) {
          let point = this.prevTarget.getBoundingClientRect();
          this.points[idx].width = point.width;
          this.points[idx].height = point.height;
          this.points[idx].x = point.left - this.startPos.left;
          this.points[idx].y = point.top - this.startPos.top;
        }
        this.check();
      } else {
        let x = null;
        let y = null;

        document.addEventListener("mousemove", this.mouseUpdate, false);
        document.addEventListener("mouseenter", this.mouseUpdate, false);
      }
    },
    mouseUpdate(e) {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
      this.closest();
    },
    closest() {
      let target;
      this.min = 99999999999;
      this.$refs.allow.forEach((candidate, i) => {
        let point = candidate.getBoundingClientRect();
        // 이미 성냥이 있는 곳은 제외
        if (
          !this.isExist(
            point.x - this.startPos.left,
            point.y - this.startPos.top
          )
        ) {
          let temp = distance(point.x, point.y, this.mouseX, this.mouseY);
          if (this.min > temp) {
            this.min = temp;
            target = candidate;
          }
        }
      });

      if (this.prevTarget) {
        this.prevTarget.style.backgroundColor = "white";
      }

      target.style.backgroundColor = "gray";
      this.prevTarget = target;

      function distance(cx, cy, mx, my) {
        return (mx - cx) * (mx - cx) + (my - cy) * (my - cy);
      }
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
.board-container {
  position: absolute;
  width: 50%;
  height: 50%;
  left: calc(50% + #{$sidebar-width});
  top: 50%;
  transform: translate(-50%, -50%);
  .down,
  .across {
    position: absolute;
    background-color: white;
  }
  .cnt {
    position: absolute;
  }
}
</style>
