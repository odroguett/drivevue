import axios from "axios";
import constantes from "../variablesEntorno/constantes.js";

const jwtInterceptor = axios.create({});

console.log(constantes.baseURL);
jwtInterceptor.defaults.baseURL = "http://localhost:3000/api";
jwtInterceptor.interceptors.request.use(
  (request) => {
    const auth_token = localStorage.getItem("auth_token");
    const auth_usuario = localStorage.getItem("auth_usuario");
    if (auth_token) {
      request.headers.Autorization = `Bearer ${auth_token}`;
    }
    if (auth_usuario) {
      request.headers["auth_usuario"] = `${auth_usuario}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

jwtInterceptor.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 400) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("auth_usuario");
      window.location.href = "/Login";
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;