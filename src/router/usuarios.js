import usuarios from "../views/usuarios.vue";

const routes = [
  {
    path: "/usuarios",
    name: "usuarios",
    component: usuarios,
    meta: { requiredAuth: false },
  },
];

export default routes;
