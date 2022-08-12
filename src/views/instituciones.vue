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
                      @click="tipoProceso('A', '', '', '')"
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
            <div v-for="(value, key) in instituciones" class="col-sm-3">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">Compania Seguro</div>
                <div class="card-body text-primary">
                  <h6 class="card-title">{{ value.descripcion }}</h6>
                  <p class="card-text">Rut: {{ value.RUT }}</p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#modificarModal"
                    @click="
                      tipoProceso('M', value._id, value.descripcion, value.RUT)
                    "
                    class="btn btn-primary"
                    >Acción</a
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
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Codigo"
              v-model="institucion.id"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Descripcion"
              v-model="institucion.descripcion"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="RUT"
              v-model="institucion.RUT"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="agregarInstitucion()"
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
              v-model="institucion.id"
              disabled="true"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Descripcion"
              v-model="institucion.descripcion"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="RUT"
              v-model="institucion.RUT"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="actualizarInstitucion()"  class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import interceptor from "../compartido/jwt.interceptor";
import { onMounted, reactive, ref } from "vue";

export default {
  name: "Instituciones",
  components: {},
  setup: () => {
    let instituciones = reactive([]);
    let institucion = reactive({
      id: "",
      descripcion: "",
      RUT: "",
    });
    let habilitaControl = ref(null);

    const obtenerListaInstituciones = () => {
      interceptor
        .get("/instituciones/obtenerListaInstituciones")
        .then((response) => {
          if (response && response.data) {
            response = response.data.objeto;
            response.forEach((element) => {
              instituciones.push(element);
            });

            console.log(instituciones);
          } else {
            if (response.status === "401") {
              alert("Error al obtener instituciones");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener instituciones");
          }
        });
    };
    const agregarInstitucion = () => {
      habilitaControl.value = false;
      interceptor
        .post("/instituciones/crearInstitucion", institucion)
        .then((response) => {
          if (response && response.data) {
            obtenerListaInstituciones();
            console.log(instituciones);
          } else {
            if (response.status === "401") {
              alert("Error al obtener instituciones");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener instituciones");
          }
        });
    };

    const tipoProceso = (tipoProceso, id, descripcion, RUT) => {
      if (tipoProceso === "M") {
        institucion.id = id;
        institucion.descripcion = descripcion;
        institucion.RUT = RUT;
      } else {
        institucion.id = "";
        institucion.descripcion = "";
        institucion.RUT = "";
      }
    };

    const actualizarInstitucion = () => {
      habilitaControl.value = false;
      interceptor
        .patch(
          "/instituciones/actualizarInstitucion?id=" + institucion.id,
          institucion
        )
        .then((response) => {
          if (response && response.data) {
            obtenerListaInstituciones();
            console.log(instituciones);
          } else {
            if (response.status === "401") {
              alert("Error al obtener instituciones");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener instituciones");
          }
        });
    };

    onMounted(() => {
      obtenerListaInstituciones();
    });

    return {
      instituciones,
      institucion,
      agregarInstitucion,
      tipoProceso,
      habilitaControl,
      actualizarInstitucion
    };
  },
};
</script>
