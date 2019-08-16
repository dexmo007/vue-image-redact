<template>
  <div id="app">
    <div class="row wrap">
      <div class="col">
        Original
        <img
          style="max-width: 400px"
          :src="src"
        />
      </div>
      <div class="col">
        Editing
        <RedactImage
          class="redact"
          ref="redacter"
          max-width="400px"
          :src="src"
        />
        <div class="toolbar">
          <button @click="() => $refs.redacter.revert()">Revert</button>
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
    <img
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
      src: 'https://unsplash.it/400/400',
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
.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
}
.wrap {
  flex-wrap: wrap;
}
</style>
