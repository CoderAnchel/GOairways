<script setup>
defineProps({
    title: String,
    clicker: String
})
</script>
<template>
    <div class="header5">
        <div style="margin-left: 100px" class="card">
          <h2 style="font-weight: 500; font-size: 20px">
            {{ title }}
          </h2>
          <div>
            <button
              class="clicker"
              style="
                border: 1px solid #ffffff;
                background: #e03131;
                color: #ffff;
                padding: 10px 20px;
                font-weight: 300;
              "
            >
              {{ clicker  }}
            </button>
          </div>
        </div>
        <!-- <img width="300px" src="public/Lufthansa orders 10 Airbus A350-1000 and 5 more A350-900 aircraft_A350-1000_RR_DLH_001.jpg" alt=""> -->
      </div>
</template>
