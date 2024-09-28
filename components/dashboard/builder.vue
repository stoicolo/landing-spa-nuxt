<template>
    <div class="m-6">
        <div class="bg-white border-b border-gray-200 py-2 px-4">
            <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-700">Vista Previa</span>
                <button @click="viewModeChange" class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" :class="{'bg-indigo-600': viewMode, 'bg-gray-200': !viewMode}">
                <span class="sr-only">Habilitar modo de vista</span>
                <span :class="{'translate-x-4': viewMode, 'translate-x-0': !viewMode}" class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
            </div>
            
            <div class="flex items-center space-x-2">
                <button @click="changeToSiteView" class="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500">
                <svg class="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Pantalla Completa
                </button>

                <button @click="useTemplate" class="animate-pulse relative inline-flex items-center px-2 py-1 text-xs font-medium rounded text-black bg-orange-600 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 overflow-hidden group">
                <svg class="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Usar Plantilla
                </button>
                
                <button @click="() => saveModal = !saveModal" :disabled="loading" class="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500" :class="{ 'opacity-50 cursor-not-allowed': loading }">
                <svg v-if="!loading" class="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <svg v-else class="animate-spin mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Guardando...' : 'Guardar' }}
                </button>
                
                <button @click="() => saveBackupModal = !saveBackupModal" :disabled="loading" class="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-500" :class="{ 'opacity-50 cursor-not-allowed': loading }">
                <svg class="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                Respaldo
                </button>
                
                <button @click="publishLastChanges" :disabled="loading" class="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500" :class="{ 'opacity-50 cursor-not-allowed': loading }">
                <svg class="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ loading ? 'Publicando...' : 'Publicar' }}
                </button>
            </div>

            <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-700">Activar Web Site</span>
                <button @click="changeStatusWebSite" class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" :class="{'bg-indigo-600': activeWebSite, 'bg-gray-200': !activeWebSite}">
                <span class="sr-only">Publicar Web Site</span>
                <span :class="{'translate-x-4': activeWebSite, 'translate-x-0': !activeWebSite}" class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                </button>
            </div>
            </div>
        </div>
        <div v-if="sortedSections.length">
            <div v-if="!viewMode" class="flex justify-center items-center mt-2 mb-2 cursor-pointer" @click="openComponentsSelectedWithCurrentPosition(0)">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <span class="ml-2">Agregar Sección</span>
                </div>
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
                                    <option value="1">Plantilla 1</option>
                                    <option value="2">Plantilla 2</option>
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
                    class="w-[250px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <font-awesome-icon icon="fa fa-plus"/> Añadir sección</button>

                <button @click="useTemplate"
                    class="w-[250px] mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    <font-awesome-icon icon="fa fa-file"/> Usar plantilla</button>

                <button @click="openModalVideo"
                    class="w-[250px] mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    <font-awesome-icon icon="fa fa-play"/> Ver video explicativo</button>
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
        <ConfirmationModal 
            v-if="saveModal"
            :title="modalTitleSave" 
            :description="modalDescriptionSave"
            :cancelBtn="'Solo Guardar'"
            :acceptBtn="'Guardar y Publicar'"
            @confirm="handleConfirmSave"
            @cancel="handleCancelSave"
        />
        <SaveBackupModal 
            v-if="saveBackupModal"
            @confirm="name => handleSaveBackup(name)"
            @cancel="() => saveBackupModal = !saveBackupModal"
        />
        <TemplatesSelectModal :isOpen="openTemplates" @close="toggleTemplatesModal"/>
        <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
    </div>
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
import TemplatesSelectModal from '~/components/helpers/templatesSelectModal.vue';
import { defineEmits } from 'vue';
import modalViewVideos from '~/components/helpers/modalViewVideos.vue';

const templateStore = useTemplateStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const currentStore = useCurrentStore();
const viewMode = ref(false);
const activeWebSite = ref(false);
const showComponentsModal = ref(false);
const isConfirmationModalOpen = ref(false);
const openTemplates = ref(false);
const saveBackupModal = ref(false);
const saveModal = ref(false);
let currentPosition = ref(0);
const loading = ref(false);
const modalTitleSave = '¿Quieres publicar estos cambios ahora mismo?';
const modalTitleRemoveSection = '¿Estás seguro de eliminar esta sección?';
const modalDescriptionRemoveSection = 'Esta acción no se puede deshacer, a menos que tengas un respaldo creado.';
const modalDescriptionSave = "Puedes hacer que los cambios sean visibles en tu página web de inmediato, o simplemente guardarlos para publicarlos más tarde.";
const idSelectedSectionToDelete = ref({});
const fullscreen = ref(false);
const isStructureLoaded = ref(false);
const pageId = ref(null);
const showConfigModal = ref(false);
const currentSectionId = ref(null);
const showModalVideo = ref(false);
const videoId = ref('');

function openConfigModal(sectionId) {
  currentSectionId.value = sectionId;
  showConfigModal.value = true;
}

// Llamada al plugin custom toaster
const { $toaster } = useNuxtApp();

