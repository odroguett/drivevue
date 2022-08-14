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
    debugger;
    if (largoMinimo > totalCaracteres) {
      mensaje = "Tamaño de campo menor que el aceptado";
    }
    return mensaje;
  }
}
module.exports = funciones;
