<template>
  <div id="app">
    <RedactImage src="https://unsplash.it/400/400" />
  </div>
</template>

<script>
import RedactImage from './components/RedactImage.vue';

export default {
  name: 'app',
  components: {
    RedactImage,
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
}
</style>
