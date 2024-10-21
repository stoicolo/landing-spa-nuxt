<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]" @click="closeOnOutsideClick">
    <div class="bg-white rounded-lg w-11/12 max-w-6xl h-[90vh] flex overflow-hidden" @click.stop>
      <!-- Sidebar con menú vertical -->
      <div class="w-1/4 bg-gray-100 p-4 flex flex-col relative">
        <h2 class="text-2xl font-bold mb-4">Galería de Imágenes</h2>
        <p class="text-sm mb-2">Categorías de Imágenes</p>
        <nav class="space-y-2 overflow-y-auto flex-grow" style="max-height: 400px;">
          <button 
            v-for="item in menuItems" 
            :key="item.id"
            @click="loadImagesByCategory(item.id)" 
            :class="{
              'bg-blue-500 text-white': activeMenu === item.id,
              'bg-gray-200 text-gray-700 hover:bg-gray-300': activeMenu !== item.id
            }"
            class="w-full py-2 px-4 rounded text-left transition-colors"
          >
            {{ item.label }}
          </button>
        </nav>
        <div v-if="activeMenu === 'gallery'" class="mt-4 absolute bottom-12 left-4 right-4">
          <label for="fileInput" class="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded block text-center hover:bg-orange-600 transition-colors">
            Agregar imagen
          </label>
          <input id="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.jpeg,.png" class="hidden">
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-6 overflow-y-auto">
        <div v-if="!isLoading">
          <div v-if="activeMenu === 'gallery' && (images.length === 0 || errorMessage)" class="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <p class="text-gray-500 mb-4">No hay imágenes en la galería</p>
            <label v-if="activeMenu === 'gallery'" for="fileInput" class="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded block text-center hover:bg-orange-600 transition-colors">
              Agregar imagen
            </label>
            <input id="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.jpeg,.png" class="hidden">
          </div>
  
          <div v-else-if="activeMenu === 'gallery'" class="grid grid-cols-3 gap-4 mb-4">
            <div v-for="(image, index) in images" :key="index" class="relative">
              <img 
                :src="image.imageExternalUrl" 
                @click="selectImage(index)"
                class="w-full h-32 object-cover rounded cursor-pointer" 
                :class="{ 'border-4 border-blue-500': image.selected }"
              >
              <button @click.stop="removeImage(index)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div v-else-if="activeMenu !== 'gallery'" class="grid grid-cols-3 gap-4 mb-4">
            <div v-for="(image, index) in images" :key="index" class="relative">
              <img 
                v-if="image.id"
                :src="image.imageExternalUrl" 
                @click="selectImage(index)"
                class="w-full h-32 object-cover rounded cursor-pointer" 
                :class="{ 'border-4 border-blue-500': image.selected }"
              >
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="flex items-center justify-center h-[200px]">
          <Spinner />
        </div>

        <div v-if="errorMessage && activeMenu !== 'gallery'" class="text-red-500 mb-4">
          {{ errorMessage }}
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-end space-x-4">
        <button @click="useImage" :disabled="!selectedImage" class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors">Usar Imagen</button>
        <button @click="close" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTemplateStore } from '~/stores/template';
import { useCurrentStore } from '~/stores/current';
import PageTemplateService from '~/services/page_template';
import Spinner from '@/components/helpers/spinner.vue'

const isOpen = ref(false);
const isLoading = ref(false);
const images = ref<Array<{ imageExternalUrl: string; imageExternalId: string; selected: boolean, id: string, categories: string[] }>>([])
const errorMessage = ref('')
const selectedImage = computed(() => images.value.find(img => img.selected))
const templateStore = useTemplateStore();
const currentStore = useCurrentStore();
const activeMenu = ref('gallery');
const userRole = ref('');

const menuItems = [
  { id: 'gallery', label: 'Mi Galería', categories: ['user'] },
  { id: 'backgrounds', label: 'Imágenes de Fondo', categories: ['backgrounds'] },
  { id: 'objects', label: 'Objetos', categories: ['objects'] },
  { id: 'servicios', label: 'Servicios', categories: ['servicios'] },
  { id: 'medicina', label: 'Medicina', categories: ['medicina'] },
  { id: 'belleza', label: 'Belleza', categories: ['belleza'] },
  { id: 'vehiculos', label: 'Vehículos', categories: ['vehiculos'] },
  { id: 'restaurante', label: 'Restaurante', categories: ['restaurante'] },
]

