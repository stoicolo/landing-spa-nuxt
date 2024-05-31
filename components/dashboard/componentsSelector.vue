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
    <div class="modal-container">
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="component in components"
          :key="component.id"
          @click="selectComponent(component)"
          :class="{'border-4 border-blue-600': selectedComponent === component}"
          class="component-item cursor-pointer"
        >
          <img :src="component.image" alt="">
          <div class="text-center">{{ component.name }}</div>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="$emit('close')">X</button>
        <button @click="$emit('add-component', selectedComponent)">Agregar</button>
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
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.component-item img {
  width: 100%; /* Ajusta según sea necesario */
}
</style>