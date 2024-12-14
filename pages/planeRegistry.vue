<script setup>
import vSelect from "vue-select";
import { usePlaneStore } from "#build/imports";
import { usePlanes, useModels, useAirport } from "#build/imports";

const plane = usePlaneStore();
const { models, loading, error } = useModels();
const { airports, loading2, error2 } = useAirport();

const selectedModel = ref({});
const selectedLocation = ref({});

useHead({
  title: "Plane Registry",
  meta: [
    {
      name: "description",
      content:
        "Use the Plane Registry Tool to easily register new aircraft into the fleet. This tool allows you to input essential details such as aircraft type, registration number, and maintenance history, ensuring that all new planes are properly documented and ready for operation. By registering new aircraft efficiently, you help maintain an organized and up-to-date fleet management system.",
    },
  ],
});
</script>
<template>
  <div class="container planeReg">
    <Header2 title="Check actual planes and routes!" clicker="Check Now!" />
    <div class="content">
      <RouteViewer
        firstRoute="Home"
        secondRoute="Admin"
        thirdRoute="Plane Registry"
      />
      <h1>Plane Registry</h1>
      <p style="margin-top: 10px; line-height: 34px">
        Use the Plane Registry Tool to easily register new aircraft into the
        fleet. This tool allows you to input essential details such as aircraft
        type, registration number, and maintenance history, ensuring that all
        new planes are properly documented and ready for operation. By
        registering new aircraft efficiently, you help maintain an organized and
        up-to-date fleet management system.
      </p>
      <div style="display: flex; justify-content: space-between">
        <div>
          <h1 style="font-size: 20px; margin-top: 40px; margin-bottom: 20px">
            Select Model
          </h1>
          <v-select
            style="width: 500px; font-weight: 300 !important; color: #333333"
            class="dropdown"
            v-model="selectedModel"
            :options="models"
            label="modelo"
            placeholder="Selecciona modelo"
          ></v-select>
        </div>
        <div>
          <h1 style="font-size: 20px; margin-top: 40px; margin-bottom: 20px">
            Introduce Name
          </h1>
          <input
            type="text"
            style="
              width: 500px;
              font-weight: 300 !important;
              padding: 9px;
              border: 0.5px solid #d1d1d1;
              border-radius: 5px;
              outline: none;
            "
            placeholder="Introduce nombre"
            v-model="plane.name"
          />
        </div>
      </div>

      <div v-if="selectedModel.modelo != null">
        <div>
          <h1 style="font-size: 20px; margin-top: 40px; margin-bottom: 20px">
            Select Base Location
          </h1>
          <v-select
            style="width: 500px; font-weight: 300 !important; color: #333333"
            class="dropdown"
            v-model="selectedLocation"
            :options="airports"
            label="nombre"
            placeholder="Selecciona modelo"
          ></v-select>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 30px;
          "
        >
          <div>
            <h1 style="font-size: 20px; margin-top: 40px; margin-bottom: 20px">
              Plane Registration
            </h1>
            <button @click="plane.generatePlate" class="button2" style="">
              Generate New Plate
            </button>
          </div>
          <div>
            <h1
              style="
                position: relative;
                top: 30px;
                display: flex;
                align-items: center;
              "
            >
              {{ plane.plate }}
              <img
                style="margin-left: 5px"
                width="50px"
                src="public/Flag_of_Europe.svg"
                alt=""
              />
              <img
                style="margin-left: 5px"
                width="50px"
                src="public/Flag_of_Germany.svg"
                alt=""
              />
            </h1>
            <span style="position: relative; top: 30px; color: #333333"
              >*unique plate number generated</span
            >
          </div>
        </div>
        <div style="display: flex; align-items: center;">
          <div>
            <h1 style="font-size: 20px; margin-top: 40px; margin-bottom: 20px">
              Preview
            </h1>
            <img :src="`/${selectedModel.modelo}.jpg`" alt="" width="500px" />
          </div>
          <div style="display: flex">
            <div
              style="
                background: #333333;
                width: 1px;
                height: 270px;
                padding-top: 20px;
                margin-top: 30px;
                margin-left: 10px;
              "
            ></div>
          </div>
          <div
            style="
              margin-top: 25px;
              margin-left: 20px;
              width: 500px;
              color: #333333;
              font-size: 18px;
            "
          >
            <!-- <img style="border-radius: 10px;" src="public/boeing.svg" width="500px" alt="" /> -->
            <!-- <img src="public/airbus.svg" width="500px" alt=""> -->
            <div style="display: flex; padding: 20px;">
              <span><b>Model:</b> {{ selectedModel.modelo }}</span>
              <span style="margin-left: 20px"
                ><b>Name:</b> {{ plane.name }}</span
              >
            </div>
            <div style="display: flex; flex-direction: column">
              <span style="margin-left: 20px"
                ><b>Plate:</b> {{ plane.plate }}</span
              >
              <span style="margin-left: 20px; margin-top: 20px"
                ><b>Base Location:</b> {{ selectedLocation.nombre }}</span
              >
                <span style="margin-left: 20px; margin-top: 20px"
                ><b>Date:</b> {{ new Date().toLocaleString() }}</span
              >
              <span style="margin-left: 20px; margin-top: 20px"
                ><b>First Flight:</b> To be defined</span
              >
            </div>
          </div>
        </div>
      </div>
      <button
        class="button2"
        style="
          width: 100%;
          margin-top: 40px;
          font-size: 15px;
          margin-bottom: 80px;
        "
      >
        Register
      </button>
    </div>
  </div>
</template>
<style>
.button2 {
  background: #e03131;
  color: white;
  padding: 10px 20px;
  border: 1px solid #e03131;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  background: white;
  color: #e03131;
}
</style>
