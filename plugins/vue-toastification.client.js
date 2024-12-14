import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Importa los estilos
import { defineNuxtPlugin } from '#app';

// Opciones de configuración para las notificaciones
const options = {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
};

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, options);
});
