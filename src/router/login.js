import login from "../components/login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { requiredAuth: false },
  },
];

export default routes;
