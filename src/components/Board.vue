<template>
  <div class="board-container">
    <div
      v-for="(item, index) in row"
      ref="allow"
      class="down"
      :class="item.uid"
      :style="item.style">
    </div>

    <div
      v-for="(item, index) in col"
      ref="allow"
      class="across"
      :class="item.uid"
      :style="item.style">
    </div>

    <match
      v-for="(item, index) in points"
      :key="index"
      ref="match"
      :idx="index"
      :x="item.x"
      :y="item.y"
      :width="item.width"
      :height="item.height"/>

  </div>
</template>

<script>
let moving = false;

import match from "@/components/unit/match";

let width = 20;
let height = 60;
let r = 5;
let c = 5;

export default {
  name: "Board",
  props: [],
  components: {
    match
  },
  data() {
    return {
      currentTarget: -1,
      width: 20,
      height: 60,
      mouseX: 0,
      mouseY: 0,
      min: 99999999999,
      prevTarget: null,
      row: [],
      col: [],
      points: [
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
          x: height * 2 + width * 3,
          y: height * 3 + width * 3,
          width: height,
          height: width
        },
        {
          x: height * 1 + width * 2,
          y: height * 3 + width * 3,
          width: height,
          height: width
        }
      ]
    };
  },
  created() {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        let t = i * (height + width) + width;
        let l = j * (height + width);

        this.row.push({
          uid: i + "" + j + "" + i + "" + (j + 1),
          style: {
            position: "absolute",
            backgroundColor: "red",
            top: t + "px",
            left: l + "px",
            width: this.width + "px",
            height: this.height + "px"
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
            position: "absolute",
            backgroundColor: "red",
            top: t + "px",
            left: l + "px",
            width: this.height + "px",
            height: this.width + "px"
          }
        });
      }
    }
  },
  methods: {
    matchClick(idx) {
      this.currentTarget = idx;

      if (moving) {
        document.removeEventListener("mousemove", this.move);
        moving = !moving;
        this.tracking(idx, false);
        return;
      }

      this.tracking(idx, true);
      moving = !moving;

      document.addEventListener("mousemove", this.move);
    },
    move(e) {
      this.points[this.currentTarget].x = e.clientX - 10;
      this.points[this.currentTarget].y = e.clientY - 10;
    },
    check() {
      this.points.forEach(v => {
        console.log(v);
      });
    },
    tracking(idx, start) {
      if (!start) {
        document.removeEventListener("mousemove", this.mouseUpdate);
        document.removeEventListener("mouseenter", this.mouseUpdate);

        let point = this.prevTarget.getBoundingClientRect();
        this.points[idx].width = point.width;
        this.points[idx].height = point.height;
        this.points[idx].x = point.left;
        this.points[idx].y = point.top;

        this.check();
        return;
      }

      let x = null;
      let y = null;

      document.addEventListener("mousemove", this.mouseUpdate, false);
      document.addEventListener("mouseenter", this.mouseUpdate, false);
    },
    mouseUpdate(e) {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;

      this.find();
    },
    find() {
      let target;
      this.min = 99999999999;
      this.$refs.allow.forEach((candidate, i) => {
        let temp = this.distance(
          candidate.style.top.slice(0, -2),
          candidate.style.left.slice(0, -2),
          this.mouseX,
          this.mouseY
        );
        if (this.min > temp) {
          this.min = temp;
          target = candidate;
        }
      });

      if (this.prevTarget) {
        this.prevTarget.style.backgroundColor = "red";
      }

      target.style.backgroundColor = "blue";
      this.prevTarget = target;
    },
    distance(cy, cx, mx, my) {
      return (mx - cx) * (mx - cx) + (my - cy) * (my - cy);
    }
  }
};
</script>

<style lang="scss" scoped>
.board-container {
}
</style>
