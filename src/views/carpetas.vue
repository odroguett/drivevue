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
                      data-bs-target="#agregarModal"
                      id="btnModal"
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
                  <h5 class="card-title">{{ value.numero }}</h5>
                  <p class="card-text">{{ value.descripcion }}</p>
                  <p class="card-text">{{ value.texto }}</p>
                  <a href="#" @click=oCarpeta.descargarArchivo(value.link)  class="btn btn-primary">Descargar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </panel-body>
    </panel>
  </body>
</template>
<script>
import { onMounted, reactive } from "vue";
import { oCarpetas } from "../clases/carpetas";
import { useRoute } from "vue-router";

export default {
  name: "carpetas",
  components: {},
  setup: () => {
    //let idCarpeta = ref(null);
    let oCarpeta = reactive(new oCarpetas.Carpetas());
    const route = useRoute();

    onMounted(() => {
      oCarpeta.idCarpeta = route.params.id;
      oCarpeta.obtenerArchivos();
    });
    
    return {
      oCarpeta,
    };
  },
};
</script>
