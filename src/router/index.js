import { createRouter, createWebHistory } from "vue-router";
import loginRouter from "./login";
import home from "../views/home.vue";

//import login from "../components/login.vue";

//import HomeView from '../views/HomeView.vue'

const routes = [
  ...loginRouter,
  {
    path: "/",
    name: "home",
    component: home,
    meta: { requiredAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  let isAuthenticated = localStorage.getItem("isAuthenticated") || false;
  if (to.meta.requiredAuth && !isAuthenticated) {
    return { path: "/login" };
  } else {
    if (isAuthenticated) {
      return { path: "/" };
    }
  }
});

export default router;
