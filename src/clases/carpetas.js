import interceptor from "../compartido/jwt.interceptor";
class Carpetas {
  listaCarpetas = [];
  carpeta = {
    nombre: String,
    usuario: String,
  };

  agregarCarpeta() {
    let bError = this.validaDatosCarpeta();
    if (bError == false) {
      interceptor
        .post("/carpetas/crearCarpeta", this.carpeta)
        .then((response) => {
          if (response && response.data) {
          } else {
            if (response.status === "401") {
              alert("Error al crear carpeta");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener carpeta");
          }
        });
    }
  }

  async obtenerListaCarpetas(usuario) {
    debugger;
     await interceptor
      .get("carpetas/obtenerListaCarpetas", { params: { usuario: usuario } })
      .then((response) => {
        if (response.data.esValido) {
          
          this.listaCarpetas = response.data.objeto;
        } else {
          alert("sin datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validaDatosCarpeta() {
    let bError = false;
    return bError;
  }
}

export const oCarpetas = {
  Carpetas,
};
