// https://nuxt.com/docs/api/configuration/nuxt-config
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mapboxToken: process.env.MAPBOX_ACCESS_TOKEN,
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [
    'mapbox-gl/dist/mapbox-gl.css', // Estilos de Mapbox
  ]
})
