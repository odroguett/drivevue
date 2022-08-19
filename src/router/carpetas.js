import carpetas from "../views/carpetas.vue";

const routes = [
  {
    path: "/carpetas/:id?",
    name: "carpetas",
    component: carpetas,
    props: true,
    meta: { requiredAuth: true },
  },
];

export default routes;
