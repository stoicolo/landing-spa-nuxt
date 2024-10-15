<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-4">Backups</h1>
    <ul class="space-y-4">
      <li v-for="backup in backupsList" :key="backup.id" class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
            <h2 class="font-semibold">Página: {{ backup.pageName }} | {{ backup.backupName }}</h2>
            <div class="flex items-center mt-1">
              <p class="text-sm text-gray-500 mr-4">Creado el: {{ new Date(backup.createdAt).toLocaleDateString() }}</p>
              <select v-model="backup.selectedPageId" class="py-1 px-6 text-xs border rounded">
                <option value="">Seleccionar página para restaurar</option>
                <option v-for="page in pagesList" :key="page.id" :value="page.id">
                  {{ page.pageName }}
                </option>
              </select>
            </div>
          </div>
        <div class="flex space-x-2">
          <button @click="useBackup(backup)" class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Restaurar
          </button>
          <button @click="deleteBackup(backup.id)" class="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Borrar
          </button>
        </div>
      </li>
    </ul>
  </div>
  <ConfirmationModal 
    v-if="isConfirmationModalOpen" 
    :title="modalTitleRemoveBackup" 
    :description="modalDescriptionRemoveBackup"
    @confirm="handleConfirmRemoveBackup"
    @cancel="handleCancelRemoveBackup"
  />
  <ConfirmationModal 
    v-if="isConfirmationModalRestoreOpen" 
    :title="modalTitleRestoreBackup" 
    :description="modalDescriptionRestoreBackup"
    @confirm="handleConfirmRestoreBackup"
    @cancel="handleCancelRestoreBackup"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PageTemplateService from '@/services/page_template';
import ConfirmationModal from '~/components/helpers/confirmationModal.vue';
import { useUserStore } from '~/stores/user';
import { useMenuStore } from '~/stores/menu';
import { useCurrentStore } from '~/stores/current';

const backupsList = ref([]);
const modalTitleRemoveBackup = '¿Estás seguro de que deseas eliminar este respaldo?';
const modalDescriptionRemoveBackup = 'Esta acción no se puede deshacer.';
const isConfirmationModalOpen = ref(false);
const isConfirmationModalRestoreOpen = ref(false);
const modalTitleRestoreBackup = `¿Estás seguro de que deseas restaurar este respaldo?`;
const modalDescriptionRestoreBackup = 'Esta acción no se puede deshacer.';
const router = useRouter();
const route = useRoute();
const backupSelected = ref(null);
const userStore = useUserStore();
const currentStore = useCurrentStore();
const pagesList = ref([]);
const menuStore = useMenuStore();
const websiteId = ref(0);

onMounted(async () => {
  await menuStore.initializeStore();
  websiteId.value = await PageTemplateService.getWebSite(currentStore.userId);
  const menusResponse = await PageTemplateService.getMenuList(websiteId.value[0].id, currentStore.userId);
  menuStore.setMenuList(menusResponse.menuDetails);
  backupsList.value = await PageTemplateService.getBackups(userStore.id);
  pagesList.value = await PageTemplateService.fetchPagesListByUserId(userStore.id);
  backupsList.value = backupsList.value.map(backup => ({
    ...backup,
    selectedPageId: ''
  }));
  changeActiveItemMenu();
});

function changeActiveItemMenu() {
  menuStore.setActiveMenu(route.path);
}

function useBackup(backup) {
  isConfirmationModalRestoreOpen.value = true;
  backupSelected.value = backup;
}

function deleteBackup(backupId) {
  isConfirmationModalOpen.value = true;
  backupSelected.value = backupsList.value.find(b => b.id === backupId);
}

async function handleConfirmRemoveBackup() {
  isConfirmationModalOpen.value = false;
  try {
    await PageTemplateService.removeBackupById(backupSelected.value.id);
    backupsList.value = await PageTemplateService.getBackups(userStore.id);
  } catch (error) {
    console.error('Error during backup deletion:', error);
  }
}

function handleCancelRemoveBackup() {
  isConfirmationModalOpen.value = false;
}

async function handleConfirmRestoreBackup() {
  isConfirmationModalRestoreOpen.value = false;
  const backupToRestore = backupSelected.value;
  let pageId, templateId;

  if (backupToRestore.selectedPageId) {
    const selectedPage = pagesList.value.find(p => p.id === backupToRestore.selectedPageId);
    pageId = selectedPage.id;
    templateId = selectedPage.templateId;
  } else {
    const originalPage = pagesList.value.find(p => p.pageName === backupToRestore.pageName);
    pageId = originalPage.id;
    templateId = backupToRestore.pageTemplateId;
  }

  try {
    await PageTemplateService.updatePageTemplate(templateId, backupToRestore.sections);
    router.push('/builder/' + JSON.stringify(pageId));
  } catch (error) {
    console.error('Error restoring backup:', error);
  }
}

function handleCancelRestoreBackup() {
  isConfirmationModalRestoreOpen.value = false;
}
</script>

<style>
/* Si deseas añadir estilos adicionales */
</style>