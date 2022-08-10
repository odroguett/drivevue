import instituciones from "../views/instituciones.vue";

const routes = [
  {
    path: "/instituciones",
    name: "instituciones",
    component: instituciones,
    meta: { requiredAuth: false },
  },
];

export default routes;
