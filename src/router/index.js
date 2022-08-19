import { createRouter, createWebHistory } from "vue-router";
import loginRouter from "./login";
import home from "../views/home.vue";
import instituciones from "./instituciones";
import usuarios from "./usuarios";
import perfiles from "./perfiles";
import carpetas from "./carpetas";

const routes = [
  ...loginRouter,
  ...instituciones,
  ...usuarios,
  ...perfiles,
  ...carpetas,
  {
    path: "/",
    name: "home",
    component: home,
    meta: { requiredAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  let isAuthenticated = localStorage.getItem("isAuthenticated") || false;
  if (to.meta.requiredAuth && !isAuthenticated) {
    return { path: "/login" };
  }
});

export default router;
