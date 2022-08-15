<template>
  <br />
  <div class="row">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
      <v-button
        :titulo="'Seleccionar todo'"
        :ClassButton="['btn-flat', 'fourth-level']"
        @click="seleccionar"
      >
      </v-button>
      <v-button
        :titulo="'Deseleccionar todo'"
        :ClassButton="['btn-flat', 'fourth-level']"
        @click="desSeleccionar"
      >
      </v-button>
    </div>
    <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 labelBuscar">
      <label>Buscar: <input class="form-control" v-model="searchTerm" /></label>
    </div>
  </div>

  <table-lite
    :is-static-mode="true"
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :page-options="table.pageOptions"
    :messages="table.messages"
    @is-finished="tableLoadingFinish"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import TableLite from "vue3-table-lite";

export default defineComponent({
  name: "grillaUsuarios",
  components: { TableLite },
  emits: ["emitBeneficiario"],
  setup(props, { emit }) {
    const searchTerm = ref("");
    //Esta variable se utiliza para el buscar
    var valoresTabla;
    var grillaTabla = ref(null);
    var bTablaCargada = ref(false);
    const data = reactive({
      rows: [],
    });
    var usuario = reactive({
      ID: Number,
      USUARIO: Number,
      DESCRIPCION: Number,
    });
    const cargaGrilla = (valoresCargaGrilla) => {
      valoresTabla = valoresCargaGrilla;
      bTablaCargada.value = false;
      table.isLoading = true;
      data.rows = valoresCargaGrilla;
      table.isLoading = false;
    };

    const myRequest = async (keyword) => {
      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true;
          data.rows = valoresTabla;
          let newData = data.rows.filter(
            (x) =>
              x.BENEFICIARIO.toLowerCase().includes(keyword.toLowerCase()) ||
              x.RUT_BENEFICIARIO.toLowerCase().includes(
                keyword.toLowerCase() ||
                  x.modalidad_renta
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )
          );
          table.isLoading = false;
          resolve(newData);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    };

    var table = reactive({
      isLoading: false,
      columns: [
        {
          label: "id",
          field: "ID",
          width: "10%",
          sortable: true,
          isKey: true,
        },
        {
          label: "usuario",
          field: "USUARIO",
          width: "10%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Descripcion",
          field: "DESCRIPCION",
          width: "10%",
          sortable: true,
        },
        {
          label: "Modificar",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              `<div class="btn-group dropup">
                    <button type="button" style="background: white;" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                     Menú
                    </button>
              <ul class="dropdown-menu" data-popper-placement="top-start" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(0px, -39px);">
              <li><a class="is-rows-el edit-btn  name-btn dropdown-item" data-id="` +
              row.ID +
              `">Modificar</a></li>
              <li><a class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.ID +
              `">Eliminar</a></li>
              </ul>
              </div>`
            );
          },
        },
      ],
      rows: computed(() => {
        return data.rows;
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Mostrando {0} de {1}",
        pageSizeChangeLabel: "Cantidad de Filas:",
        gotoPageLabel: "Ir a Pagina:",
        noDataAvailable: "Sin Datos",
      },
    });

    watch(
      () => searchTerm.value,
      (val) => {
        myRequest(val).then((newData) => {
          data.rows = newData;
        });
      }
    );

    const seleccionar = () => {
      var item = document.getElementsByClassName("vtl-tbody-td");
      for (var i = 0; i < item.length; i++) {
        item[i].classList.add("row-highlight");
      }
    };

    const desSeleccionar = () => {
      var item = document.getElementsByClassName("vtl-tbody-td");
      for (var i = 0; i < item.length; i++) {
        item[i].classList.remove("row-highlight");
      }
    };
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("quick-btn")) {
          element.addEventListener("click", function () {
            eliminarUsuario(this.dataset.id);
          });
        }
      });
    };
    const eliminarUsuario = (id) => {
      
    };
    
    const buscarUsuarios = (cotizacion) => {
      
     
    };

    return {
      searchTerm,
      table,
      grillaTabla,
      seleccionar,
      desSeleccionar,
      cargaGrilla,
      tableLoadingFinish,
    };
  },
});
</script>
<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #fff;
  background-color: #427bb9;
  border-color: #427bb9;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}
</style>