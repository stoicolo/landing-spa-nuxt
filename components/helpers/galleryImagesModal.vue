<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
    <div class="bg-white p-6 rounded-lg w-3/4 max-w-4xl">
      <h2 class="text-2xl font-bold mb-4">Galería de Imágenes</h2>

      <div v-if="images.length === 0" class="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
        <p class="text-gray-500 mb-4">No hay imágenes en la galería</p>
        <label for="fileInput" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Agregar imagen del dispositivo
        </label>
        <input id="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.jpeg,.png" class="hidden">
      </div>

      <div v-else class="grid grid-cols-4 gap-4 mb-4">
        <div v-for="(image, index) in images" :key="index" class="relative">
          <img 
            :src="image.url" 
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

      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

      <div class="flex justify-between items-center mt-5">
        <label for="fileInput" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Agregar imagen
        </label>
        <input id="fileInput" type="file" @change="handleFileUpload" accept=".jpg,.jpeg,.png" class="hidden">

        <div class="space-x-4">
          <button @click="useImage" :disabled="!selectedImage" class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors">Usar Imagen</button>
          <button @click="close" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTemplateStore } from '~/stores/template';
import { useCurrentStore } from '~/stores/current';
import PageTemplateService from '~/services/page_template';

const isOpen = ref(false)
const images = ref<Array<{ url: string; selected: boolean, id: string }>>([])
const errorMessage = ref('')
const selectedImage = computed(() => images.value.find(img => img.selected))
const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const open = () => {
  isOpen.value = true
  loadImagesFromAPI()
}

const close = () => {
  isOpen.value = false;
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
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
      if (img.width < 40 || img.height < 40) {
        errorMessage.value = 'La imagen es demasiado pequeña. Mínimo 40x40 píxeles.';
      } else if (img.width > 2000 || img.height > 2000) {
        errorMessage.value = 'La imagen es demasiado grande. Máximo 2000x2000 píxeles.';
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
    debugger
    const response = await PageTemplateService.saveImageiDrive(formData);
    images.value.push({ url: response.data.url, selected: false, id: response.data.id });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    errorMessage.value = 'Error al subir la imagen. Por favor, intente de nuevo.';
  }
};

const selectImage = (index: number) => {
  images.value.forEach((img, i) => {
    img.selected = i === index
  })
}

const removeImage = async (index: number) => {
  const imageToRemove = images.value[index];
  try {
    // await axios.delete(`http://localhost:3000/delete/${imageToRemove.id}`);
    images.value.splice(index, 1);
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    errorMessage.value = 'Error al eliminar la imagen. Por favor, intente de nuevo.';
  }
}

const useImage = () => {
  if (selectedImage.value) {
    templateStore.updateWidgetInSection(currentStore.section.id, {
      [currentStore.section.prop]: selectedImage.value.url
    });
    close()
  }
}

const loadImagesFromAPI = async () => {
  try {
    //const response = await axios.get('http://localhost:3000/images');
    //images.value = response.data.map((img: any) => ({ ...img, selected: false }));
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
    errorMessage.value = 'Error al cargar las imágenes. Por favor, intente de nuevo.';
  }
}

onMounted(() => {
  loadImagesFromAPI();
});

// Exponer métodos para ser usados externamente
defineExpose({
  open,
  close
})
</script>