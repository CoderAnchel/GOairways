<script setup>
import { calcularHoraLlegada } from "~/logic/math";

const props = defineProps({
  distance: Number,
  airportStore: Object,
  day: Number,
});

function calculateLandingTime() {
  props.airportStore.landingTime = calcularHoraLlegada(props.airportStore.takeOffTime, props.airportStore.flightTime, props.airportStore.airportFrom.zona_horaria, props.airportStore.airportTo.zona_horaria);
  console.log("Hora de llegada:", props.airportStore.landingTime);
}

</script>
<template>
  <div
    class="route-ticket"
    v-if="airportStore.airportFrom != null && airportStore.airportTo != null"
    style="margin-top: 60px;  color: #333333;"
  >
    <div style="padding: 20px; border: 1px solid #333333; margin-top: 20px">
      <div style="display: flex; justify-content: center">
        <h3 style="font-weight: 400; color: #e03131">{{ distance }}Km</h3>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 0 10px;;">
        <span style="width: 300px; font-size: 20px;">{{ airportStore.airportFrom.nombre }}</span>
        <div style="display: flex; align-items: center">
          <img
            src="public/flight_takeoff_24dp_333333_FILL0_wght400_GRAD0_opsz24 copy.svg"
            alt=""
          />
          <img src="public/line.svg" alt="" width="300px" />
          <img
            src="public/flight_land_24dp_333333_FILL0_wght400_GRAD0_opsz24 copy.svg"
            alt=""
          />
        </div>
        <span style="width: 300px; display: flex; justify-content: flex-end !important; font-size: 20px; margin-left: 20px;">{{
          airportStore.airportTo.nombre
        }}</span>
      </div>
      <h2
        style="
          font-family: 25px !important;
          display: flex;
          justify-content: center;
          color: #1971c2;
          font-family: quantico !important;
        "
      >
        {{ airportStore.flightTime.horas }}:{{
          airportStore.flightTime.minutos
        }}
        H
      </h2>
      <div style="display: flex; justify-content: center">
        <div
          style="
            display: flex;
            justify-content: space-between;
            font-size: 33px;
            width: 70%;
          "
        >
          <div style="display: flex; flex-direction: column">
            <span style="font-family: quantico !important; margin-bottom: 10px"
              >{{ airportStore.takeOffTime }}
              <span>Local</span>
            </span>
            <input
              @change="calculateLandingTime"
              type="time"
              style="font-family: quantico !important"
              v-model="airportStore.takeOffTime"
            />
          </div>
          <img src="public/line copy.svg" alt="" width="300px" />
          <span style="font-family: quantico !important"
            >{{ airportStore.landingTime }} <span>Local</span></span
          >
        </div>
      </div>
    </div>
    <div style="background: #e03131; width: 100%; height: 50px; border: 1px solid #333333; display: flex; justify-content: space-between; align-items: center; padding: 20px;">
        <img src="public/biglogo.svg" alt="logo-GOairways" style="width: 150px;">
        <span style="color: #ffffff; font-weight: 300; font-family: quantico !important;">Take-Off hour {{ airportStore.id  }}</span>
    </div>
  </div>
</template>
