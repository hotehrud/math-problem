export const Tracking = {
  data() {
    return {
      startPosition: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      let rect = this.$refs.board.$el.getBoundingClientRect();
      this.startPosition.x = rect.left;
      this.startPosition.y = rect.top;
    });
  },
  methods: {
    findClosestPosition(candidates, targetX, targetY, idx) {
      let target;
      this.min = 99999999999;
      candidates.forEach((candidate, i) => {
        let point = candidate.getBoundingClientRect();
        let x = point.x;
        let y = point.y;

        if (!this.isExist(x, y)) {
          let temp = distance(x, y, targetX, targetY);
          if (this.min > temp) {
            this.min = temp;
            target = candidate;
          }
        }
      });

      const rect = target.getBoundingClientRect();
      const point = this.points[idx];

      point.width = rect.width;
      point.height = rect.height;

      this.tempX = rect.left;
      this.tempY = rect.top;
      this.tempWidth = rect.width;
      this.tempHeight = rect.height;

      function distance(cx, cy, mx, my) {
        return (mx - cx) * (mx - cx) + (my - cy) * (my - cy);
      }
    },
    isExist(x, y) {
      for (let i in this.points) {
        let v = this.points[i];
        let vx = v.x + this.startPosition.x;
        let vy = v.y + this.startPosition.y;
        if (vx === x && vy === y) {
          return true;
        }
      }
      return false;
    }
  }
};
