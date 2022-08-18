/* eslint-disable vue/no-ref-as-operand */

<template>
  <br />
  <div class="row">
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">
      <v-button
        :titulo="'Descargar Excel'"
        :ClassButton="['btn-flat', 'fourth-level']"
        @click="exportExcel"
      >
      </v-button>
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
  </div>

  <table-lite
    id="tabla"
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
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watch,
  onMounted,
} from "vue";
import TableLite from "vue3-table-lite";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "grillaDatosBeneficiario",
  components: { TableLite },
  emits: ["emitBeneficiario"],
  setup(props, { emit }) {
    const searchTerm = ref("");
    const route = useRoute();
    //Esta variable se utiliza para el buscar
    var valoresTabla;
    var grillaTabla = ref(null);
    var bTablaCargada = ref(false);
    const data = reactive({
      rows: [],
    });
    onMounted(() => {
      addRowHandlers();
    });

    const cargaDatos = (datosCarpetas) => {
      cargaGrilla(datosCarpetas.ListaCarpetas);
    };

    onMounted(() => {
     addRowHandlers();
    });

    const cargaGrilla = (valoresCargaGrilla) => {
      debugger;
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
              x.nombre.toLowerCase().includes(keyword.toLowerCase()) ||
              x.usuario
                .toLowerCase()
                .includes(
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
          label: "Nombre",
          field: "nombre",
          width: "10%",
          sortable: true,
          isKey: true,
           display: function (row) {
            return (`<a href=#><span class="is-rows-el seleccionar-btn" data-id="${row.nombre}"</span>${row.nombre}</a>`);
          },
        },
        {
          label: "usuario",
          field: "usuario",
          width: "10%",
          sortable: true,
          isKey: true,
        },
        {
          label: "tamaño",
          field: "NOMBRE",
          width: "10%",
          sortable: true,
        },
        {
          label: "Modificar",
          field: "quick",
          width: "10%",
          display: function (row) {
            debugger;
            return (
              `<div class="btn-group dropup">
                    <button type="button" style="background: white;" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                     Menú
                    </button>
              <ul class="dropdown-menu" data-popper-placement="top-start" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(0px, -39px);">
              
              <li><a class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.nombre +
              "/" +
              row.usuario +
              `">Eliminar</a></li>
              <li><a   class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.nombre +
              "/" +
              row.usuario +
              `">Compartir</a></li>
              <li><a class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.nombre +
              "/" +
              row.usuario +
              `">Descargar</a></li>
               <li><a class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.nombre +
              "/" +
              row.usuario +
              `">Copiar Enlace</a></li>
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

    const exportExcel = () => {
      // eslint-disable-next-line no-undef
      let data = XLSX.utils.json_to_sheet(table.rows);
      // eslint-disable-next-line no-undef
      const workbook = XLSX.utils.book_new();
      const filename = "grillaCotizaciones" + Date.now();
      // eslint-disable-next-line no-undef
      XLSX.utils.book_append_sheet(workbook, data, filename);
      // eslint-disable-next-line no-undef
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const seleccionar = () => {
      var item = document.getElementsByClassName("vtl-tbody-td");
      for (var i = 0; i < item.length; i++) {
        item[i].classList.add("row-highlight");
      }
      alert("hola");
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
        if (element.classList.contains("name-btn")) {
          element.addEventListener("click", function () {
            emitir(this.dataset.id);
          });
        }
        if (element.classList.contains("quick-btn")) {
          element.addEventListener("click", function () {
            eliminarCarpeta(this.dataset.id);
          });
        }
         if (element.classList.contains("seleccionar-btn")) {
          element.addEventListener("click", function () {
           alert(this.dataset.id);
          });
        }
      });
    };
    const eliminarCarpeta = (oCotizacion) => {
      debugger;
    };
    const emitir = (oCotizacion) => {
      emit("emitBeneficiario", oCotizacion);
    };

    const createClickHandler = (row) => {
      return () => {
        const [cell] = row.getElementsByTagName("td");
        const id = cell.innerHTML;
        console.log(id);
      };
    };

    const addRowHandlers = () => {

    const table1 = document.querySelector("table");
    for (const currentRow of table1.rows) {
      currentRow.onclick = createClickHandler(currentRow);
    }

    }


    return {
      searchTerm,
      table,
      grillaTabla,
      exportExcel,
      seleccionar,
      desSeleccionar,
      cargaGrilla,
      tableLoadingFinish,
      cargaDatos,
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
  color: rgb(96, 205, 224);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(96, 205, 224);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}
</style>
