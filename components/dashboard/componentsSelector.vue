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

function formatComponentName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
</script>

<template>
  <div class="modal-background">
    <div class="modal-container max-w-full relative">
      <div class="modal-header flex justify-between items-center p-4 border-b">
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
          class="component-item cursor-pointer border"
        >
          <div class="text-center font-bold text-blue-500 text-lg">
            {{ component.title }} <span v-if="selectedComponent === component">(seleccionado)</span>
          </div>
          <img :src="component.image" alt="" class="max-h-full w-full object-cover">
        </div>
      </div>
      <div class="modal-actions flex justify-end p-4">
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-container {
  background-color: white;
  padding: 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 95%;
  max-height: 90vh;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}
.component-item {
  cursor: pointer;
  height: auto;
  height: 300px;
  overflow: hidden;
}
.modal-header {
  width: 100%;
  background-color: white;
}
.component-item img {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
