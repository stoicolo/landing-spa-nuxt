<template>
    <div class="relative w-full py-16 overflow-hidden" :class="{'bg-cover': localBackgroundType === 'image'}" :style="backgroundStyle">
      <!-- Botón de configuración -->
      <button v-if="!viewMode" @click="openConfigModal" class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <button v-if="!viewMode" @click="openVideoModal('erwer3243')" class="video-button shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
  
      <div class="container mx-auto px-4">
        <!-- Título de la sección (opcional) -->
        <h2 v-if="localSectionTitle" class="text-3xl font-bold text-center mb-12" :class="titleClass">
          <span v-if="!viewMode" @input="updateSectionTitle($event)" @blur="saveChanges" contenteditable>{{ localSectionTitle }}</span>
          <span v-else>{{ localSectionTitle }}</span>
        </h2>
  
        <!-- Template 1: Tarjetas de video -->
        <div v-if="Number(localTemplate) === 1" class="flex flex-wrap justify-center -mx-4">
          <div v-for="(video, index) in localVideos" :key="index" class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div class="relative cursor-pointer" @click="openVideoModal(video.youtubeId)">
                <img :src="video.thumbnail" :alt="video.title" class="w-full h-48 object-cover">
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-16 h-16 text-white opacity-75" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
              </div>
              <div class="p-6 flex-grow">
                <h3 class="text-xl font-semibold mb-2">
                  <span v-if="!viewMode" @input="updateVideoTitle($event, index)" @blur="saveChanges" contenteditable>{{ video.title }}</span>
                  <span v-else>{{ video.title }}</span>
                </h3>
                <p class="text-gray-600 mb-4">
                  <span v-if="!viewMode" @input="updateVideoDescription($event, index)" @blur="saveChanges" contenteditable>{{ video.description }}</span>
                  <span v-else>{{ video.description }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Template 2: Galería de videos a pantalla completa -->
        <div v-else-if="Number(localTemplate) === 2" class="relative w-full" style="padding-top: 56.25%;">
          <div class="absolute inset-0">
            <iframe
              v-if="localVideos.length > 0"
              :src="`https://www.youtube.com/embed/${currentVideoId}`"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div v-if="localVideos.length > 1" class="absolute inset-x-0 top-[62%] flex justify-between items-center px-4 transform -translate-y-1/2">
            <button @click="prevVideo" class="bg-black bg-opacity-50 text-white rounded-full p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="nextVideo" class="bg-black bg-opacity-50 text-white rounded-full p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div v-if="localVideos.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
              v-for="(video, index) in localVideos"
              :key="index"
              @click="setCurrentVideoIndex(index)"
              class="w-3 h-3 rounded-full"
              :class="currentVideoIndex === index ? 'bg-white' : 'bg-gray-400'"
            ></button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal de configuración -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
      <div class="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Configuración de Galería de Videos</h2>
  
        <!-- Configuración general -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Fondo de la sección</label>
          <div class="flex items-center space-x-4">
            <button @click="toggleBackgroundType" class="px-4 py-2 border rounded" :class="{'bg-blue-500 text-white': localBackgroundType === 'color', 'bg-white text-gray-700': localBackgroundType !== 'color'}">Color</button>
            <button @click="toggleBackgroundType" class="px-4 py-2 border rounded" :class="{'bg-blue-500 text-white': localBackgroundType === 'image', 'bg-white text-gray-700': localBackgroundType !== 'image'}">Imagen</button>
          </div>
          <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor" @input="updateBackgroundColor" type="color" class="mt-2 p-1 w-full h-10">
          <div v-if="localBackgroundType === 'image'" class="mt-2 flex items-center">
            <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background" class="h-full w-full object-cover">
              <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button @click="openBackgroundImageModal" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cambiar imagen
            </button>
          </div>
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Título de la sección (opcional)</label>
          <input v-model="localSectionTitle" @input="saveChanges" type="text" class="p-2 w-full border rounded" placeholder="Ingrese el título de la sección">
          <div class="mt-2 flex items-center" v-if="localBackgroundType === 'image'">
            <input type="checkbox" id="whiteTitleCheckbox" v-model="localWhiteTitle" @change="saveChanges" class="mr-2">
            <label for="whiteTitleCheckbox" class="text-sm text-gray-700">Título color blanco</label>
          </div>
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Plantilla</label>
          <select v-model="localTemplate" @change="saveChanges" class="p-2 w-full border rounded">
            <option value="1">Tarjetas de video</option>
            <option value="2">Galería de videos a pantalla completa</option>
          </select>
        </div>
  
        <!-- Lista de videos -->
        <div v-for="(video, index) in localVideos" :key="index" class="mb-8 p-4 border rounded">
          <h3 class="text-lg font-semibold mb-2">Video {{ index + 1 }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ID de YouTube</label>
              <input v-model="video.youtubeId" @input="updateVideoThumbnail(index)" @blur="saveChanges" type="text" class="p-2 w-full border rounded" placeholder="Ej: dQw4w9WgXcQ">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input v-model="video.title" @input="saveChanges" type="text" class="p-2 w-full border rounded" maxlength="50">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="video.description" @input="saveChanges" class="p-2 w-full border rounded" rows="3" maxlength="200"></textarea>
            </div>
          </div>
          <button @click="removeVideo(index)" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
            Eliminar video
          </button>
        </div>
  
        <!-- Botón para agregar video -->
        <button @click="addVideo" class="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">
          + Agregar video
        </button>
  
        <div class="flex justify-end mt-6">
          <button @click="closeConfigModal" class="mr-4 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition-colors duration-300">
            Cancelar
          </button>
          <button @click="saveChangesAndClose" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  
    <modalViewVideos v-if="showVideoModal" :videoId="currentVideoId" @close="closeVideoModal" />
  </template>
  
  <script setup>
  import { ref, computed, watch, inject } from 'vue';
  import { useTemplateStore } from '~/stores/template';
  import { useCurrentStore } from '~/stores/current';
  import modalViewVideos from '~/components/helpers/modalViewVideos.vue';
  
  const props = defineProps({
    id: {
      type: Number,
      required: true,
      default: () => Date.now()
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    template: {
      type: Number,
      default: 1
    },
    sectionTitle: {
      type: String
    },
    backgroundType: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    backgroundImage: {
      type: String
    },
    videos: {
      type: Array
    },
    whiteTitle: {
      type: Boolean
    }
  });
  
  const templateStore = useTemplateStore();
  const currentStore = useCurrentStore();
  
  const showConfigModal = ref(false);
  const localSectionTitle = ref(props.sectionTitle);
  const localBackgroundType = ref(props.backgroundType);
  const localBackgroundColor = ref(props.backgroundColor);
  const localBackgroundImage = ref(props.backgroundImage);
  const localVideos = ref(props.videos);
  const localWhiteTitle = ref(props.whiteTitle);
const localTemplate = ref(props.template);
const showVideoModal = ref(false);
const currentVideoId = ref('');
const currentVideoIndex = ref(0);

// Inyectar la función para abrir el modal de imágenes
const openGaleryImages = inject('openGaleryImages', () => {
  console.warn('openGaleryImages function is not available');
});

// Watcher para cargar y actualizar los datos del componente
watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection && currentSection.widget.element) {
    localSectionTitle.value = currentSection.widget.element.sectionTitle || '';
    localBackgroundType.value = currentSection.widget.element.backgroundType || 'color';
    localBackgroundColor.value = String(currentSection.widget.element.backgroundColor || '#f3f4f6');
    localBackgroundImage.value = currentSection.widget.element.backgroundImage || '';
    localVideos.value = currentSection.widget.element.videos || [];
    localWhiteTitle.value = currentSection.widget.element.whiteTitle || false;
    localTemplate.value = currentSection.widget.element.template || 1;
  }
}, { deep: true, immediate: true });