const open = () => {
  isOpen.value = true
  userRole.value = currentStore.userRole;
}

const close = () => {
  isOpen.value = false;
}

const closeOnOutsideClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close();
  }
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  isLoading.value = true;
  if (file) {
    // Validaciones
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes

    if (!allowedTypes.includes(file.type)) {
      errorMessage.value = 'Solo se permiten imágenes JPG y PNG.';
      return;
    }

    if (file.size > maxSize) {
      errorMessage.value = 'La imagen es demasiado grande. Máximo 5MB.';
      return;
    }

    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src); // Liberar el objeto URL
      if (img.width < 20 || img.height < 20) {
        errorMessage.value = 'La imagen es demasiado pequeña. Mínimo 20x20 píxeles.';
      } else if (img.width > 4000 || img.height > 4000) {
        errorMessage.value = 'La imagen es demasiado grande. Máximo 4000x4000 píxeles.';
      } else {
        errorMessage.value = '';
        uploadImage(file);
      }
    };
    img.src = URL.createObjectURL(file);
  }
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await PageTemplateService.saveImageiDrive(formData, currentStore.websiteId, currentStore.userId);
    await loadImagesByCategory(activeMenu.value);
    isLoading.value = false;
  } catch (error) {
    console.error('Error uploading image:', error);
    errorMessage.value = 'Error al subir la imagen. Por favor, intente de nuevo.';
    isLoading.value = false;
  }
};

const selectImage = (index: number) => {
  images.value.forEach((img, i) => {
    img.selected = i === index
  })
}

const removeImage = async (index: number) => {
  const imageToRemove = images.value[index];
  isLoading.value = true;
  try {
    await PageTemplateService.deleteImageiDrive([imageToRemove.imageExternalId]);
    images.value.splice(index, 1);
    isLoading.value = false;
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    errorMessage.value = 'Error al eliminar la imagen. Por favor, intente de nuevo.';
    isLoading.value = false;
  }
}

const useImage = () => {
  const selected = selectedImage.value;
  if (selected) {
    currentStore.setLastACurrentImg(selected.imageExternalUrl);
    templateStore.updateWidgetInSection(currentStore.section.id, {
      [currentStore.section.prop]: selected.imageExternalUrl
    });
    close()
  }
}

const loadImagesByCategory = async (menuId: string) => {
  activeMenu.value = menuId;
  isLoading.value = true;
  errorMessage.value = '';
  images.value = []; // Limpiar las imágenes antes de cargar nuevas

  try {
    const selectedItem = menuItems.find(item => item.id === menuId);
    if (selectedItem) {
      if(activeMenu.value !== "gallery") {
        const fetchedImages = await PageTemplateService.getImagesByCategories(selectedItem.categories);
        if (userRole.value === "admin") {
          images.value = fetchedImages.map((img: any) => ({ ...img, selected: false }));
        } else {
          images.value = fetchedImages
          .filter((img: any) => img.categories.every((category: string) => category !== 'admin'))
          .map((img: any) => ({ ...img, selected: false }));
        }
        console.log(images.value);
      } else {
        //TODO: create ne endpoint to get images by website and category
        const fetchedImages = await PageTemplateService.getListOfImagesByWebsite(currentStore.websiteId);
        images.value = fetchedImages
        .filter((img: any) => img.categories.every((category: string) => category === 'user'))
        .map((img: any) => ({ ...img, selected: false }));
      }
    }
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
    errorMessage.value = 'Error al cargar las imágenes. Por favor, intente de nuevo.';
  } finally {
    isLoading.value = false;
  }
}

function encrypt(text: string, shift: number) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const shiftAmount = isUpperCase ? 65 : 97;
      return String.fromCharCode(((code - shiftAmount + shift) % 26) + shiftAmount);
    }
    return char;
  }).join('');
}

function decrypt(text: string, shift: number) {
  return encrypt(text, 26 - shift);
}

onMounted(async () => {
  await loadImagesByCategory('gallery');
  const userRole = decrypt(localStorage.getItem('getNumByTicket') || '', 3);
  currentStore.setUserRole(userRole);
});

defineExpose({
  open,
  close
})
</script>