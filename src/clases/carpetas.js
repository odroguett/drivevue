import interceptor from "../compartido/jwt.interceptor";

const funciones = require("../clases/funciones");
class Carpetas {
  oFunciones = new funciones();
  listaCarpetas = [];
  listaArchivos = [];
  idCarpeta;
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

  cargarArchivos(id, router) {
    router.push({
      name: "carpetas",
      params: { id: id },
    });
  }
  obtenerArchivos() {
    interceptor
      .get("archivos/obtenerArchivos", { params: { id: this.idCarpeta } })
      .then((response) => {
        if (response.data.esValido) {
          this.listaArchivos = response.data.objeto;
        } else {
          alert("sin datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  descargarArchivo(link) {
    interceptor
      .get("archivos/descargar",{ params: { id: link }, responseType: 'arraybuffer'  })
      
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.jpg");
        document.body.appendChild(fileLink);

        fileLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const oCarpetas = {
  Carpetas,
};