const titleClass = computed(() => {
  return {
    'text-white': localBackgroundType.value === 'image' && localWhiteTitle.value,
    'text-gray-900': !(localBackgroundType.value === 'image' && localWhiteTitle.value)
  };
});

const backgroundStyle = computed(() => {
  if (localBackgroundType.value === 'image') {
    return { backgroundImage: `url(${localBackgroundImage.value})` };
  } else {
    return { backgroundColor: localBackgroundColor.value };
  }
});

function openConfigModal() {
  showConfigModal.value = true;
}

function closeConfigModal() {
  showConfigModal.value = false;
}

function addVideo() {
  localVideos.value.push({
    youtubeId: '',
    title: `Video ${localVideos.value.length + 1}`,
    description: `Descripción del video ${localVideos.value.length + 1}`,
    thumbnail: ''
  });
  saveChanges();
}

function removeVideo(index) {
  localVideos.value.splice(index, 1);
  saveChanges();
}

function saveChanges() {
  templateStore.updateWidgetInSection(props.id, {
    sectionTitle: localSectionTitle.value,
    backgroundType: localBackgroundType.value,
    backgroundColor: localBackgroundColor.value,
    backgroundImage: localBackgroundImage.value,
    videos: localVideos.value,
    whiteTitle: localWhiteTitle.value,
    template: localTemplate.value
  });
}

