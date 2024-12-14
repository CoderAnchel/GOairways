<template>
    <div class="image-cell">
      <img :src="imageUrl" alt="Plane Image" />
    </div>
  </template>

  <script setup>
  import { defineProps, computed } from 'vue';

  const props = defineProps(['params']);

  const imageUrl = computed(() => {
    return `/${props.params.value}.jpg`; // Ajusta la ruta según sea necesario
  });
  </script>

  <style scoped>
  .image-cell img {
    width: 100px; /* Ajusta el tamaño de la imagen según sea necesario */
    height: auto;
  }
  </style>
