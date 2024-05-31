// Importa las dependencias necesarias de Pinia
import { defineStore } from 'pinia'

// Define el store
export const useComponentsStore = defineStore('component_store', {
  state: () => ({
    isLoading: false,
    components: []
  }),
  getters: {
    // Aquí puedes añadir getters si necesitas calcular algún valor derivado del estado
  },
  actions: {
    async loadComponentStructure() {
        this.isLoading = true;
        try {
            const response = await fetch('mocks/components_mock.json'); // Cambiar para obtener de BD
            if (!response.ok) {
              throw new Error('Failed to fetch components structure');
            }
            const data = await response.json();
            this.components = data;
            this.isLoading = false;
          } catch (error) {
            console.error('Error loading the components structure:', error);
          }
    },
  },
  persist: true
});