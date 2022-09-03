const archiver = require("archiver");
const fs = require("fs");

class Utilitarios {
  comprimirZip(idArchivo) {
    try {
      const dirPath = "./archivos/";
      const dirPathZip = "./archivos/zip/";
      let archivo = dirPathZip + "comprimido.zip";
      let writestream = fs.createWriteStream(archivo);
      let archive = archiver("zip");
      archive.pipe(writestream);
      archive.append(fs.createReadStream(dirPath + idArchivo), {
        name: idArchivo,
      });
      writestream.on("close", () => {
      });
      archive.finalize();
    } catch (error) {
      console.log(error);
    }
  }
}
