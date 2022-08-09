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
    var datosCreacionPoliza = ref([]);
    const data = reactive({
      rows: [],
    });
    var cotizacion = reactive({
      COTIZANTE: Number,
      COTIZACION: Number,
      BENEFICIARIO: Number,
    });

    const cargaDatos = (datosCreacionPoliza) => {
      cargaGrilla(datosCreacionPoliza.ListaCotizacionesBeneficiarios);
    };
    /* onMounted(() => {
          datosCreacionPoliza = JSON.parse(route.params.datosCreacionPoliza);
          
          // eslint-disable-next-line vue/no-ref-as-operand
          if (datosCreacionPoliza.ListaCotizacionesBeneficiarios != undefined) {
            // eslint-disable-next-line vue/no-ref-as-operand
            cargaGrilla(datosCreacionPoliza.ListaCotizacionesBeneficiarios);
          }
        }); */

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
          label: "Nombre",
          field: "NOMBRE",
          width: "10%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Fecha modificación",
          field: "FECHA_MODIFICACION",
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
              <li><a class="is-rows-el edit-btn  name-btn dropdown-item" data-id="` +
              row.COTIZANTE +
              "/" +
              row.COTIZACION +
              "/" +
              row.BENEFICIARIO +
              `">Modificar</a></li>
              <li><a class="is-rows-el edit-btn quick-btn dropdown-item" data-id="` +
              row.COTIZANTE +
              "/" +
              row.COTIZACION +
              "/" +
              row.BENEFICIARIO +
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
            eliminarCotizacionBeneficiario(this.dataset.id);
          });
        }
      });
    };
    const eliminarCotizacionBeneficiario = (oCotizacion) => {
      debugger;
      var arrayBusquedacotizacion = oCotizacion.split("/");
      for (var i = 0; i < arrayBusquedacotizacion.length; i++) {
        if (i === 0) {
          cotizacion.COTIZANTE = arrayBusquedacotizacion[i];
        } else if (i === 1) {
          cotizacion.COTIZACION = arrayBusquedacotizacion[i];
        } else if (i === 2) {
          cotizacion.BENEFICIARIO = arrayBusquedacotizacion[i];
        }
      }
      BenlarService.oBenlar.Alertas.mostrarLoad();

      BenlarService.jwtInterceptor
        .post(
          "api_polizas/NuevosNegocios/EliminarCotizacionBeneficiario",
          cotizacion
        )
        .then((response) => {
          if (response.data.EsValido) {
            BenlarService.oBenlar.show(
              response.data.Mensaje,
              response.data.EsValido
                ? BenlarService.oBenlar.Constantes().exito
                : BenlarService.oBenlar.Constantes().alerta
            );
            buscarDatosGrillaCotizacionBeneficiario(cotizacion);
            if (response.data.respuestaArchivosOtd.Archivo != null) {
              BenlarService.oBenlar.DescargarArchivotemp(
                response.data.respuestaArchivosOtd.Archivo
              );
            }
          } else {
            alert("sin datos");
          }

          BenlarService.oBenlar.Alertas.ocultarLoad();
        })
        .catch((err) => {
          BenlarService.oBenlar.Alertas.ocultarLoad();
          console.log(err);
        });
    };
    const emitir = (oCotizacion) => {
      emit("emitBeneficiario", oCotizacion);
    };
    const buscarDatosGrillaCotizacionBeneficiario = (cotizacion) => {
      debugger;
      BenlarService.oBenlar.Alertas.mostrarLoad();
      BenlarService.jwtInterceptor
        .post(
          "api_polizas/NuevosNegocios/BuscarDatosGrillaCotizacionBeneficiario",
          cotizacion
        )
        .then((response) => {
          if (response.data.EsValido) {
            table.isLoading = true;
            data.rows = response.data.ListaCotizacionesBeneficiarios;
            valoresTabla = response.data.ListaCotizacionesBeneficiarios;
            table.isLoading = false;
          } else {
            alert("sin datos");
          }

          BenlarService.oBenlar.Alertas.ocultarLoad();
        })
        .catch((err) => {
          BenlarService.oBenlar.Alertas.ocultarLoad();
          console.log(err);
        });
      return;
    };

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
  color: rgb(24, 106, 228);
  background-color: #cfe5ee;
  border-color: #d7e4ea;
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
