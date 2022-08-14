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
                      @click="instituciones.tipoProceso('A', '', '', '')"
                    >
                      Agregar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <hr />

        <div class="container">
          <div class="row">
            <div
              v-for="(value, key) in instituciones.instituciones"
              class="col-sm-3"
            >
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">
                  Compania Seguro
                  <button
                    @click="instituciones.eliminarInstitucion(value._id)"
                    class="btn"
                    style="margin-left: 20px"
                  >
                    X
                  </button>
                </div>
                <div class="card-body text-primary">
                  <h6 class="card-title">{{ value.descripcion }}</h6>
                  <p class="card-text">Rut: {{ value.RUT }}</p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#modificarModal"
                    @click="
                      instituciones.tipoProceso(
                        'M',
                        value._id,
                        value.descripcion,
                        value.RUT
                      )
                    "
                    class="btn btn-primary"
                    >Modificar</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </panel-body>
    </panel>
  </body>
  <!-- Modal -->
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
              class="form-control text-warning" style="border:0 ;"
              disabled
              placeholder=""
              v-model="instituciones.mensajeError"
            />
            <br/>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Codigo"
              v-model="instituciones.institucion.id"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Descripcion"
              v-model="instituciones.institucion.descripcion"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="RUT"
              v-model="instituciones.institucion.RUT"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="instituciones.agregarInstitucion()"
            class="btn btn-primary"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="modificarModal"
    tabindex="-1"
    aria-labelledby="modificarModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modificarModal">Modificar Compañia</h5>
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
              placeholder="Codigo"
              v-model="instituciones.institucion.id"
              disabled="true"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Descripcion"
              v-model="instituciones.institucion.descripcion"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="RUT"
              v-model="instituciones.institucion.RUT"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="instituciones.actualizarInstitucion()"
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
import { oInstituciones } from "../clases/Instituciones.js";
import { onMounted,onUpdated, reactive } from "vue";


export default {
  name: "Instituciones",
  components: {},
  setup: () => {
    let instituciones = reactive(new oInstituciones.Instituciones());
    onMounted(() => {
      instituciones.obtenerListaInstituciones();
    });
    onUpdated(() => {
      console.log("Actualizacion");
    });

    return {
      instituciones,
    };
  },
};
</script>
