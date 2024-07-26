<template>
    <div class="flex items-center p-2">
        <span class="mr-3">Vista Previa</span>
        <button @click="viewModeChange" :class="{'bg-blue-600': viewMode, 'bg-gray-200': !viewMode}" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span class="sr-only">Enable view mode</span>
            <span :class="{'translate-x-6': viewMode, 'translate-x-1': !viewMode}" class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
        </button>
        <button @click="changeToSiteView" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">
            <span>Ver pantalla completa</span>
        </button>
        <button @click="saveTemplate" :disabled="loading" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
        :class="{ 'hover:bg-blue-700': loading, 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': loading }"
        >
            <span v-if="!loading">Guardar Cambios</span>
            <span v-else="loading" class="flex">...Guardando <span class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 block ml-3 mt-[2px]"></span></span>
        </button>
        <button @click="() => saveBackupModal = !saveBackupModal" :disabled="loading" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-3"
        :class="{ 'hover:bg-blue-700': loading, 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': loading }"
        >
            <span v-if="!loading">Guardar Respaldo</span>
            <span v-else="loading" class="flex">...Guardando <span class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 block ml-3 mt-[2px]"></span></span>
        </button>
        <div class="ml-2">
            <span class="mr-3">Publicar Web Site</span>
            <button @click="changeStatusWebSite" :class="{'bg-blue-600': activeWebSite, 'bg-gray-200': !activeWebSite}" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span class="sr-only">Publicar Web Site</span>
                <span :class="{'translate-x-6': activeWebSite, 'translate-x-1': !activeWebSite}" class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
            </button>
        </div>
    </div>
    <div v-if="sortedSections.length">
        <template v-for="(section, index) in sortedSections" :key="section.id" v-memo="[section.position, viewMode]">
            <div class="section-wrapper relative" :class="{'bg-blue-200 p-2 border-t-2 border-gray-500': !viewMode}">
                <component v-if="section.widget && section.widget.element"
                    :is="getComponent(section.widget.name, section.widget.element)" v-bind="section.widget.element" :viewMode="viewMode" :id="section.id" />
                <div class="section-actions absolute top-[8px] z-[50] flex justify-center items-center w-[300px] mx-auto right-[8px] bg-blue-200 rounded-bl-[20px]" v-if="!viewMode">
                    <button @click="confirmationModal(section.id)">
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
                    
                    <div class="p-2">
                        <div class="select-template max-w-xs ml-auto">
                            <label for="template" class="block text-sm font-medium text-gray-700">Selecciona una plantilla</label>
                            <select @change="event => onSelect(event, section)" :value="section.widget.element.template" id="template" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="0">Plantilla 1</option>
                                <option value="1">Plantilla 2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!viewMode" class="flex justify-center items-center mt-2 mb-2 cursor-pointer" @click="openComponentsSelectedWithCurrentPosition(section.position + 1)">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <span class="ml-2">Agregar Sección</span>
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
    <ConfirmationModal 
      v-if="isConfirmationModalOpen" 
      :title="modalTitleRemoveSection" 
      :description="modalDescriptionRemoveSection"
      @confirm="handleConfirmRemoveSection"
      @cancel="handleCancelRemoveSection"
    />
    <SaveBackupModal 
    v-if="saveBackupModal"
    @confirm="name => handleSaveBackup(name)"
    @cancel="() => saveBackupModal = !saveBackupModal"
    />
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import ComponentsSelector from '~/components/dashboard/componentsSelector.vue';
import { useTemplateStore } from '~/stores/template';
import { useMenuStore } from '~/stores/menu';
import { useUserStore } from '~/stores/user';
import { useCurrentStore } from '~/stores/current';
import PageTemplateService from '@/services/page_template';
import ConfirmationModal from '~/components/helpers/confirmationModal.vue';
import SaveBackupModal from '~/components/helpers/saveBackupModal.vue';
import { defineEmits } from 'vue';

const templateStore = useTemplateStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const currentStore = useCurrentStore();
const viewMode = ref(false);
const activeWebSite = ref(false);
const showComponentsModal = ref(false);
const isConfirmationModalOpen = ref(false);
const saveBackupModal = ref(false);
let currentPosition = ref(0);
const loading = ref(false);
const modalTitleRemoveSection = '¿Estás seguro de eliminar esta sección?';
const modalDescriptionRemoveSection = 'Esta acción no se puede deshacer, a menos que tengas un respaldo creado.';
const idSelectedSectionToDelete = ref({});
const fullscreen = ref(false);
const isStructureLoaded = ref(false);

// Llamada al plugin custom toaster
const { $toaster } = useNuxtApp();

const emit = defineEmits(['change-to-full-screen']);

const route = useRoute()
let pageId;
currentStore.setPageId(pageId);

onMounted(async () => {
    if(currentStore.pageId) {
        pageId = currentStore.pageId;
    } else {
        pageId = parseInt(route.params.id);
    }
    createNewPageAndPageTemplate();
    if(pageId) {
        await templateStore.loadTemplateStructure(pageId, userStore.id);
        await menuStore.loadMenu();
        isStructureLoaded.value = true;
    }
});

