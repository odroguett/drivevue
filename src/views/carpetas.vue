<template>
  <body>
    <panel>
      <panel-body>
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a href="#" class="navbar-brand">
                <img src="/examples/images/logo.svg" height="28" alt="Drive" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarScroll">
                <ul
                  class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                  style="--bs-scroll-height: 100px"
                >
                  <div class="col-md-6">
                    <li class="nav-item">
                      <router-link to="/">
                        <button class="btn btn-outline-secondary">Home</button>
                      </router-link>
                    </li>
                  </div>

                  <li class="nav-item">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Agregar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div class="container">
          <hr />
          <div class="row">
            <div
              class="col-md-3"
              v-for="(value, key) in oCarpeta.listaArchivos"
            >
              <div class="card" style="width: 18rem">
                <img src="" class="card-img-top" alt="" />

                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">Imagen Aca</div>
                    <div class="col-md-6">
                      <div class="btn-group dropend" style="margin-left: 20px">
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Acciones
                        </button>
                        <ul
                          class="dropdown-menu dropdown-menu-dark"
                          aria-labelledby="navbarDarkDropdownMenuLink"
                        >
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              @click="oCarpeta.descargarArchivo(value.link)"
                              >Descargar</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              @click="oCarpeta.eliminar(link)"
                              >Eliminar</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              @click="copiarLinK(value.link)"
                              >Copiar Enlace</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#compartir"
                              href="#"
                              >Compartir</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <h5 class="card-title">Numero Paquete: {{ value.numero }}</h5>
                  <p class="card-text">Descripcion: {{ value.descripcion }}</p>
                  <p class="card-text">Texto: {{ value.texto }}</p>
                  <br />
                  <div class="dropdown"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </panel-body>
    </panel>
  </body>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agregar Compañia</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            class="form-control text-warning"
            style="border: 0"
            disabled
            placeholder=""
          />
          <br />
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Descripcion"
              v-model="oCarpeta.archivo.descripcion"
            />
          </div>
          <div class="form-group">
            <div class="mb-3">
              <label
                for="exampleFormControlTextarea1"
                class="form-label"
              ></label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="oCarpeta.archivo.texto"
              ></textarea>
            </div>
            <br />
          </div>
          <div class="container">
            <div class="row">
              <div class="sm-2">
                <input
                  class="form-control"
                  type="file"
                  ref="archivo"
                  @click="obtenerListaArchivo()"
                  multiple
                />
              </div>
              <div clas="col-sm-3">
                <button
                  @click="oCarpeta.subir()"
                  class="btn btn-outline-secondary"
                >
                  Subir
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="compartir"
    tabindex="-1"
    aria-labelledby="compartir"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="agregarModal">Compartir</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <Multiselect
              v-model="value"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options=oCarpeta.listaUsuarios
            />
            <br />
          
            <br />
            <div class="row">
              <div class="col-sm-6">
                <button type="button" class="btn btn-outline-secondary">
                  Copiar enlace
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { oCarpetas } from "../clases/carpetas";
import { useRoute } from "vue-router";
import Multiselect from "@vueform/multiselect";

export default {
  name: "carpetas",
  components: { Multiselect },
  setup: () => {
    let archivo = ref(null);
    let oCarpeta = reactive(new oCarpetas.Carpetas());
    let menu = ref(null);
    let value = ref(null);
    let options = reactive(["Batman", "Robin", "Joker"]);
    const route = useRoute();
    const obtenerListaArchivo = () => {
      for (let index = 0; index < archivo.value.files.length; index++) {
        oCarpeta.subirArchivo.push(archivo.value.files[index]);
      }

      console.log(oCarpeta.subirArchivo);
    };

    onMounted(() => {
      debugger;
      oCarpeta.inicializarDatos();
      oCarpeta.idCarpeta = route.params.id;
      oCarpeta.obtenerArchivos();
      oCarpeta.obtenerListaUsuarios();
    });
    const copiarLinK = async (id) => {
      let urlActual = window.location;
      await navigator.clipboard.writeText(urlActual + "/" + id);
    };

    return {
      oCarpeta,
      obtenerListaArchivo,
      archivo,
      menu,
      copiarLinK,
      value,
      options,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
