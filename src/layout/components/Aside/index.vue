<template>
  <el-menu default-active="/home" class="aside" :router="true" :collapse="true">
    <div class="logo-wrap">
      <img src="@/assets/img/logo.png" alt="" width="48">
    </div>
    <el-menu-item index="/home">
      <el-icon>
        <svg-icon name="house" size="24" />
      </el-icon>
      <template #title>主页</template>
    </el-menu-item>
    <el-menu-item index="/login">
      <el-icon>
        <svg-icon name="trophy" size="24" />
      </el-icon>
      <template #title>用户登录</template>
    </el-menu-item>
    <el-menu-item index="/register">
      <el-icon>
        <svg-icon name="partition" size="24" />
      </el-icon>
      <template #title>注册</template>
    </el-menu-item>
    <el-menu-item index="/mycanlender">
      <el-icon>
        <svg-icon name="hot" size="24" />
      </el-icon>
      <template #title>mycanlender</template>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon>
        <svg-icon name="bangumi" size="24" />
      </el-icon>
      <template #title>用户信息</template>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon>
        <svg-icon name="guochuang1" size="24" />
      </el-icon>
      <template #title>关于</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loginDialog = ref(false)

// 显示扫描弹框
const showDialog = () => {
  loginDialog.value = true
}

defineExpose({ showDialog })

</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  -webkit-app-region: drag;
  // background: rgb(53, 54, 58) !important;
  // color: rgba(232, 234, 237, 1) !important;

  .logo-wrap {
    padding-top: 55px;
    padding-bottom: 30px;
    text-align: center;
  }

  .el-menu-item {
    -webkit-app-region: no-drag;
  }

  .el-menu-item:hover,
  .el-menu-tooltip__trigger:hover {
    color: rgb(53, 54, 58);
    background: rgb(97, 141, 207) !important;
  }

  .el-icon {
    color: rgb(232, 234, 237);
  }

  .el-icon:is-active {
    color: rgb(232, 106, 188);
  }

  .user {
    width: 63px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    -webkit-app-region: no-drag;

    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>
