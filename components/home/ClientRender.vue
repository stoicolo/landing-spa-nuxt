<template>
    <div class="weblox-wrapper">
        <template v-for="(section, index) in sortedSections" :key="section.id" v-memo="[section.position, viewMode]">
            <div class="section-wrapper relative" :class="{'bg-blue-200 p-2 border-t-2 border-gray-500': !viewMode}">
                <component v-if="section.widget && section.widget.element"
                    :is="getComponent(section.widget.name, section.widget.element)" v-bind="section.widget.element" :viewMode="viewMode" :id="section.id" />
            </div>
        </template>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTemplateStore } from '~/stores/template';
import { useMenuStore } from '~/stores/menu';
import { useCurrentStore } from '~/stores/current';

const templateStore = useTemplateStore();
const menuStore = useMenuStore();
const currentStore = useCurrentStore();
const viewMode = ref(false);
const isStructureLoaded = ref(false);
const { $toaster } = useNuxtApp();

let pageId = currentStore.pageId;
let userId = currentStore.userId;

onMounted(async () => {
    debugger;
    if(pageId) {
        //TODO: debemos traer el usuario del microservicio que machea el dominio con un usuario y web site
        await templateStore.loadTemplateStructure(pageId, userId);
        await menuStore.loadMenu();
        isStructureLoaded.value = true;
    }
});

// Computed para ordenar las secciones basado en su posición
const sortedSections = computed(() => {
    if (!isStructureLoaded.value) {
        return [];
    }
    console.log("templateStore.structure", templateStore.structure);
    const objectTemplate = JSON.parse(JSON.stringify(templateStore.structure.page_template.sections));
    if (!objectTemplate) {
        console.error("Estructura no definida o incompleta en sections");
        $toaster.show({
                title: "Error",
                description: "Estructura no definida o incompleta en sections.",
                delay: 3,
                position: "top-right",
                type: "error"
            });
        return [];
    }
  return objectTemplate.sort((a, b) => a.position - b.position);
});

function getComponent(widgetName, element) {
  return defineAsyncComponent(() =>
    import(`@/components/sections/${widgetName}.vue`)
      .catch(error => {
        console.error('Failed to load component:', error);
        $toaster.show({
            title: "Error",
            description: "Falló al cargar el componente, refresque el navegador.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
      })
  );
}
</script>
