<template>
  <el-menu :default-openeds="defaultOpeneds" :default-active="$route.fullPath" :unique-opened="true"
    :active-text-color="themeColor" router :collapse="isCollapse">
    <template v-for="item in menus" :key="item.id">
      <sidebar-item :item-data="item" v-if="!item?.hidden"></sidebar-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { T } from '@fullcalendar/core/internal-common';
import SidebarItem from './SidebarItem.vue'
import { reactive, inject, ref, onMounted } from 'vue'

import { useRouter } from 'vue-router';
const router = useRouter()
const menus = ref([
  {
    id: 1, title: "首页", path: '/home', hidden: false, icon: "house",
  }, {
    id: 3, title: "注册", path: '/register', hidden: false, icon: "partition",
  }, {
    id: 4, title: "日历", path: '/mycanlender', hidden: false, icon: "hot",
  }, {
    id: 5, title: "用户", path: '/user', hidden: false, icon: "bangumi",
  }, {
    id: 6, title: "关于", path: '/about', hidden: false, icon: "guochuang1",
  },
])
const isCollapse: boolean | undefined = inject('isCollapse')
const themeColor = ref('')
onMounted(() => {
  themeColor.value =
    document.documentElement.style.getPropertyValue('--color-primary')
})

// 默认展开
const defaultOpeneds: any[] = reactive([])
const findActive = (menus: any) => {
  menus = Array.from(menus);
  menus.forEach((item: any) => {
    if (item.children && item.children[0]) {
      findActive(item.children)
    } else {
      if (item.path === router.currentRoute.value.path) {
        defaultOpeneds.push(item.id)
      }
    }
  })
}
findActive(menus.value)

// 菜单排序
const sortMenus = (menus: any) => {
}
sortMenus(menus)
</script>
<style scoped></style>
