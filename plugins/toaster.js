// plugins/toaster.js
import { createApp, h } from 'vue';
import ToasterComponent from '~/components/helpers/toaster.vue';

export default defineNuxtPlugin((nuxtApp) => {
  const mountToaster = (props) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const toasterInstance = createApp({
      render() {
        return h(ToasterComponent, { ...props });
      },
      unmounted() {
        container.remove(); // Asegura la limpieza del DOM
      }
    });
    toasterInstance.mount(container);
  };

  nuxtApp.provide('toaster', {
    show: (props) => {
      mountToaster(props);
    }
  });
});
