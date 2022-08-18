<template>
  <body>
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
              <li class="nav-item">
                <router-link to="/usuarios">
                  <button class="btn btn-light">Usuarios</button>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/instituciones">
                  <button class="btn btn-light">Compañias</button>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/perfiles">
                  <button class="btn btn-light">Perfiles</button>
                </router-link>
              </li>
            </ul>

            <form class="d-flex">
              <input
                class="form-control me-2"
                type="Search"
                placeholder="Buscar..."
                aria-label="Search"
              />
              <button class="btn btn-light" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
    </div>

    <div class="container">
      <hr />
      <div class="row">
        <div class="col-md-2">
          <div class="d-flex align-items-start">
            <div
              class="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Agregar
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#agregarCarpeta"
                      >Nueva Carpeta</a
                    >
                  </li>
                  <li><a class="dropdown-item" href="#">Subir Archivo</a></li>
                  <li><a class="dropdown-item" href="#">Subir Carpeta</a></li>
                </ul>
              </div>
              
              <button
                class="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-10">
          <grillaCarpetas ref="refCarpetas"></grillaCarpetas>
        </div>
      </div>
    </div>
  </body>
  <div
    class="modal fade"
    id="agregarCarpeta"
    tabindex="-1"
    aria-labelledby="agregarCarpeta"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="agregarModal">Carpeta</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input
              class="form-control"
              v-model="oCarpeta.carpeta.nombre"
              placeholder="Nombre Carpeta"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="agregaCarpeta()"
            class="btn btn-primary"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import grillaCarpetas from "../views/grillaCarpetas.vue";
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { oCarpetas } from "../clases/carpetas";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    grillaCarpetas,
  },

  setup: () => {
    let oCarpeta = new oCarpetas.Carpetas();
    const refCarpetas = ref(null);
    const agregaCarpeta = () => {
      oCarpeta.carpeta.usuario = localStorage.getItem("usuario");
    };
    onMounted(() => {
      cargaGrilla();
    });
    const cargaGrilla = async () => {
      let usuario = localStorage.getItem("usuario");
      await oCarpeta.obtenerListaCarpetas(usuario);
      refCarpetas.value.cargaGrilla(oCarpeta.listaCarpetas);
    };
    return {
      oCarpeta,
      agregaCarpeta,
      refCarpetas,
    };
  },
};
</script>
