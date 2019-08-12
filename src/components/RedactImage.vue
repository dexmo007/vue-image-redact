<template>
  <div>
    <img
      ref="image"
      :src="src"
      @load="imageLoaded"
    >
    <canvas
      ref="canvas"
      style="border: 2px solid black"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      tabindex="1"
      @keyup.delete="deleteActives"
    ></canvas>
    <button @click="revert">Revert</button>
  </div>
</template>

<script>
export default {
  name: 'RedactImage',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      holding: false,
      drawing: false,
      moving: null,
      actives: [],
      rects: [],
    };
  },
  methods: {
    imageLoaded() {
      const { canvas, image } = this.$refs;
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    },
    renderCanvas() {
      const { canvas, image } = this.$refs;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (this.rects.length > 0) {
        this.rects.forEach(({ topLeft, width, height }) => {
          ctx.beginPath();
          ctx.rect(topLeft.x, topLeft.y, width, height);
          ctx.fillStyle = 'black';
          ctx.fill();
        });
      }
    },
    isWithinRect(e, rect) {
      function between(x, n, m) {
        if (n < m) {
          return x >= n && x <= m;
        }
        return x >= m && x <= n;
      }
      return (
        between(e.offsetX, rect.topLeft.x, rect.topLeft.x + rect.width) &&
        between(e.offsetY, rect.topLeft.y, rect.topLeft.y + rect.height)
      );
    },
    getIntersectingRects(e) {
      return this.rects
        .map((rect, index) => ({ rect, index }))
        .filter(({ rect }) => this.isWithinRect(e, rect))
        .map(({ index }) => index);
    },
    mousedown(e) {
      this.holding = true;
      this.actives = this.getIntersectingRects(e);
      if (this.actives.length > 0) {
        this.moving = this.actives;
        return;
      }
      this.drawing = true;
      this.rects.push({
        topLeft: {
          x: e.offsetX,
          y: e.offsetY,
        },
        width: 0,
        height: 0,
      });
    },
    mousemove(e) {
      if (!this.holding) {
        return;
      }
      if (this.moving) {
        this.moving.forEach((index) => {
          this.rects[index].topLeft.x += e.movementX;
          this.rects[index].topLeft.y += e.movementY;
        });
        this.renderCanvas();
        return;
      }
      const rect = this.rects[this.rects.length - 1];
      rect.width = e.offsetX - rect.topLeft.x;
      rect.height = e.offsetY - rect.topLeft.y;
      this.renderCanvas();
    },
    mouseup() {
      this.holding = false;
      this.drawing = false;
      this.moving = null;
      const last = this.rects[this.rects.length - 1];
      if (last.width === 0 || last.height === 0) {
        this.rects.pop();
      }
    },
    revert() {
      this.rects.pop();
      this.renderCanvas();
    },
    deleteActives() {
      console.log('deleting', this.actives);
      if (this.actives.length === 0) {
        return;
      }

      this.rects = this.rects.filter(
        (rect, index) => !this.actives.includes(index)
      );
      this.renderCanvas();
    },
  },
};
</script>

<style scoped>
</style>
