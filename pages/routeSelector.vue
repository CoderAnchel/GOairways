<script setup>
import { useAirport, useModels, usePdfReciver, downloadPdf, generatePdf } from "~/composables/useAirport";
import vSelect from "vue-select";
import { useCounterStore } from "@/stores/counterStore";
import { useAirportsStore } from "@/stores/airportStore.js";
import "vue-select/dist/vue-select.css";
import { calcularDistancia, calcularHoraLlegada, calcularTiempo } from "~/logic/math";
import { useToast } from "vue-toastification";


const toast = useToast();

useHead({
  title: "Route Creator",
  meta: [
    {
      name: "description",
      content: "Create the concurrecy and the routes that GOairways airline will provide."
    }
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "public/public_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg" }
  ]
});


components: {
  vSelect;
}
const { airports, error, loading } = useAirport();
const { models } = useModels();
console.log(models);

const counter = useCounterStore();
const airportStore = useAirportsStore();

// Vincula los v-select con los datos del store
const selectedAirportFrom = ref(null);
const selectedAirportTo = ref(null);

// Cuando se selecciona un aeropuerto de origen
function handleAirportFromChange(selected) {
  airportStore.setAirportFrom(selected);
  console.log("Aeropuerto de origen seleccionado:", selected); // Guardamos el aeropuerto de origen en el store
}

watch(selectedAirportFrom, (newValue) => {
  if (newValue) {
    airportStore.setAirportFrom(newValue);
    nextTick(() => {
      CalculateDistance(
        airportStore.airportFrom.latitud,
        airportStore.airportFrom.longitud,
        airportStore.airportTo.latitud,
        airportStore.airportTo.longitud
      );
      airportStore.setTipo(distance.value);
    });
    toast.success("Airport From selected!");
  }
});

watch(selectedAirportTo, (newValue) => {
  if (newValue) {
    airportStore.setAirportTo(newValue);
    nextTick(() => {
      CalculateDistance(
        airportStore.airportFrom.latitud,
        airportStore.airportFrom.longitud,
        airportStore.airportTo.latitud,
        airportStore.airportTo.longitud
      );
      airportStore.setTipo(distance.value);
    });
    toast.success("Airport To selected!");
  }
});

let distance = ref(0);

function CalculateDistance(x1, y1, x2, y2) {
  distance.value = calcularDistancia(x1, y1, x2, y2);
  airportStore.flightTime = calcularTiempo(distance.value);
}

function check() {
  airportStore.createTickets();
  if (airportStore.dailyFrequ < 1) {
    airportStore.dailyFrequ = 1;
  }
}

// Cuando se selecciona un aeropuerto de destino
function handleAirportToChange(selected) {
  airportStore.setAirportTo(selected); // Guardamos el aeropuerto de destino en el store
}

onMounted(() => {
  console.log("Aeropuertos cargados:", airports);
});

