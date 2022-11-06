import { createRouter, createWebHashHistory } from "vue-router";
const modules = import.meta.glob("../views/*/*.vue");
import indexView from "@/layout/index.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  // 滚动条行为
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/home",
      component: indexView,
      children: [],
    },

  ],
});

const addRoute = () => {
  for (const path in modules) {
    router.addRoute("layout", {
      path: `/${path.split("/")[2]}`,
      name: path.split("/")[2],
      component: modules[path],
    });
  }
};

addRoute();
export default router;
