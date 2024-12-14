<script setup>

const { routes, loading, error } = useInactiveRoutes();
const { airports, loading2, error2 } = useAirport();
const routesData = crossRoutesData(routes, airports);
import { themeQuartz, iconSetQuartzLight } from '@ag-grid-community/theming';

import { ref } from 'vue';
import { useToast } from "vue-toastification";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component

const toast = useToast();

const acceptRoutefunc = async  (route) => {
    toast.warning("Approving route...");
    if (confirm('Are you sure you want to approve this route?')) {
        let response = acceptRoute(route);
        try {
            response = await response;
            if (response) {
                toast.success("Route approved!");
                window.location.reload();
            } else {
                toast.error("Error approving route");
            }
        } catch (error) {
            console.log(error);
        }
        routesData.value = routesData.value.filter((r) => r.id !== route.id);
    }
}

// Define the columns for AG Grid
const columnDefs = ref([
  { field: 'id', headerName: 'Route ID', sortable: true, filter: true },
  { field: 'origin', headerName: 'From', sortable: true, filter: true },
  { field: 'destination', headerName: 'To', sortable: true, filter: true },
  { field: 'type', headerName: 'Type', sortable: true, filter: true },
  { field: 'distancia', headerName: 'Distance (km)', sortable: true, filter: true },
  {
    field: 'duracion',
    headerName: 'Duration',
    valueFormatter: (params) => `${Math.floor(params.value / 60)}h ${params.value % 60}m`,
  },
  { field: 'frequencia_dia', headerName: 'Daily Frequency', sortable: true },
  { field: 'frequencia_semana', headerName: 'Weekly Frequency', sortable: true },
  {
    field: 'actions',
    headerName: 'Actions',
    cellRenderer: (params) => {
      const button = document.createElement('button');
      button.innerText = 'Approve';
      button.style.background = '#e03131';
      button.style.border = 'none';
      button.style.width = '100%';
      button.style.color = '#ffffff';
      button.style.borderRadius = '5px';
      button.style.marginBottom = '5px';
      button.style.padding = '10px';
      button.addEventListener('click', () => acceptRoutefunc(params.data));
      return button;
    },
  },
]);

</script>
<template>
<div style="padding: 20px; margin-top: 40px;">
    <ag-grid-vue
      class="ag-theme-quartz"
      style="width: 100%; height: 500px;"
      :rowData="routesData"
      :columnDefs="columnDefs"
      rowHeight="50"
      animateRows="true"
    >
    </ag-grid-vue>
  </div>
</template>
<style scoped>
.ag-theme-quartz {
  /* Cambia el color de fondo del encabezado */
  --ag-header-background-color: #e03131;
  /* Cambia el color del texto del encabezado */
  --ag-header-foreground-color: #ffffff;
  /* Cambia el color de los iconos del encabezado */
  --ag-header-icon-color: #ffffff;
  /* Cambia el color de fondo al pasar el ratón sobre una fila */
  --ag-row-hover-color: rgb(255, 216, 216);
  /* Cambia el color de fondo de las filas */
  --ag-odd-row-background-color: #f9f9f9;
  --ag-even-row-background-color: #ffffff;
  /* Cambia el color del texto de las filas */
  --ag-foreground-color: #333333;
}
</style>
