<template>
  <div id="app">
    <RedactImage
      class="redact"
      ref="redacter"
      src="https://unsplash.it/400/400"
    />
    <div class="toolbar">
      <button @click="() => $refs.redacter.revert()">Revert</button>
      <button @click="save">Save</button>
    </div>
    <img
      height="400"
      width="400"
      v-if="saved"
      :src="saved"
    />
  </div>
</template>

<script>
import RedactImage from '../src/components/RedactImage.vue';

export default {
  name: 'app',
  components: {
    RedactImage,
  },
  data() {
    return {
      saved: null,
    };
  },
  methods: {
    save() {
      this.saved = this.$refs.redacter.canvas().toDataURL();
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#app > * + * {
  margin-bottom: 1em;
}
</style>
<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .redact >>> canvas {
  max-width: 300px;
} */
</style>
