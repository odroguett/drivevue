import interceptor from "../compartido/jwt.interceptor";

const funciones = require("../clases/funciones");
class Carpetas {
  oFunciones = new funciones();
  listaCarpetas = [];
  listaCarpetaSelect = [];
  listaArchivos = [];
  idCarpeta;
  subirArchivo = [];
  value = "";
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

  ListaArchivos = [
    {
      descripcion: String,
      texto: String,
      id_carpeta: String,
      link: String,
      desactivar: String,
    },
  ];

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
    debugger;
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
    let bodyFormData = new FormData();
    this.archivo.id_carpeta = this.idCarpeta;
    debugger;

    bodyFormData.append("objectJSON", JSON.stringify(this.archivo));
    if(this.subirArchivo.length >0 )
    {
      if (this.subirArchivo.length == 1) {
        this.subirArchivo.forEach((element) => {
          bodyFormData.append("archivo", element);
          interceptor
            .post("archivos/subir", bodyFormData)
            .then((response) => {})
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        this.subirArchivo.forEach((element) => {
          console.log(element);
          bodyFormData.append("archivos", element);
        });
        interceptor
          .post("archivos/subirListaArchivos", bodyFormData)
          .then((response) => {})
          .catch((err) => {
            console.log(err);
          });
      }

    }
    else
    {
      alert("debe seleccionar archivo");
    }
    
  }
  eliminar(id) {
    
    alert(id);
    
   // interceptor.
   // delete("archivos/eliminarArchivo",{params: {id:id}})
   // .then(response => {})
   // .catch((err) => { console.log(err)});
  }

  eliminarCarpeta(id) {
    debugger;
    interceptor.
    delete("carpetas/eliminarCarpeta",{params: {id:id}})
    .then(response => {})
    .catch((err) => { console.log(err)});
  }
}

export const oCarpetas = {
  Carpetas,
};
