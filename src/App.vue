<script setup lang="ts">
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

a:-webkit-any-link {
  color: rgb(119 119 255);
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
  background: rgb(53, 54, 58);
  color: rgba(232, 234, 237, 1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; */
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
