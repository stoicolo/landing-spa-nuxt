<script setup>
import { ref } from 'vue';
import { useComponentsStore } from '~/stores/components';
import { computed } from '@vue/reactivity';

const componentsStore = useComponentsStore();
const selectedComponent = ref(null);
componentsStore.loadComponentStructure();

const components = computed(() => {
  console.log(componentsStore.components);
  return componentsStore.components.components
});

function selectComponent(component) {
  selectedComponent.value = component;
}
</script>

<template>
  <div class="modal-background">
    <div class="modal-container max-w-full relative"> <!-- Añadido relative aquí -->
      <div class="modal-header flex justify-between items-center p-4 border-b">
        <!-- Texto alineado a la izquierda -->
        <span class="text-gray-700 text-lg">
          <strong>Lista de Componentes</strong> | Seleccione un componente haciendo clic en él.
        </span>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4 overflow-auto p-4" style="max-height: 80vh;">
        <div
          v-for="component in components"
          :key="component.id"
          @click="selectComponent(component)"
          :class="{'border-4 border-blue-600': selectedComponent === component}"
          class="component-item cursor-pointer"
        >
          <div class="text-center font-bold text-blue-500 text-lg">
            {{ component.name.toUpperCase() }} <span v-if="selectedComponent === component">(seleccionado)</span>
          </div>
          <img :src="component.image" alt="" class="max-h-full w-full object-cover">
        </div>
      </div>
      <div class="modal-actions flex justify-end p-4"> <!-- Ajustes al layout de los botones -->
        <button 
          @click="$emit('add-component', selectedComponent)"
          :disabled="!selectedComponent"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :class="{ 'hover:bg-blue-700': selectedComponent, 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': !selectedComponent }">
          Agregar componente seleccionado
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Color de fondo negro con transparencia */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Alto z-index para asegurar que está en frente */
}
.modal-container {
  background-color: white;
  padding: 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 95%; /* Asegura un pequeño margen */
  max-height: 90vh;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Opcional: añade sombra para mejor visibilidad */
  overflow: hidden;
}
.component-item {
  cursor: pointer;
  height: auto;
  height: 300px; /* Altura máxima de 300px */
  overflow: hidden;
}
.modal-header {
  width: 100%;
  background-color: white; /* Fondo blanco para el encabezado */
}
.component-item img {
  width: 100%; /* Asegura que la imagen abarque todo el ancho */
  max-height: 100%; /* Asegura que la imagen no exceda la altura del contenedor */
  object-fit: cover; /* Ajusta la imagen para cubrir el espacio disponible */
}
</style>
