<script setup>
defineProps({
    firstRoute: String,
    secondRoute: String,
    thirdRoute: String
})
</script>
<template>
  <div style="display: flex; align-items: center; margin-bottom: 40px">
    <span style="font-weight: 300;">{{ firstRoute  }}</span>
    <img
      src="public/chevron_right_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg"
      alt=""
    />
    <span style="font-weight: 300;">{{ secondRoute  }}</span>
    <img
      src="public/chevron_right_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg"
      alt=""
    />
    <span style="color: #cf0707;">{{ thirdRoute  }}</span>
  </div>
</template>
