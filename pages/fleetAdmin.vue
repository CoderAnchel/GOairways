<script setup>
import AirlineGrid from '@/components/Grid.vue'
import { useModels, usePlanes, crossPlanesData  } from "~/composables/useAirport";
import  { useRouter } from 'vue-router';
useHead({
  title: 'Fleet Administration',
  meta: [
    {
      name: 'description',
      content: 'The Fleet Admin Tool is designed to streamline the management of our airline\'s entire fleet. With this tool, you can oversee aircraft assignments, update operational statuses, and manage maintenance schedules. Ensure accurate tracking and efficient deployment of planes, helping to optimize resources and maintain compliance with regulatory standards.'
    }
  ],
})

const { models, loading, error } = useModels();
const { planes, loading2, error2 } = usePlanes();
const planesData = crossPlanesData(planes, models);

const router = useRouter();

onMounted(() => {
  console.log('Fleet Administration Page Mounted');
  console.log(models);
  console.log(planes);
  console.log(planesData);
})

</script>
<template>
    <div class="container">
      <Header3 title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" thirdRoute="Fleed Admin"/>
        <h1>Fleed Administration</h1>
        <p style="margin-top: 10px; line-height: 34px;">
          The Fleet Admin Tool is designed to streamline the management of our airline's entire fleet. With this tool, you can oversee aircraft assignments, update operational statuses, and manage maintenance schedules. Ensure accurate tracking and efficient deployment of planes, helping to optimize resources and maintain compliance with regulatory standards.
        </p>
        <PlanesGrid :planesData="planesData" />
      </div>
    </div>

</template>

