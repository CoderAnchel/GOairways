<script setup>
import { useRoute } from 'vue-router';
const router = useRoute();
const title = ref("Plane " + router.params.id);
import { usePlane, useModels, getModelNameById  } from "~/composables/useAirport";

useHead({
    title: title
})

const { models, loading2, error2 } = useModels();

const { avion, loading, error } = usePlane(router.params.id);

const modelName = ref('Unknown Model');
const imgURL = ref(null);

watchEffect(() => {
  if (avion.value && models.value && models.value.length > 0) {
    modelName.value = getModelNameById(models, avion.value.modelo_id);
    console.log('Model Name:', modelName.value);
    imgURL.value = `/${modelName.value}.jpg`;
    console.log('Image URL:', imgURL.value);
  }
});

onMounted(() => {
    console.log('Plane Page Mounted');
    console.log(avion)
})

</script>
<template>
    <div class="container">
      <Header6 title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" :thirdRoute="'Plane ' + (Array.isArray($route.params.id) ? $route.params.id.join(',') : $route.params.id)"/>
        <div style="display: flex; justify-content: space-between;">
            <h1>{{ avion.nombre  }}</h1>
            <h1 style="font-size: 20px; font-weight: 300;"> Details</h1>
        </div>
        <p style="margin-top: 10px; line-height: 34px;">
            {{ modelName  }} - <span style="color: #e03131;">{{ avion.matricula }}</span>
        </p>
        <img style="margin-left: 45px;" v-if="imgURL != null" width="900px" :src="imgURL" alt="">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <h1 style="font-size: 20px;">Emplazado en:</h1>
            <p style="margin-top: 10px;">No Data</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Ultimo Vuelo:</h1>
            <p style="margin-top: 10px;">No Data</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Proximo vuelo:</h1>
            <p style="margin-top: 10px;">No Data</p>
          </div>
        </div>
        <div class="bar" style="background: #333333; height: 1px; width: 100%; margin-top: 40px; margin-bottom: 40px;">        </div>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <h1 style="font-size: 20px;">Status</h1>
            <p style="margin-top: 10px;">{{ avion.status  }}</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Ubicacion</h1>
            <p style="margin-top: 10px;">{{ avion.ubicacion  }}</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Uso</h1>
            <p style="margin-top: 10px;">{{ avion.km_recorridos  }} km</p>
          </div>
        </div>
        <div class="bar" style="background: #333333; height: 1px; width: 100%; margin-top: 40px;">        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 40px">
          <div>
            <h1 style="font-size: 20px;">Proximo Mantenimiento</h1>
            <p style="margin-top: 10px;">{{ avion.proximo_mantenimiento  }}</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Ultimo Mantenimiento</h1>
            <p style="margin-top: 10px;">{{ avion.fecha_ultimo_mantenimiento  }}</p>
          </div>
          <div>
            <h1 style="font-size: 20px;">Primer Vuelo</h1>
            <p style="margin-top: 10px;">{{ avion.fecha_entrada_servicio  }} km</p>
          </div>
        </div>
        <div class="bar" style="background: #333333; height: 1px; width: 100%; margin-top: 40px;"></div>
        <div class="panel" style="display: flex; justify-content: space-between; margin-top: 40px;">
          <button>Programar Mantenimiento</button>
          <button>Asignar Vuelos</button>
          <button>Modificar Status</button>
          <button>Asignar Personal</button>
        </div>
        <div class="panel" style="display: flex; justify-content: space-between; margin-top: 40px; width: 500px; justify-self: center;">
          <button>Futuros Vuelos</button>
          <button>Historial Vuelos</button>
        </div>
        <div class="panel" style="display: flex; justify-content: space-between; margin-top: 40px;">
          <button>Historial Reparaciones</button>
          <button>Historial Averias</button>
          <button>Notificar Averia</button>
        </div>
        <p style="margin-top: 40px; margin-bottom: 50px; text-align: center;">Informar de cualquier dato sobre el avion es esencial para poder continuar con la trazabilidad de los datos y hacer que la simulacion sea lo mas precisa posible.</p>
      </div>
    </div>
</template>
<style>

.panel button {
  background: #e03131;
  color: white;
  padding: 10px 20px;
  border: 1px solid #e03131;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.panel button:hover {
  background: white;
  color: #e03131;
}

.header6 {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/1435247-2504x1669-desktop-hd-lufthansa-wallpaper-image.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}
</style>
