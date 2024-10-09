<template>
  <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Menú</h2>
    <div class="flex justify-center mb-4">
      <button @click="publishLastChanges" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Publicar Cambios
      </button>
    </div>
      <!-- Botón de agregar superior -->
    <div class="flex justify-center mb-4">
      <button @click="openAddModal('top')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Agregar item de Menú
      </button>
    </div>
    </div>
    <draggable 
      v-model="menuItems" 
      @end="onEndDrag" 
      class="space-y-4"
      item-key="menuName"
    >
      <template #item="{ element }">
        <li 
          :key="element.menuName"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 list-none"
        >
          <div class="flex items-center p-4">
            <svg class="w-6 h-6 text-gray-400 mr-4 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <a 
              :href="element.href" 
              class="flex-grow text-lg text-gray-700"
              :class="route.path === element.href ? 'font-semibold' : ''"
            >
              {{ element.menuName }}
            </a>
            <div class="flex space-x-2">
              <button @click="hideItem(element)" class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                <font-awesome-icon v-if="!element.hidden" icon="fa fa-eye"/>
                <font-awesome-icon v-if="element.hidden" icon="fa fa-eye-slash"/>
              </button>
              <button @click="editItem(element)" class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                <font-awesome-icon icon="fa fa-pencil"/>
              </button>
              <button @click="showDeleteConfirmation(element)" class="text-red-500 hover:text-red-700 transition-colors duration-200">
                <font-awesome-icon icon="fa fa-trash"/>
              </button>
            </div>
          </div>
        </li>
      </template>
    </draggable>

    <!-- Modal de Confirmación -->
    <ConfirmationModal
      v-if="showModal"
      :title="'Confirmar Eliminación'"
      :description="'¿Estás seguro de que quieres eliminar este ítem del menú?'"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <MenuItemModal 
      v-if="showEditModal" 
      :editing-item="editingItem" 
      @close="closeEditModal" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMenuStore } from '~/stores/menu';
import { useRoute } from 'vue-router';
import ConfirmationModal from '~/components/helpers/confirmationModal.vue';
import MenuItemModal from '~/components/helpers/addMenuItemModal.vue';
import draggable from 'vuedraggable';
import PageTemplateService from '@/services/page_template';
import { useCurrentStore } from '~/stores/current';

const menuStore = useMenuStore();
const currentStore = useCurrentStore();
const route = useRoute();
const showModal = ref(false);
const showEditModal = ref(false);
const itemToDelete = ref(null);
const editingItem = ref(null);
const addPosition = ref('');
const websiteId = ref(0);

const { $toaster } = useNuxtApp();

onMounted(async () => {
  await menuStore.initializeStore();
  await menuStore.loadMenu();
  websiteId.value = await PageTemplateService.getWebSite(currentStore.userId);
  const menusResponse = await PageTemplateService.getMenuList(websiteId.value[0].id, currentStore.userId);
  const menuHeaderLoaded = await PageTemplateService.getMenuHeader(currentStore.userId, currentStore.websiteId);
  currentStore.setMenuHeaderId(menuHeaderLoaded[0].id);
  menuStore.setMenuList(menusResponse.menuDetails);
  await loadMyMenu();
  changeActiveItemMenu();
});

function changeActiveItemMenu() {
  if (route.path) {
    menuStore.setActiveMenu(route.path);
  }
}

async function loadMyMenu() {
  try {
    await menuStore.getMenu();
  } catch (error) {
    console.error('Error al cargar el menú:', error);
  }
}

const menuItems = computed(() => {
  const objectMenu = JSON.parse(JSON.stringify(menuStore.menu));
  if (!objectMenu) {
    console.error("Estructura no definida o incompleta en sections");
    return [];
  }
  return objectMenu.sort((a, b) => a.order - b.order);
});

function editItem(item) {
  console.log('Editar item:', item);
  editingItem.value = item;
  showEditModal.value = true;
}

async function hideItem(item) {
  await menuStore.updateMenuItem({...item, hidden: !item.hidden});
}

function openAddModal(position) {
  addPosition.value = position;
  editingItem.value = null;
  showEditModal.value = true;
}

function showDeleteConfirmation(item) {
  itemToDelete.value = item;
  showModal.value = true;
}

async function confirmDelete() {
  if (itemToDelete.value) {
    try {
      await menuStore.deleteMenuItem(itemToDelete.value);
      console.log('Item borrado:', itemToDelete.value);
    } catch (error) {
      console.error('Error al eliminar el ítem del menú:', error);
    }
  }
  showModal.value = false;
  itemToDelete.value = null;
}

function cancelDelete() {
  showModal.value = false;
  itemToDelete.value = null;
}

function closeEditModal() {
  showEditModal.value = false;
  editingItem.value = null;
  addPosition.value = '';
}

function onEndDrag(draggedItem) {
  const { oldIndex, newIndex } = draggedItem;
  
  const movedItem = menuItems.value.splice(oldIndex, 1)[0];
  menuItems.value.splice(newIndex, 0, movedItem);

  menuItems.value.forEach((item, index) => {
    item.order = index + 1;
  });

  menuStore.saveMenuDB(menuItems.value);
}

async function publishLastChanges() {
    const domain = currentStore.domain;
    const publishHistoryId = currentStore.publishHistoryId;
    const isActive = true;
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
</script>