async function createNewPageAndPageTemplate() {
    debugger;
    const pageExist = await PageTemplateService.checkIfPageExist(pageId, userStore.id);
    //TODO: Debo limpiar states
    if(!pageId && !pageExist.length) {
        try {
            menuStore.createFirstPageAndMenuItem({
                menuName: "Inicio",
                href: "/inicio",
                slug: "inicio",
                order: 1
            });
        } catch (error) {
            console.error('Failed to create new page and page template:', error);
            $toaster.show({
                title: "Error",
                description: "Fallo al crear nueva página y plantilla.",
                delay: 3,
                position: "top-right",
                type: "error"
            });
        }
    } else {
        navigateTo("/builder/" + pageExist[0].id)
    }
    return
}


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

// Computed para manejar los componentes disponibles
const components = computed(() => {
  const objectComponents = JSON.parse(JSON.stringify(componentsStore.components));
  if (!objectComponents) {
    console.error("Estructura no definida o incompleta en components");
    $toaster.show({
            title: "Error",
            description: "Estructura no definida o incompleta en components.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    return [];
  }
  return objectComponents;
});

function changeToSiteView() {
    //TODO: arreglar este comportamiento
  fullscreen.value = !fullscreen.value;
  emit('change-to-full-screen', fullscreen.value);
}

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

async function saveTemplate() {
    const getCurrentTemplateSections = templateStore.structure.page_template.sections;
    const templateId = templateStore.structure.page_template.id;
    //Llamada a servicio de guardar
    try {
        loading.value = true;
        const savedTemplate = await PageTemplateService.updatePageTemplate(templateId, getCurrentTemplateSections);
        loading.value = false;
        $toaster.show({
            title: "Guardado",
            description: "Se han guardado los cambios.",
            delay: 3,
            position: "top-right",
            type: "success"
        });
    } catch (error) {
        console.error('Failed to save template:', error);
        loading.value = false;
        $toaster.show({
            title: "Error",
            description: "Fallo al guardar cambios.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    }
}

async function handleSaveBackup(name) {
    console.log(name);
    saveBackupModal.value = !saveBackupModal.value;
    const getCurrentTemplateSections = templateStore.structure.page_template.sections;
    const templateId = templateStore.structure.page_template.id;
    const userId = 1;
    //Llamada a servicio de guardar backup
    try {
        loading.value = true;
        const backupTemplate = await PageTemplateService.backupPageTemplate(userId, getCurrentTemplateSections, name, templateId, pageId);
        loading.value = false;
        $toaster.show({
            title: "Success",
            description: "Se ha guardado el respaldo con éxito.",
            delay: 3,
            position: "top-right",
            type: "success"
        });
    } catch (error) {
        console.error('Failed to save backup:', error);
        loading.value = false;
        $toaster.show({
            title: "Error",
            description: "Fallo al guardar el respaldo.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    }
}

function viewModeChange() {
  viewMode.value = !viewMode.value;
}

async function changeStatusWebSite() {
    activeWebSite.value = !activeWebSite.value;

    const domain = "test.com"; //TODO: Obtener esto del dominio registrado, aun no existe el modulo para esto
    const websiteId = currentStore.websiteId;
    const userId = currentStore.userId;
    const menuHeaderId = currentStore.menuHeaderId;
    const isActive = activeWebSite.value;
    const isPublic = true;
    const publishHistoryId = currentStore.publishHistoryId;
    
    if(activeWebSite.value ){
        if(!publishHistoryId){
            const resPublish = await PageTemplateService.createPublishRequest(
                 domain,
                 websiteId,
                 userId,
                 menuHeaderId,
                 isActive,
                 isPublic
             );
     
             currentStore.setPublishHistoryId(resPublish.id);
        } else {
            await PageTemplateService.changeActiveSite(
                publishHistoryId,
                domain,
                isActive,
                isPublic
            );
        }
    } else {
        await PageTemplateService.changeActiveSite(
            publishHistoryId,
            domain,
            isActive,
            isPublic
        );
    }
}

function toggleComponentsModal() {
  showComponentsModal.value = !showComponentsModal.value;
}

function addComponentSelected(component, position) {
  templateStore.addSection(component, position);
  toggleComponentsModal();
}

function openComponentsSelectedWithCurrentPosition(position) {
    currentPosition.value = position;
    showComponentsModal.value = true;
}

function onSelect(event, section) {
    updateTemplate(event.target.value, section);
}

function updateTemplate(templateSelected, section) {
    templateStore.updateWidgetInSection(section.id, {
        template: templateSelected
    });
}

function confirmationModal(section) {
    isConfirmationModalOpen.value = true;
    idSelectedSectionToDelete.value = section
}

function handleConfirmRemoveSection() {
    console.log("idSelectedSectionToDelete.value", idSelectedSectionToDelete.value);
    templateStore.removeSectionById(idSelectedSectionToDelete.value);
    saveTemplate();
    isConfirmationModalOpen.value = false;
}

function handleCancelRemoveSection() {
    isConfirmationModalOpen.value = false;
}
</script>
