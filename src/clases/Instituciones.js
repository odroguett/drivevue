import interceptor from "../compartido/jwt.interceptor";

const funciones = require("../clases/funciones");

class Instituciones {
  oFunciones = new funciones();
  mensajeError = "";
  listaInstituciones = [];
  institucion = {
    id: "",
    descripcion: "",
    RUT: "",
  };

  obtenerListaInstituciones() {
    interceptor
      .get("/instituciones/obtenerListaInstituciones")
      .then((response) => {
        if (response && response.data) {
          response = response.data.objeto;
          response.forEach((element) => {
            this.listaInstituciones.push(element);
          });
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
  agregarInstitucion() {
    this.mensajeError = "";
    let bError = this.validaDatos();
    console.log(bError);

    if (bError == false) {
      interceptor
        .post("/instituciones/crearInstitucion", this.institucion)
        .then((response) => {
          if (response && response.data) {
            this.limpiarInstituciones();
            this.obtenerListaInstituciones();
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

  tipoProceso(tipoProceso, id, descripcion, RUT) {
    if (tipoProceso === "M") {
      this.institucion.id = id;
      this.institucion.descripcion = descripcion;
      this.institucion.RUT = RUT;
    } else {
      this.institucion.id = "";
      this.institucion.descripcion = "";
      this.institucion.RUT = "";
    }
    this.mensajeError = "";
  }

  actualizarInstitucion() {
    interceptor
      .patch(
        "/instituciones/actualizarInstitucion?id=" + this.institucion.id,
        this.institucion
      )
      .then((response) => {
        if (response && response.data) {
          this.limpiarInstituciones();
          this.obtenerListaInstituciones();
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

  eliminarInstitucion(id) {
    this.institucion.id = id;
    interceptor
      .delete("/instituciones/eliminarInstitucion?id=" + this.institucion.id)
      .then((response) => {
        if (response && response.data) {
          this.limpiarInstituciones();
          this.obtenerListaInstituciones();
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
  limpiarInstituciones() {
    for (let index = 0; index < this.listaInstituciones.length; index++) {
      this.listaInstituciones.splice(index);
    }
  }
  validaDatos() {
    let bError = false;
    let mensaje = "";
    // eslint-disable-next-line prettier/prettier
    mensaje = this.oFunciones.validaLargoMinimoCampo(3,this.institucion.id.length);
    if (mensaje != "") {
      bError = true;
      this.mensajeError = mensaje;
    }

    mensaje = this.oFunciones.validaLargoMinimoCampo(
      6,
      this.institucion.descripcion.length
    );
    if (mensaje != "") {
      bError = true;
      this.mensajeError = mensaje;
    }
    mensaje = this.oFunciones.validaLargoMinimoCampo(
      6,
      this.institucion.RUT.length
    );
    if (mensaje != "") {
      bError = true;
      this.mensajeError = mensaje;
    }
    return bError;
  }
}
export const oInstituciones = {
  Instituciones,
};
