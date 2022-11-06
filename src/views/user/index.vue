<template>
  <h3>你好 <span v-if="store.user.userInfo">{{ store.user.userInfo.name }}</span></h3>
</template>
<script setup lang="ts">
import store from '@/utils/store';
</script>
<style scoped>

</style>
