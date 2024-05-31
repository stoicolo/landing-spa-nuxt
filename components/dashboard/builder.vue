<template>
    <div class="flex items-center p-2">
        <span class="mr-3">Preview</span>
        <button @click="viewModeChange" :class="{'bg-blue-600': viewMode, 'bg-gray-200': !viewMode}" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span class="sr-only">Enable view mode</span>
            <span :class="{'translate-x-6': viewMode, 'translate-x-1': !viewMode}" class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
        </button>
    </div>
    <div v-if="sortedSections.length">
        <template v-for="(section, index) in sortedSections" :key="section.id" v-memo="[section.position, viewMode]">
            <div class="section-wrapper">
                <component v-if="section.widget && section.widget.element"
                    :is="getComponent(section.widget.name, section.widget.element)" v-bind="section.widget.element" :viewMode="viewMode" :id="section.id" />
                <div class="section-actions" v-if="!viewMode">
                    <button @click="templateStore.removeSectionById(section.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    <button @click="templateStore.moveWidgetInSection(section.id, 'up')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                        </svg>
                    </button>
                    <button @click="templateStore.moveWidgetInSection(section.id, 'down')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                        </svg>
                    </button> 
                    <button @click="openComponentsSelectedWithCurrentPosition(section.position + 1)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            
        </template>
    </div>
    <div v-else>
        <div
            class="empty-state flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-400 rounded-lg">
            <div class="icon-container mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-700 mb-4">¡Añade tu primer sección!</h2>
            <button @click="showComponentsModal = !showComponentsModal"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Añadir
                sección</button>
        </div>
    </div>
    <ComponentsSelector v-if="showComponentsModal" @close="toggleComponentsModal" @add-component="component => addComponentSelected(component, currentPosition)" />
</template>


<script setup>
import { ref, computed } from 'vue';
import ComponentsSelector from '~/components/dashboard/componentsSelector.vue';
import { useTemplateStore } from '~/stores/template';
import { useComponentsStore } from '~/stores/components';

const templateStore = useTemplateStore();
const viewMode = ref(false);
const showComponentsModal = ref(false);
let currentPosition = ref(0);

templateStore.loadTemplateStructure();

// Computed para ordenar las secciones basado en su posición
const sortedSections = computed(() => {
  const objectTemplate = JSON.parse(JSON.stringify(templateStore.structure.structure.page_template.sections));
  if (!objectTemplate) {
    console.error("Estructura no definida o incompleta en sections");
    return [];
  }
  console.log("objectTemplate: ", objectTemplate);
  return objectTemplate.sort((a, b) => a.position - b.position);
});

// Computed para manejar los componentes disponibles
const components = computed(() => {
  const objectComponents = JSON.parse(JSON.stringify(componentsStore.components));
  if (!objectComponents) {
    console.error("Estructura no definida o incompleta en components");
    return [];
  }
  return objectComponents;
});

function getComponent(widgetName, element) {
  return defineAsyncComponent(() =>
    import(`@/components/sections/${widgetName}.vue`)
      .catch(error => {
        console.error('Failed to load component:', error);
      })
  );
}

function viewModeChange() {
  viewMode.value = !viewMode.value;
}

function toggleComponentsModal() {
  showComponentsModal.value = !showComponentsModal.value;
}

function addComponentSelected(component, position) {
  console.log('Component selected:', component);
  console.log('Component position:', position);
  templateStore.addSection(component, position);
}

function openComponentsSelectedWithCurrentPosition(position) {
    currentPosition.value = position;
    showComponentsModal.value = true;
}
</script>
