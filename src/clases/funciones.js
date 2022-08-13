class funciones {
  validaLargoCampo(largoMaximo, largoMinimo, totalCaracteres) {
    let mensaje = "";
    if (largoMaximo > totalCaracteres) {
      mensaje = "Tamaño de campo supera el maximo permitido";
      return mensaje;
    }
    if (largoMinimo < totalCaracteres) {
      mensaje = "Tamaño de campo menor que el aceptado";
      return mensaje;
    }
  }
}
module.exports = funciones;
