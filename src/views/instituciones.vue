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
            <div class="col-sm-3">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">BICE</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Bice Seguro S.A.</h5>
                  <p class="card-text">Rut: 88.789.458-7</p>
                        <a href="#" class="btn btn-primary">Acción</a>
                        
                 
                   
                  
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">Consorcio</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Consorcio Nacional</h5>
                  <p class="card-text">Rut: 88.789.458-7</p>
                  <a href="#" class="btn btn-primary">Acción</a>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">MetLife</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">MetLife Seguros</h5>
                  <p class="card-text">Rut: 88.789.458-7</p>
                   <a href="#" class="btn btn-primary">Acción</a>
                </div>
              </div>
            </div>

            <div class="col-sm-3">
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">Ohio</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Ohio National</h5>
                  <p class="card-text">Rut: 88.789.458-7</p>
                   <a href="#" class="btn btn-primary">Acción</a>
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
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Nombre"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Descripcion"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Rut"
            />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import interceptor from "../compartido/jwt.interceptor";
import { onMounted, reactive } from "vue";

export default {
  name: "Instituciones",
  components: {},
  setup: () => {
    let instituciones = reactive({
      nombre: String,
      descripcion: String,
      rut: String,
    });
    const obtenerListaInstituciones = () => {
      interceptor
        .get("/instituciones/obtenerListaInstituciones")
        .then((response) => {
          if (response && response.data) {
            console.log("exito");
          } else {
            if (response.status === "401") {
              alert("Error al obtener instituciones");
            }
          }
        })
        .catch((error) => {
          if (error.response !== undefined && error.response.status === "400") {
            alert("Error al obtener institucuines");
          }
        });
    };
    onMounted(() => {
      obtenerListaInstituciones();
    });

    return {
      instituciones,
    };
  },
};
</script>