const emit = defineEmits(['change-to-full-screen']);

const route = useRoute()
currentStore.setPageId(pageId);

onMounted(async () => {
    currentStore.setDomain(window.location.host);
    await menuStore.initializeStore();
    if(currentStore.pageId) {
        pageId.value = currentStore.pageId;
    } else {
        pageId.value = parseInt(route.params.id);
    }
    await createNewPageAndPageTemplate();
    if(pageId.value) {
        await templateStore.loadTemplateStructure(pageId.value, userStore.id);
        await menuStore.loadMenu();
        await publishWebSite();
        isStructureLoaded.value = true;
    }
    changeActiveItemMenu();
});

function changeActiveItemMenu() {
    menuStore.setActiveMenu(route.path);
}

async function createNewPageAndPageTemplate() {
    const pageExist = await PageTemplateService.checkIfPageExist(pageId.value, userStore.id);
    if(!pageId.value && !pageExist.length) {
        try {
            //If page not exist, create new page
            menuStore.createFirstPageAndMenuItem({
                menuName: "Inicio",
                href: "/builder/1",
                slug: "inicio",
                order: 0
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
        const routeId = parseInt(route.params.id);
        
        if (routeId) {
            
            const [publishHistory, menusResponse] = await Promise.all([
                PageTemplateService.getPublishHistoryByWebsiteId(currentStore.websiteId),
                PageTemplateService.getMenuList(currentStore.websiteId, currentStore.userId)
            ]);

            currentStore.setPageId(pageId.value);

            if (publishHistory && publishHistory.length) {
                const latestPublishHistory = publishHistory[0];
                currentStore.setPublishHistoryId(latestPublishHistory.id);
                menuStore.setMenuList(menusResponse.menuDetails);
                activeWebSite.value = latestPublishHistory.isActive;
                navigateTo(`/builder/${pageId.value}`);
            } else {
                navigateTo(`/builder/${pageExist[0].id}`);
            }
        } else {
            navigateTo(`/builder/${pageExist[0].id}`);
        }
    }
    return
}


// Computed para ordenar las secciones basado en su posición
const sortedSections = computed(() => {
    if (!isStructureLoaded.value) {
        return [];
    }
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

function useTemplate() {
    openTemplates.value = true;
}

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
            delay: 6,
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
    const userId = currentStore.userId;
    //Llamada a servicio de guardar backup
    try {
        loading.value = true;
        const backupTemplate = await PageTemplateService.backupPageTemplate(userId, getCurrentTemplateSections, name, templateId, pageId.value, ['backups']);
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


async function publishLastChanges() {
    const domain = currentStore.domain;
    const publishHistoryId = currentStore.publishHistoryId;
    const isActive = activeWebSite.value;
    const publishedAt = JSON.stringify(Date());
    await PageTemplateService.changeActiveSite(
                publishHistoryId,
                domain,
                isActive,
                true,
                publishedAt
            );
    $toaster.show({
        title: "Publicado",
        description: "Se han publicado los cambios.",
        delay: 3,
        position: "top-right",
        type: "success"
    });
}

async function publishWebSite() {
    const domain = currentStore.domain;
    const websiteId = currentStore.websiteId;
    const userId = currentStore.userId;
    const menuHeaderId = currentStore.menuHeaderId;
    const publishHistoryId = currentStore.publishHistoryId;
    
    console.log(publishHistoryId, "publishHistoryId");
    if(!publishHistoryId){
            const resPublish = await PageTemplateService.createPublishRequest(
                 domain,
                 websiteId,
                 userId,
                 menuHeaderId,
                 false,
                 true
             );
     
             currentStore.setPublishHistoryId(resPublish.id);
    }
}

async function changeStatusWebSite() {
    activeWebSite.value = !activeWebSite.value;
    const domain = currentStore.domain; //TODO: Obtener esto del dominio registrado, aun no existe el modulo para esto
    const isActive = activeWebSite.value;
    const isPublic = true;
    const publishHistoryId = currentStore.publishHistoryId;
    const publishedAt = JSON.stringify(Date());
    
    await PageTemplateService.changeActiveSite(
        publishHistoryId,
        domain,
        isActive,
        isPublic,
        publishedAt
    );
}

function toggleComponentsModal() {
  showComponentsModal.value = !showComponentsModal.value;
}

async function toggleTemplatesModal() {
  openTemplates.value = !openTemplates.value;
  await templateStore.loadTemplateStructure(pageId.value, userStore.id);
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
    templateStore.removeSectionById(idSelectedSectionToDelete.value);
    saveTemplate();
    isConfirmationModalOpen.value = false;
}

function handleCancelRemoveSection() {
    isConfirmationModalOpen.value = false;
}

async function handleConfirmSave() {
    await saveTemplate();
    await publishLastChanges();
    saveModal.value = false;
}

function handleCancelSave() {
    saveTemplate();
    saveModal.value = false;
}

const openModalVideo = () => {
    showModalVideo.value = true;
  };

const closeModalVideo = () => {
    showModalVideo.value = false;
}
</script>
