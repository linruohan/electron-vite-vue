<script setup lang="ts">
</script>

<template>
  <router-view></router-view>
  <!-- <div class="WinContent">
    <router-view #default="{ route, Component }">
      <transition :enter-active-class="`animate__animated ${route.meta.transition}`">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div> -->
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; */
  color: #2c3e50;
}
</style>