function saveChangesAndClose() {
  saveChanges();
  closeConfigModal();
}

function updateSectionTitle(event) {
  localSectionTitle.value = event.target.innerText;
  saveChanges();
}

function updateVideoTitle(event, index) {
  localVideos.value[index].title = event.target.innerText;
  saveChanges();
}

function updateVideoDescription(event, index) {
  localVideos.value[index].description = event.target.innerText;
  saveChanges();
}

function updateVideoThumbnail(index) {
  const videoId = localVideos.value[index].youtubeId;
  if (videoId) {
    localVideos.value[index].thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  } else {
    localVideos.value[index].thumbnail = '';
  }
  saveChanges();
}

// Función para abrir el modal de imágenes para la imagen de fondo
function openBackgroundImageModal() {
  currentStore.setSectionId(props.id);
  currentStore.setSectionProp("backgroundImage");
  if (openGaleryImages) {
    openGaleryImages();
  } else {
    console.error('openGaleryImages function is not available');
  }
}

// Función para cambiar entre color e imagen de fondo
function toggleBackgroundType() {
  localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
  saveChanges();
}

function updateBackgroundColor() {
  saveChanges();
}

// Funciones para el control de la galería de videos
function openVideoModal(videoId = "") {
  currentVideoId.value = videoId;
  showVideoModal.value = true;
}

function closeVideoModal() {
  showVideoModal.value = false;
}

function prevVideo() {
  currentVideoIndex.value = (currentVideoIndex.value - 1 + localVideos.value.length) % localVideos.value.length;
  currentVideoId.value = localVideos.value[currentVideoIndex.value].youtubeId;
}

function nextVideo() {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % localVideos.value.length;
  currentVideoId.value = localVideos.value[currentVideoIndex.value].youtubeId;
}

function setCurrentVideoIndex(index) {
  currentVideoIndex.value = index;
  currentVideoId.value = localVideos.value[index].youtubeId;
}

// Watcher para actualizar las imágenes cuando se seleccionan en el modal
watch(() => currentStore.selectedImage, (newImage) => {
  if (currentStore.sectionId === props.id) {
    if (currentStore.sectionProp === "backgroundImage") {
      localBackgroundImage.value = newImage;
      localBackgroundType.value = 'image';
    }
    saveChanges();
  }
});

// Inicializar el primer video si hay videos disponibles
watch(localVideos, (newVideos) => {
  if (newVideos.length > 0 && !currentVideoId.value) {
    currentVideoId.value = newVideos[0].youtubeId;
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
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