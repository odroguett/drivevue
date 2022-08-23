import interceptor from "../compartido/jwt.interceptor";

const funciones = require("../clases/funciones");
class Carpetas {
  oFunciones = new funciones();
  listaCarpetas = [];
  listaArchivos = [];
  idCarpeta;
  subirArchivo = [];
  carpeta = {
    nombre: String,
    usuario: String,
  };
  archivo = {
    descripcion: String,
    texto: String,
    id_carpeta: String,
    link: String,
    desactivar: String,
  };

  inicializarDatos() {
    this.carpeta.nombre = "";
    this.carpeta.usuario = "";
    this.archivo.descripcion = "";
    this.archivo.texto = "";
    this.archivo.id_carpeta = "";
    this.archivo.link = "";
    this.archivo.desactivar = "NO";
  }

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
      .get("archivos/descargar", {
        params: { id: link },
        responseType: "arraybuffer",
      })

      .then((response) => {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.zip");
        document.body.appendChild(fileLink);

        fileLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  subir() {
    var bodyFormData = new FormData();
    /* let json = {
      descripcion: "Pago pensiones versión 2022.04.05",
      texto: " Modulo por pruebas ",
      id_carpeta: "62fd74e8723c7046ad7b78b9",
      link: "",
      //numero: "100",
      // desactivar: "NO",
      //  nombre: "",
    }; */

    this.archivo.id_carpeta = this.idCarpeta;
    debugger;

    bodyFormData.append("objectJSON", JSON.stringify(this.archivo));
    this.subirArchivo.forEach((element) => {
      bodyFormData.append("archivo", element);
      interceptor
        .post("archivos/subir", bodyFormData)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  subirArchivo() {}
}

export const oCarpetas = {
  Carpetas,
};
