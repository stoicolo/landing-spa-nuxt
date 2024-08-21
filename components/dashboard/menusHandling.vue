<template>
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Menú</h2>
      <ul class="space-y-4">
        <li 
          v-for="item in mymenu" 
          :key="item.pageId"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center p-4">
            <svg class="w-6 h-6 text-gray-400 mr-4 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <a 
              :href="item.href" 
              class="flex-grow text-lg text-gray-700"
              :class="route.path === item.href ? 'font-semibold' : ''"
            >
              {{ item.menuName }}
            </a>
            <div class="flex space-x-2">
              <button @click="editItem(item)" class="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button @click="showDeleteConfirmation(item)" class="text-red-500 hover:text-red-700 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
  
      <!-- Modal de Confirmación -->
      <ConfirmationModal
        v-if="showModal"
        :title="'Confirmar Eliminación'"
        :description="'¿Estás seguro de que quieres eliminar este ítem del menú?'"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useMenuStore } from '~/stores/menu';
  import { useRoute } from 'vue-router';
  import ConfirmationModal from '~/components/helpers/confirmationModal.vue';
  
  const menuStore = useMenuStore();
  const route = useRoute();
  const mymenu = ref([]);
  const showModal = ref(false);
  const itemToDelete = ref(null);
  
  onMounted(async () => {
    changeActiveItemMenu();
    loadMyMenu();
  });
  
  function changeActiveItemMenu() {
    menuStore.setActiveMenu(route.path);
  }
  
  function loadMyMenu() {
    mymenu.value = menuStore.getMenu();
    menuStore.setMenuList(mymenu.value);
    console.log(mymenu.value);
  }
  
  function editItem(item) {
    console.log('Editar item:', item);
    // Aquí puedes implementar la lógica para editar el item
  }
  
  function showDeleteConfirmation(item) {
    itemToDelete.value = item;
    showModal.value = true;
  }
  
  function confirmDelete() {
    console.log('Item borrado:', itemToDelete.value);
    // Aquí implementarías la lógica real para eliminar el item del menú
    // Por ejemplo: menuStore.deleteMenuItem(itemToDelete.value.pageId);
    showModal.value = false;
    itemToDelete.value = null;
  }
  
  function cancelDelete() {
    showModal.value = false;
    itemToDelete.value = null;
  }
  </script>