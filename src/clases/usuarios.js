import interceptor from "../compartido/jwt.interceptor";
import { oInstituciones } from "./Instituciones";
const funciones = require("../clases/funciones");

class Usuarios extends oInstituciones.Instituciones {
  oFunciones = new funciones();
  usuario = {
    id: Number,
    usuario: String,
    password: String,
    descripcion: String,
    activo: String,
    email: String,
    institucion_id: String,
    perfil: String,
  };
  listaActivos = [{ activo: "SI" }, { activo: "NO" }];
  listaUsuarios = [];
  inicializar() {
    this.usuario.usuario = "";
    this.usuario.activo = "SI";
    this.usuario.password = "";
    this.usuario.descripcion = "";
    this.usuario.activo = "";
    this.usuario.institucion_id = "";
    this.usuario.email = "";
    this.usuario.perfil = "administrador";
  }
  agregarUsuario() {
    this.mensajeError = "";
    if (this.usuario.activo === "") {
      this.usuario.activo = "SI";
    }
    let bError = this.validaDatosUsuario();
    console.log(bError);

    if (bError == false) {
      interceptor
        .post("/usuarios/crearUsuario", this.usuario)
        .then((response) => {
          if (response && response.data) {
          } else {
            if (response.status === "401") {
              alert("Error al obtener usuarios");
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
  async obtenerListaUsuarios(id) {
    await interceptor
      .get("usuarios/obtenerListaUsuarios", { params: { id: id } })
      .then((response) => {
        if (response.data.esValido) {
          this.listaUsuarios = response.data.objeto;
          return this.listaUsuarios;
        } else {
          alert("sin datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async obtenerUsuario(usuario) {
    await interceptor
      .get("usuarios/obtenerUsuario", { params: { usuario: usuario } })
      .then((response) => {
        if (response.data.esValido) {
          this.usuario.usuario = response.data.objeto[0].usuario;
          this.usuario.password = "";
          this.usuario.descripcion = response.data.objeto[0].descripcion;
          this.usuario.activo = response.data.objeto[0].activo;
          this.usuario.institucion_id = response.data.objeto[0].institucion_id;
          this.usuario.email = response.data.objeto[0].email;
        } else {
          alert("sin datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  eliminarUsuario(id) {
    interceptor
      .delete("/usuarios/eliminarUsuario?id=" + id)
      .then((response) => {
        if (response && response.data) {
        } else {
          if (response.status === "401") {
            alert("Error al eliminar Usuarios");
          }
        }
      })
      .catch((error) => {
        if (error.response !== undefined && error.response.status === "400") {
          alert("Error al obtener instituciones");
        }
      });
  }

  validaDatosUsuario() {
    let bError = false;
    return bError;
  }
}

export const oUsuarios = {
  Usuarios,
};
