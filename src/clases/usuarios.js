import interceptor from "../compartido/jwt.interceptor";
import { oInstituciones } from "./Instituciones";
const funciones = require("../clases/funciones");

class Usuarios extends oInstituciones.Instituciones {
  oFunciones = new funciones();
  usuario = {
    ID: Number,
    USUARIO: String,
    PASSWORD: String,
    DESCRIPCION: String,
    ACTIVO: String,
    EMAIL: String,
    ID_COMPANIA: String,
  };
  listaActivos = [{ activo: "SI" }, { activo: "NO" }];
  inicializar() {
    this.usuario.ACTIVO = "SI";
  }
  agregarUsuarios() {
    this.mensajeError = "";
    let bError = this.validaDatos();
    console.log(bError);

    if (bError == false) {
      interceptor
        .post("/usuarios/crearUsuario", this.usuario)
        .then((response) => {
          if (response && response.data) {
          } else {
            if (response.status === "401") {
              alert("Error al obtener instituciones");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener instituciones");
          }
        });
    }
  }
}
export const oUsuarios = {
  Usuarios,
};
