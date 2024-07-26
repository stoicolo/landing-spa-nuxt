<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">Añadir nuevo ítem de menú</h2>
        <form @submit.prevent="confirm" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="menuItem.menuName" id="name" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label for="href" class="block text-sm font-medium text-gray-700">Slug</label>
            <input v-model="menuItem.slug" id="href" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label for="order" class="block text-sm font-medium text-gray-700">Orden</label>
            <input v-model.number="menuItem.order" id="order" type="number" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div class="flex justify-end space-x-4 mt-5">
            <button @click="cancel" type="button" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
              Cancelar
            </button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useMenuStore } from '~/stores/menu';
  
  const emit = defineEmits(['close']);
  const menuStore = useMenuStore();
  
  const menuItem = ref({
    menuName: '',
    order: 0,
    slug: ''
  });
  
  const confirm = () => {
    menuStore.addMenuItem(menuItem.value);
    emit('close');
  };
  
  const cancel = () => {
    emit('close');
  };
  </script>