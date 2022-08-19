class funciones {
  validaLargoMaximoCampo(largoMaximo, totalCaracteres) {
    let mensaje = "";
    console.log(largoMaximo);
    if (largoMaximo < totalCaracteres) {
      mensaje = "Tamaño de campo supera el maximo permitido";
    }
    return mensaje;
  }

  validaLargoMinimoCampo(largoMinimo, totalCaracteres) {
    let mensaje = "";
    if (largoMinimo > totalCaracteres) {
      mensaje = "Tamaño de campo menor que el aceptado";
    }
    return mensaje;
  }
  descargarArchivo(item) {
    const blob = new Blob([this.TransformarBase64aBlob(item.Byte)]);
    var fileURL = window.URL.createObjectURL(blob);
    var fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", item.NombreArchivo);
    document.body.appendChild(fileLink);
    fileLink.click();
  }
  TransformarBase64aBlob(byte) {
    const byteCharacters = atob(byte);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return byteArray;
  }
}
module.exports = funciones;
