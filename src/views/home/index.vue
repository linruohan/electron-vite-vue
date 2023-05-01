<!-- 主页页面 -->
<template>
  <h1>主页</h1>
  <a href="https://www.baidu.com" target="_blank">adsfasdfasdfsa</a>
  <div>
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="@/assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="flex-center">
    Place static files into the <code>/public</code> folder
    <img style="width:5em;" src="/node.svg" alt="Node logo">
  </div>
</template>

<script lang="ts" setup>
console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>