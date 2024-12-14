<script setup>
import { useInactiveRoutes, useAirport, crossRoutesData, acceptRoute } from '#build/imports';
import { formatDuration } from '../logic/math';
import AirlineGrid from '@/components/Grid.vue'

useHead({
  title: 'Routes Approval',
  meta: [
    {
      name: 'description',
      content: 'The Fleet Admin Tool is designed to streamline the management of our airline\'s entire fleet. With this tool, you can oversee aircraft assignments, update operational statuses, and manage maintenance schedules. Ensure accurate tracking and efficient deployment of planes, helping to optimize resources and maintain compliance with regulatory standards.'
    }
  ],
})

const { routes, loading, error } = useInactiveRoutes();
const { airports, loading2, error2 } = useAirport();
const routesData = crossRoutesData(routes, airports);

onMounted(() => {
  console.log('Routes Approval Page Mounted');
})

</script>
<template>
    <div class="container">
      <Header5 title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" thirdRoute="Routes"/>
        <h1>Routes Approval</h1>
        <p style="margin-top: 10px; line-height: 34px;">
            Route approval is a critical process to ensure that new flight paths align with operational, regulatory, and business requirements. This step involves evaluating route feasibility, coordinating with air traffic authorities, and confirming compliance with safety and efficiency standards. Through the route approval process, airlines optimize network connectivity while maintaining a focus on reliability and strategic growth."
        </p>

        <div v-if="routes.length == 0" style="padding: 20px; border: 1px solid #333333; margin-top: 40px; display: flex; justify-content: center;">
            <h2 style="color: #333333; display: flex; align-items: center;">No pending routes<img src="public/search_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" style="margin-left: 10px;" alt=""></h2>
        </div>
        <AirlineGrid :routesData="routesData"/>

      </div>
    </div>
</template>
<style scoped>


</style>