async function createRequestBody(){
  const requestBody = { ...airportStore, distance: distance.value };

  try {
    await generatePdf(requestBody);
    await createRoute(requestBody);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

</script>
<template>
  <div>
    <div class="container">
      <Header title="Check actual planes and routes!" clicker="Check Now!" />
      <div class="content">
        <RouteViewer firstRoute="Home" secondRoute="Admin" thirdRoute="Route Creator"/>
        <h1>Route Creator</h1>
        <p style="margin-top: 10px;">
          Create the concurrecy and the routes that GOairways airline will
          provide.
        </p>
        <div class="form">
          <div class="destinations">
            <div class="destination">
              <label
                style="font-size: 20px; display: flex; margin-bottom: 20px"
                for="from"
                >From
                <img
                  style="margin-left: 10px; width: 25px"
                  src="public/multiple_airports_24dp_333333_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
              /></label>
              <v-select
                style="width: 500px; font-weight: 300 !important; color: #333333;"
                class="dropdown"
                v-model="selectedAirportFrom"
                :options="airports"
                label="nombre"
                placeholder="Select from airport"
              ></v-select>
            </div>
            <div class="destination">
              <label
                style="font-size: 20px; display: flex; margin-bottom: 20px;"
                for="to"
                >To
                <img
                  style="margin-left: 10px; width: 25px"
                  src="public/multiple_airports_24dp_333333_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
              /></label>
              <v-select
                style="width: 500px; font-weight: 300 !important; color: #333333;"
                class="dropdown"
                v-model="selectedAirportTo"
                :options="airports"
                label="nombre"
                placeholder="Select to aiport"
              ></v-select>
            </div>
          </div>

          <MapBoxWorld style="margin-top: 40px;" />

          <Distance :distance="distance" :tipo="airportStore.tipo" />

          <div
            class="two-selectors"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div>
              <label
                style="font-size: 20px; display: flex; margin-bottom: 20px"
                for="from"
                >Daily Take-Off Frequency
                <img
                  style="margin-left: 10px; width: 25px"
                  src="public/flight_takeoff_24dp_333333_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
              /></label>
              <input
                style="
                  width: 500px;
                  font-weight: 300 !important;
                  padding: 10px;
                  font-size: 18px;
                "
                type="number"
                v-model="airportStore.dailyFrequ"
                placeholder="0"
                @change="check"
              />
            </div>

            <div style="margin-left: 20px">
              <label
                style="font-size: 20px; display: flex; margin-bottom: 20px"
                for="from"
                >Select Days
                <img
                  style="margin-left: 10px; width: 25px"
                  src="public/today_24dp_333333_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
              /></label>
              <div class="date-selector" style="display: flex; flex-wrap: wrap;">
                <Date
                  v-for="day in airportStore.DaysAWeek"
                  :key="day"
                  :id="day"
                  :name="day"
                  :value="day"
                  @click="airportStore.addDay(day)"
                />
              </div>
            </div>
          </div>

          <div class="bubbles wrapper" style="display: flex; margin-top: 40px">
            <div
              v-for="day in airportStore.SelectedDays"
              :key="day"
              class="bubble"
              style="
                background: #e03131;
                color: #ffffff;
                padding: 10px;
                border-radius: 30px;
                font-size: 13px;
                margin-left: 10px;
              "
            >
              {{ day }}
            </div>
          </div>

          <div
            v-if="airportStore.dailyFrequ > 0"
            style="
              margin-top: 70px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
            "
          >
            <h2 style="color: #333333; font-weight: 500">
              Select Take-Off Hours
            </h2>
          </div>

          <div class="route-ticket wrapper" style="margin-bottom: 70px;">
            <TakeOffTicket
              v-for="ticket in airportStore.takeOffTickets" :key="ticket"
              :distance="distance"
              :airportStore="ticket"
              :day="day"
              :calculateLandingTime="calculateLandingTime"
            />
          </div>


          <div class="carrousel">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                width: 100%;
                margin-top: 30px;
              "
            >
              <span
                v-if="airportStore.tipo"
                style="font-weight: 300; display: flex"
              >
                Showing {{ airportStore.tipo }} Planes
                <img
                  style="margin-left: 10px"
                  src="public/flight_24dp_333333_FILL0_wght400_GRAD0_opsz24.svg"
                  alt=""
              /></span>
            </div>

            <div class="bubbles wrapper" style="display: flex; margin-top: 40px">
            <div
              v-for="plane in airportStore.selectedModels"
              :key="plane"
              class="bubble"
              style="
                background: #05164d;
                color: #ffffff;
                padding: 10px;
                border-radius: 30px;
                font-size: 13px;
                margin-left: 10px;
              "
            >
            {{ plane.modelo }}
            </div>
          </div>


            <div v-for="model in models" :key="model.id">
              <Plane
                v-if="model.tipo == airportStore.tipo"
                :model="model"
                :adder="() => airportStore.appendModel(model)"
              />
            </div>
          </div>
        </div>

        <p style="margin-top: 100px;">
          La solicitud que estás a punto de enviar será remitida al gestor de rutas para su  revisión y aprobación. Recibirás una notificación una vez que se tome una decisión. ¡Gracias por tu paciencia!
        </p>
        <div style="display: flex; flex-direction: column; margin-top: 30px; margin-bottom: 100px;">
          <button @click="createRequestBody" class="finisher" style="border: none; padding: 20px; background: #e03131; color: #ffffff; font-size: 22px; margin-bottom: 10px; font-weight: 300; display: flex; justify-content: center;">Send to approval <img style="margin-left: 10px;" src="public/send_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24 (1).svg" alt=""></button>
            <button @click="downloadPdf" class="finisher" style="border: none; padding: 20px; background: #000b1d; color: #ffffff; font-size: 22px; margin-bottom: 10px; font-weight: 300; display: flex; justify-content: center;">Download PDF <img style="margin-left: 10px;" src="public/picture_as_pdf_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

.finisher:hover {
  cursor: pointer;
  background: #ffffff !important;
  color: #e03131 !important;
  transition: all 0.3s;
}

.date {
  margin: 10px;
  font-weight: 300;
}

.plane-card:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
}

.plane-card {
  width: 100%;
  height: 250px;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-sizing: border-box !important;
}

.calculator {
  cursor: pointer;
}

.clicker:hover {
  background-color: #ffffff !important;
  color: #e03131 !important;
  font-weight: 500 !important;
  transition: all 0.3s;
}

.clicker {
  cursor: pointer;
}

.card {
  color: #ffffff;
  width: 280px;
  height: 150px;
  background-color: #e03131;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
}

*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box !important;
  font-family: roboto !important;
}

.header {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/Lufthansa orders 10 Airbus A350-1000 and 5 more A350-900 aircraft_A350-1000_RR_DLH_001.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.header2 {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/560542_1732036177.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.header3 {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/1314124.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.header4 {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/view-of-apron-during-the-blue-hour.JPG");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.header5 {
  width: 100%;
  min-height: 400px;
  height: 400px !important;
  background-image: url("public/f-wzhg-lufthansa-airbus-a350-941_PlanespottersNet_1112976_337ee9f0d0_o (1).jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
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


.destinations {
  display: flex;
  justify-content: space-between;
}

.form {
  margin-top: 40px;
}

.dropdown {
  width: 400px;
}

.container {
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.content {
  padding: 40px !important;
  width: 100%;
  max-width: 1100px !important;
}

.content h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333333;
}

.content p {
  font-size: 1.2rem;
  font-weight: 300;
  color: #333333;
}
</style>
