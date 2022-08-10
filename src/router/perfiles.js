import perfiles from "../views/perfiles.vue";

const routes = [
  {
    path: "/perfiles",
    name: "perfiles",
    component: perfiles,
    meta: { requiredAuth: false },
  },
];
export default routes;
