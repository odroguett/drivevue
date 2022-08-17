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
              v-for="(value, key) in usuarios.listaInstituciones"
              class="col-sm-3"
            >
              <div class="card border-primary mb-3" style="max-width: 18rem">
                <div class="card-header">Compania Seguro</div>
                <div class="card-body text-primary">
                  <h6 class="card-title">{{ value.descripcion }}</h6>
                  <p class="card-text">Rut: {{ value.RUT }}</p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#modificarModal"
                    class="btn btn-primary"
                    @click="cargaGrilla(value._id)"
                    >Usuarios</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <hr />
          <GrillaUsuarios ref="refUsuarios"></GrillaUsuarios>
        </div>
      </panel-body>
    </panel>
  </body>
  <div
    class="modal fade"
    id="agregarModal"
    tabindex="-1"
    aria-labelledby="agregarModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="agregarModal">Agregar Usuario</h5>
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
              v-model="usuarios.usuario.usuario"
              placeholder="Usuario"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              v-model="usuarios.usuario.password"
              placeholder="Password"
            />
            <br />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              v-model="usuarios.usuario.descripcion"
              placeholder="Descripcion"
            />
          </div>
          <br />
          <div class="form-group">
            <input
              class="form-control"
              v-model="usuarios.usuario.email"
              placeholder="Email"
            />
          </div>
          <br />
          <select
            v-model="seleccion"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected></option>
            <option v-for="(value, key) in usuarios.listaActivos">
              {{ value.activo }}
            </option>
          </select>
          <br />
          <div class="col-md-12">
            <select
              v-model="compania"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Compañias</option>
              <option v-for="(value, key) in usuarios.listaInstituciones">
                {{ value.descripcion }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="usuarios.agregarUsuario()"
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
import GrillaUsuarios from "./grillaUsuarios.vue";
import { oUsuarios } from "../clases/usuarios";
import { ref, reactive, onMounted, watch } from "vue";

export default {
  name: "Usuarios",
  components: { GrillaUsuarios },
  setup: () => {
    const refUsuarios = ref(null);
    let seleccion = ref("SI");
    let compania = ref(null);
    let usuarios = reactive(new oUsuarios.Usuarios());

    onMounted(() => {
      usuarios.inicializar();
      usuarios.obtenerListaInstituciones();
      compania.value = "Compañias";
    });

    watch(seleccion, (old) => {
      usuarios.usuario.activo = old;
    });
    watch(compania, (old) => {
      if (old != "COMPAÑIAS") {
        usuarios.listaInstituciones.forEach((element) => {
          if (element.descripcion === old) {
            usuarios.usuario.institucion_id = element._id;
          }
        });
      }
    });
    const cargaGrilla = async (id) => {
      await usuarios.obtenerListaUsuarios(id);
      refUsuarios.value.cargaGrilla(usuarios.listaUsuarios);
    };

    return {
      usuarios,
      seleccion,
      compania,
      refUsuarios,
      cargaGrilla,
    };
  },
};
</script>
