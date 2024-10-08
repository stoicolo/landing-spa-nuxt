<template>
    <div class="container mx-auto p-8">
      <h1 class="text-2xl font-bold mb-4">Backups</h1>
      <ul class="space-y-4">
        <li v-for="backup in backupsList" :key="backup.id" class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <h2 class="font-semibold">Página: {{ backup.pageName }} | {{ backup.backupName }}</h2>
            <p class="text-sm text-gray-500">Creado el: {{ new Date(backup.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="useBackup(backup.id, backup.pageTemplateId)" class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
  const backupIdSelected = ref(null);
  const templateIdSelected = ref(null);
  const userStore = useUserStore();
  const currentStore = useCurrentStore();
  const pageId = ref(0);
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
    changeActiveItemMenu();
  });

  function changeActiveItemMenu() {
    menuStore.setActiveMenu(route.path);
}
  
  function useBackup(backupId, templateId) {
    isConfirmationModalRestoreOpen.value = true;
    backupIdSelected.value = backupId;
    templateIdSelected.value = templateId;
  }
  
  function deleteBackup(backupId) {
    isConfirmationModalOpen.value = true;
    backupIdSelected.value = backupId;
  }

  async function handleConfirmRemoveBackup() {
    isConfirmationModalOpen.value = false;
    try {
        await PageTemplateService.removeBackupById(backupIdSelected.value);
        console.log('Backup deleted successfully');
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
        const backupToRestore = backupsList.value.find(backup => backup.id === backupIdSelected.value);
        pageId.value = pagesList.value?.find(p => p.pageName === backupToRestore.pageName);
        try {
            await PageTemplateService.updatePageTemplate(templateIdSelected.value, backupToRestore.sections);
            console.log('Backup restored successfully');
            router.push('/builder/' + JSON.stringify(pageId.value.id));
        } catch (error) {
            console.error('Error restoring backup:', error);
        }

    }

    async function handleCancelRestoreBackup() {
        isConfirmationModalRestoreOpen.value = false;
    }
  </script>
  
  <style>
  /* Si deseas añadir estilos adicionales */
  </style>
  