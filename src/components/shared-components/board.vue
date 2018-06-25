<template>
  <div class="board-container">
    <div 
      v-for="(item, index) in row" 
      ref="allow"
      :class="item.uid" 
      :style="[item.style, {transform: item.style.translate}]"
      class="down" >
    </div>

    <div 
      v-for="(item, index) in map">
      <div 
        v-for="i in item"
        ref="inner"
        :style="[i.style, {transform: i.style.translate}]"
        class="inner">
      </div>
    </div>

    <div 
      v-for="(item, index) in col" 
      ref="allow" 
      :class="item.uid" 
      :style="[item.style, {transform: item.style.translate}]"
      class="across" >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    rowNumber: {
      type: Number,
      default: 0
    },
    colNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      row: [],
      col: [],
      map: [],
      inner: this.height
    };
  },
  mounted() {
    this.init();
    // this.map = new Array(this.rowNumber);
    // for (let i = 0; i < this.colNumber; i++) {
    //   this.map[i] = new Array(this.colNumber);
    // }
  },
  methods: {
    init() {
      let width = this.width;
      let height = this.height;
      let r = this.rowNumber;
      let c = this.colNumber;

      for (let i = 0; i < r; i++) {
        for (let j = 0; j < c + 1; j++) {
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

      this.map = new Array(this.rowNumber);
      for (let i = 0; i < this.rowNumber; i++) {
        this.map[i] = new Array(this.colNumber);
        for (let j = 0; j < this.colNumber; j++) {
          let t = i * (height + width) + width;
          let l = j * (height + width) + width;
          this.map[i][j] = {
            style: {
              translate: "translate(" + l + "px, " + t + "px)",
              width: this.inner + "px",
              height: this.inner + "px"
            }
          };
        }
      }

      for (let i = 0; i < r; i++) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.board-container {
  position: absolute;
  // width: 50%;
  // height: 50%;
  // left: calc(50% + #{$sidebar-width});
  // top: 50%;
  // transform: translate(-50%, -50%);
  .down,
  .inner,
  .across {
    position: absolute;
    background-color: white;
  }
  .inner {
    background: red;
  }
  // .cnt {
  //   position: absolute;
  // }
}
</style>
