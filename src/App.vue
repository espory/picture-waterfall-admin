<template>
  <div id="app">
    <HeaderPart />
    <router-view />
  </div>
</template>

<script>
import HeaderPart from "./components/HeaderPart.vue";
export default {
  name: "App",
  components: {
    HeaderPart,
  },
};
</script>
<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
