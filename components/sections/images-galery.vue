<template>
    <div ref="containerRef" class="relative h-screen w-full overflow-hidden">
      <button v-if="!viewMode" @click="openConfigModal" class="config-button absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
  
      <div v-if="localImages.length === 0" class="placeholder-container" @click="openConfigModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p class="mt-2 text-gray-600">Agregar mi primera imagen</p>
      </div>

      <button v-if="!viewMode" @click="openModalVideo" class="video-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
  
      <template v-if="localImages.length !== 0">
        <div
          v-for="(image, index) in localImages"
          :key="index"
          :class="[
            'absolute inset-0 w-full h-full transition-all duration-500 ease-in-out',
            {
              'translate-y-0 opacity-100': index === currentIndex,
              '-translate-y-full opacity-0': index < currentIndex,
              'translate-y-full opacity-0': index > currentIndex
            }
          ]"
        >
          <img :src="image.url" :alt="`Slide ${index + 1}`" class="w-full h-full object-cover" />
        </div>
        
        <div class="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          <div 
            class="w-0.5 bg-white absolute" 
            :style="{
              height: `calc(100% - ${16 * 2}px)`,
              top: '16px'
            }"
          ></div>
          <button
            v-for="(_, index) in localImages"
            :key="index"
            @click="setCurrentIndex(index)"
            :class="[
              'w-4 h-4 rounded-full mb-8 relative z-10 transition-colors duration-300 border border-yellow-400',
              index === currentIndex ? 'bg-gray-800' : 'bg-white'
            ]"
          />
        </div>
      </template>
  
      <!-- Modal de configuración -->
      <div v-if="showConfigModal" class="config-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-lg w-full">
          <h2 class="text-2xl font-bold mb-4">Configuración del Slider</h2>
          
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Gestión de Imágenes</h3>
            <div v-for="(image, index) in localImages" :key="index" class="flex items-center mb-2">
              <img :src="image.url" :alt="`Imagen ${index + 1}`" class="w-16 h-16 object-cover mr-2">
              <button @click="openImageModal(index)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Cambiar</button>
              <button @click="removeImage(index)" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
            </div>
            <button v-if="localImages.length < 10" @click="addImage" class="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Agregar imagen
            </button>
          </div>
  
          <div class="flex justify-end">
            <button @click="closeConfigModal" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">Cancelar</button>
            <button @click="saveChangesAndClose" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
    <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch, inject, nextTick } from 'vue';
  import { useTemplateStore } from '~/stores/template';
  import { useCurrentStore } from '~/stores/current';
  import modalViewVideos from '~/components/helpers/modalViewVideos.vue';
  
  const props = defineProps({
    id: { type: Number, required: true },
    viewMode: { type: Boolean, default: false },
    images: { type: Array, default: () => [] },
  });
  
  const templateStore = useTemplateStore();
  const currentStore = useCurrentStore();
  
  const currentIndex = ref(0);
  const containerRef = ref(null);
  const isScrolling = ref(false);
  const showConfigModal = ref(false);
  const localImages = ref(props.images);
  const scrollTimeout = ref(null);
  const showModalVideo = ref(false);
  const videoId = ref('6DkKubpxang');
  
  const openGaleryImages = inject('openGaleryImages', () => {
    console.warn('openGaleryImages function is not available');
  });
  
  const changeSlide = (delta) => {
    const newIndex = currentIndex.value + delta;
    if (newIndex >= 0 && newIndex < localImages.value.length) {
      currentIndex.value = newIndex;
      return true;
    }
    return false;
  };
  
  const setCurrentIndex = (index) => {
    currentIndex.value = index;
  };
  
  const openConfigModal = () => {
    showConfigModal.value = true;
  };
  
  const closeConfigModal = () => {
    showConfigModal.value = false;
  };
  
  const saveChanges = () => {
    templateStore.updateWidgetInSection(props.id, {
      images: localImages.value,
    });
  };
  
  const saveChangesAndClose = () => {
    saveChanges();
    closeConfigModal();
  };
  
  const addImage = () => {
    if (localImages.value.length < 25) {
      openImageModal(localImages.value.length);
    }
  };
  
  const removeImage = (index) => {
    localImages.value.splice(index, 1);
    saveChanges();
  };
  
  const openImageModal = (index) => {
    currentStore.setSectionId(props.id);
    currentStore.setSectionProp(`images[${index}].url`);
    if (openGaleryImages) {
      openGaleryImages();
    } else {
      console.error('openGaleryImages function is not available');
    }
  };

  const adjustScrollPosition = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    const isPartiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isFullyVisible && isPartiallyVisible) {
      const scrollTarget = window.pageYOffset + rect.top;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  }
};

const handleWheel = (e) => {
  const isFirstSlide = currentIndex.value === 0;
  const isLastSlide = currentIndex.value === localImages.value.length - 1;
  
  // Permitir scroll normal en el primer y último slide
  if ((isFirstSlide && e.deltaY < 0) || (isLastSlide && e.deltaY > 0)) {
    return;
  }
  
  // Prevenir el scroll por defecto en todos los casos
  e.preventDefault();
  
  if (isScrolling.value) return;
  
  isScrolling.value = true;
  
  if (e.deltaY > 0 && currentIndex.value < localImages.value.length - 1) {
    currentIndex.value++;
  } else if (e.deltaY < 0 && currentIndex.value > 0) {
    currentIndex.value--;
  }

  // Ajustar la posición de scroll
  adjustScrollPosition();

  // Limpiar el timeout existente si lo hay
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }

  // Establecer un nuevo timeout
  scrollTimeout.value = setTimeout(() => {
    isScrolling.value = false;
  }, 1000); // Ajusta este valor según sea necesario
};

watch(currentIndex, () => {
  nextTick(() => {
    adjustScrollPosition();
  });
});

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('wheel', handleWheel, { passive: false });
    }
  });
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('wheel', handleWheel);
  }
  // Limpiar el timeout si existe al desmontar el componente
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});
  
  watch(() => templateStore.structure.page_template.sections, (newSections) => {
    const currentSection = newSections.find(section => section.id === props.id);
    if (currentSection && currentSection.widget.element) {
      localImages.value = currentSection.widget.element.images || [];
    }
  }, { deep: true, immediate: true });
  
  watch(() => currentStore.selectedImage, (newImage) => {
    if (currentStore.sectionId === props.id) {
      const match = currentStore.sectionProp.match(/images\[(\d+)\]\.url/);
      if (match) {
        const index = parseInt(match[1]);
        if (index === localImages.value.length) {
          localImages.value.push({ url: newImage });
        } else {
          localImages.value[index] = { url: newImage };
        }
        saveChanges();
      }
    }
  });

const openModalVideo = () => {
  showModalVideo.value = true;
};

const closeModalVideo = () => {
  showModalVideo.value = false;
}
  </script>
  
  <style scoped>
  .placeholder-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f3f4f6;
    cursor: pointer;
  }
  
  .placeholder-container:hover {
    background-color: #e5e7eb;
  }

  .video-button {
    position: absolute;
    top: 66px;
    left: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 2;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
  </style>