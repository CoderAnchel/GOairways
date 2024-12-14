<script setup>

useHead({
  title: 'Hub Operations',
  meta: [
    {
      name: 'description',
      content: 'The Fleet Admin Tool is designed to streamline the management of our airline\'s entire fleet. With this tool, you can oversee aircraft assignments, update operational statuses, and manage maintenance schedules. Ensure accurate tracking and efficient deployment of planes, helping to optimize resources and maintain compliance with regulatory standards.'
    }
  ],
})

</script>
<template>
    <div class="container">
      <Header4 title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" thirdRoute="Hub Operations"/>
        <h1>Hub Operations</h1>
        <p style="margin-top: 10px; line-height: 34px;">
          Hub operations are the central point of an airline's network, where flights are strategically coordinated to optimize connections, streamline schedules, and maximize efficiency. These hubs serve as the primary locations for passenger transfers, aircraft maintenance, crew rotations, and operational oversight. By concentrating resources and coordinating flights through key airports, hub operations enable airlines to offer extensive route networks, improve fleet utilization, and enhance the travel experience for passengers.
        </p>
      </div>
    </div>

</template>

