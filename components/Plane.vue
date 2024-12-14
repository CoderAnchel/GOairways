<script setup>
defineProps({
    model: Object,
    adder: Function,
})

import { ref } from 'vue';

const clicked = ref(false);

function handleClick() {
  clicked.value = !clicked.value;
}

</script>
<template>
  <div style="margin-top: 50px; height: 270px; color: #333333; border-radius: 5px;"  class="plane-card">
    <span
      style="font-weight: 300; font-size: 25px; font-weight: 500;"
      >{{ model.modelo }}</span
    >
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <img style="width: 500px" :src="`/${model.modelo}.jpg`" alt="" />
      <div style="height: 160px; width: 1px; background: #333333"></div>
      <div
        style="
          width: 400px;
          font-weight: 300;
          display: flex;
          flex-direction: column;
        "
      >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Max-Distance:</b> {{ model.alcanze }} Km
        </span>
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Capacity:</b> {{ model.capacidad }} Pasengers</span
        >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Rows:</b> {{ model.filas }}</span
        >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Configuration:</b> {{ model.configuracion }}</span
        >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Longitud:</b> {{ model.longitud }}</span
        >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Wingspan:</b> {{ model.enevergadura }}</span
        >
        <span
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
          ><b>Engines:</b> {{ model.motores }}</span
        >
      </div>
      <button
      class="clicker adder cositasf"
      @click="() => { handleClick(); adder(); }"
      style="
        padding: 5px 7px;
        margin-bottom: 10px;
        background: #e03131;
        border: none;
        color: #ffffff;
        width: 50px;
        height: 200px;
        margin-left: 5px;
        border: 1px solid #e03131;
        border-radius: 5px;
      "
    >
      {{ clicked ? 'Delete' : 'Add' }}
    </button>
    </div>
  </div>
</template>
<style scoped>

.cositasf:hover {
  background: #ffffff;
}

</style>
