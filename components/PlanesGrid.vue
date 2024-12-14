<script setup>

defineProps({
  planesData: Array,
});

import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import ImageCellRenderer from './ImageCellRenderer.vue';
import  { useRouter } from 'vue-router';

const router = useRouter();

function getPlaneDetails(id) {
  router.push(`/planes/${id}`);
}

// Define the columns for AG Grid
const columnDefs = ref([
  { field: 'id', headerName: 'Plane ID', sortable: true, filter: true },
  {
    field: 'picture',
    headerName: 'Side Pic',
    cellRenderer: (params) => {
      const img = document.createElement('img');
      img.src = `./${params.data.model}.jpg`; // Ajusta la ruta según sea necesario
      img.alt = 'Plane Image';
      img.style.width = '100px'; // Ajusta el tamaño de la imagen según sea necesario
      img.style.height = 'auto';
      return img;
    },
  },
  { field: 'nombre', headerName: 'Name', sortable: true, filter: true },
  { field: 'model', headerName: 'Model', sortable: true, filter: true },
  { field: 'matricula', headerName: 'matricula', sortable: true, filter: true },
  { field: 'km_recorridos', headerName: 'Km recorridos',valueFormatter: (params) => `${params.value}  Km`, sortable: true, filter: true },
  { field: 'status', headerName: 'Status', sortable: true, filter: true },
    { field: 'ubicacion', headerName: 'Location', sortable: true, filter: true },
    { field: 'fecha_ultimo_mantenimiento', headerName: 'Last Maintenance', sortable: true, filter: true },
    { field: 'proximo_mantenimiento', headerName: 'Next Maintenance', sortable: true, filter: true },
    { field: 'fecha_entrada_servicio', headerName: 'Service Entry Date', sortable: true, filter: true },
    {
    field: 'actions',
    headerName: 'Actions',
    cellRenderer: (params) => {
      const button = document.createElement('button');
      button.innerText = 'Details';
      button.style.background = '#e03131';
      button.style.border = 'none';
      button.style.width = '100%';
      button.style.color = '#ffffff';
      button.style.borderRadius = '5px';
      button.style.marginBottom = '5px';
      button.style.padding = '10px';
      button.addEventListener('click', () => getPlaneDetails(params.data.id));
      return button;
    },
  },
]);

const frameworkComponents = ref({
  imageCellRenderer: ImageCellRenderer,
});

</script>
<template>
<div style="padding: 20px; margin-top: 40px;">
    <ag-grid-vue
      class="ag-theme-quartz"
      style="width: 100%; height: 1000px;"
      :rowData="planesData"
      :columnDefs="columnDefs"
      :frameworkComponents="frameworkComponents"
      rowHeight="50"
      animateRows="true"
      :pagination="true"
      :paginationPageSize="50"
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

  --ag-even-row-background-color: #ffffff;
  /* Cambia el color del texto de las filas */
  --ag-foreground-color: #333333;
}
</style>
