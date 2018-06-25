export const Tracking = {
  methods: {
    findClosestPosition(candidates, targetX, targetY, idx) {
      let target;
      let sx = this.startPosition.x;
      let sy = this.startPosition.y;
      this.min = 99999999999;
      candidates.forEach((candidate, i) => {
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
      const point = this.points[idx];

      point.width = rect.width;
      point.height = rect.height;

      this.tempX = rect.left - this.startPosition.x;
      this.tempY = rect.top - this.startPosition.y;
      this.tempWidth = rect.width;
      this.tempHeight = rect.height;

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
