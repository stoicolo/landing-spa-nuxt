<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg font-bold mb-2">{{ isEditing ? 'Editar' : 'Añadir nuevo' }} ítem de menú</h2>
      <form @submit.prevent="confirmAction" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input v-model="menuItem.menuName" id="name" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="href" class="block text-sm font-medium text-gray-700">Slug</label>
          <input v-model="menuItem.slug" id="href" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="flex justify-end space-x-4 mt-5">
          <button @click="cancel" type="button" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {{ isEditing ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useMenuStore } from '~/stores/menu';

  const props = defineProps({
    editingItem: {
      type: Object as PropType<any>,
      default: null
    }
  });
  
  const emit = defineEmits(['close']);
  const menuStore = useMenuStore();
  const isEditing = ref(false);
  
  const menuItem = ref({
    menuName: '',
    order: 0,
    slug: ''
  });

  onMounted(() => {
    if (props.editingItem) {
      menuItem.value = { ...props.editingItem };
      isEditing.value = true;
    }
  });
  
  const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

  watch(() => menuItem.value.menuName, (newValue) => {
    menuItem.value.slug = generateSlug(newValue);
  });

  const confirmAction = async () => {
    try {
      if (isEditing.value) {
        await menuStore.updateMenuItem(menuItem.value);
      } else {
        await menuStore.addMenuItem(menuItem.value);
      }
      emit('close');
    } catch (error) {
      console.error('Error al guardar el ítem del menú:', error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };
  
  const confirm = () => {
    menuStore.addMenuItem(menuItem.value);
    emit('close');
  };
  
  const cancel = () => {
    emit('close');
  };
  </script>