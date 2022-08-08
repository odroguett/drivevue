<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <hr class="my-4" />

    <div class="py-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="/docs/5.0/assets/brand/bootstrap-logo.svg"
        alt=""
        width="72"
        height="57"
      />
    </div>

    <div class="row">
      <div class="col-sm-5 col-md-5 col-lg-5">
        <!-- Email input -->
      </div>
      <div class="col-md-3 col-lg-3">
        <div class="form-outline mb-4">
          <input
            v-model="objetoUsuario.usuario"
            id="form2Example1"
            class="form-control"
          />
          <label class="form-label" for="form2Example1">Usuario</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <input
            type="password"
            v-model="objetoUsuario.password"
            class="form-control"
          />
          <label class="form-label" for="form2Example2">Contraseña</label>
        </div>

        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <!-- Checkbox -->
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                checked
              />
              <label class="form-check-label" for="form2Example31">
                Recordarme
              </label>
              <div class="col">
                <!-- Simple link -->
                <a href="#!">Olvido su clave?</a>
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <button
            type="button"
            @click="autentificar"
            class="btn btn-primary btn-block mb-4"
          >
            Ingresar
          </button>
        </div>
      </div>
      <hr class="my-4" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  setup: () => {
    let objetoUsuario = reactive({
      usuario: "",
      password: "",
    });
    const autentificar = () => {
      axios.post("/usuarios/login", objetoUsuario)
        .then((response) => {

          if (response && response.data) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("auth_token", response.data.token);
            // localStorage.setItem('auth_usuario', response.data.usuario);
            router.push("/");
          } else {
           
          }
        })
        .catch((error) => {
        });
    }
    return {
      objetoUsuario,
      autentificar,
    };
  },
};

</script>
<style>
</style>
