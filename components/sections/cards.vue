<template>
    <div class="relative w-full py-16 overflow-hidden" :class="{'bg-cover': localBackgroundType === 'image'}" :style="backgroundStyle">
      <!-- Botón de configuración -->
      <button v-if="!viewMode" @click="openConfigModal" class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button v-if="!viewMode" @click="openModalVideo" class="video-button shadow-md">
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
  
        <!-- Contenedor de tarjetas -->
        <div class="flex flex-wrap justify-center -mx-4">
          <!-- Tarjetas de servicios -->
          <div v-for="(card, index) in localCards" :key="index" class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
            <!-- Template 1 -->
            <div v-if="Number(localTemplate) === 1" class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
              <img :src="card.image" :alt="card.title" class="w-full h-48 object-cover">
              <div class="p-6 flex-grow">
                <h3 class="text-xl font-semibold mb-2">
                  <span v-if="!viewMode" @input="updateCardTitle($event, index)" @blur="saveChanges" contenteditable>{{ card.title }}</span>
                  <span v-else>{{ card.title }}</span>
                </h3>
                <p class="text-gray-600 mb-4">
                  <span v-if="!viewMode" @input="updateCardDescription($event, index)" @blur="saveChanges" contenteditable>{{ card.description }}</span>
                  <span v-else>{{ card.description }}</span>
                </p>
              </div>
              <div class="px-6 pb-6">
                <a v-if="!viewMode" class="inline-block w-full text-center py-2 px-4 rounded transition-colors duration-300" :style="{ backgroundColor: card.buttonColor, color: 'white' }">
                  {{ card.buttonText }}
                </a>
                <a v-if="viewMode" :href="card.buttonLink" class="inline-block w-full text-center py-2 px-4 rounded transition-colors duration-300" :style="{ backgroundColor: card.buttonColor, color: 'white' }">
                  {{ card.buttonText }}
                </a>
              </div>
            </div>
  
            <!-- Template 2 -->
            <div v-if="Number(localTemplate) === 2" class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div class="p-6">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img :src="card.image" :alt="card.title" class="w-full h-full object-cover">
                </div>
                <h3 class="text-xl font-semibold text-center mb-2">
                  <span v-if="!viewMode" @input="updateCardTitle($event, index)" @blur="saveChanges" contenteditable>{{ card.title }}</span>
                  <span v-else>{{ card.title }}</span>
                </h3>
                <p class="text-gray-600 text-center mb-4">
                  <span v-if="!viewMode" @input="updateCardDescription($event, index)" @blur="saveChanges" contenteditable>{{ card.description }}</span>
                  <span v-else>{{ card.description }}</span>
                </p>
              </div>
              <div class="px-6 pb-6 mt-auto">
                <a v-if="!viewMode" class="inline-block w-full text-center py-2 px-4 rounded transition-colors duration-300" :style="{ backgroundColor: card.buttonColor, color: 'white' }">
                  {{ card.buttonText }}
                </a>
                <a v-if="viewMode" :href="card.buttonLink" class="inline-block w-full text-center py-2 px-4 rounded transition-colors duration-300" :style="{ backgroundColor: card.buttonColor, color: 'white' }">
                  {{ card.buttonText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal de configuración -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
      <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
      <div class="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-modal">
        <h2 class="text-2xl font-bold mb-4">Configuración de Servicios</h2>
  
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
  
        <!-- Lista de tarjetas -->
        <div v-for="(card, index) in localCards" :key="index" class="mb-8 p-4 border rounded">
          <h3 class="text-lg font-semibold mb-2">Tarjeta {{ index + 1 }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
              <div class="flex items-center">
                <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img v-if="card.image" :src="card.image" alt="Card image" class="h-full w-full object-cover">
                  <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button @click="openCardImageModal(index)" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cambiar
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input v-model="card.title" @input="saveChanges" type="text" class="p-2 w-full border rounded" maxlength="50">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="card.description" @input="saveChanges" class="p-2 w-full border rounded" rows="3" maxlength="200"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
              <input v-model="card.buttonText" @input="saveChanges" type="text" class="p-2 w-full border rounded" maxlength="20">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Color del botón</label>
              <input v-model="card.buttonColor" @input="saveChanges" type="color" class="p-1 w-full">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">URL del botón <small>Debes tener otras páginas creadas y usar la URL respectiva, o bien utilizar una URL de un sitio externo como https://www.otraweb.com.</small></label>
              <input v-model="card.buttonLink" @input="saveChanges" type="text" class="p-2 w-full border rounded" placeholder="https://...">
            </div>
          </div>
          <button @click="removeCard(index)" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
            Eliminar tarjeta
          </button>
        </div>
  
        <!-- Botón para agregar tarjeta -->
        <button @click="addCard" class="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">
          + Agregar tarjeta
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
    <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
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
   cards:{
    type: String
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
 const localCards = ref(props.cards);
 const localWhiteTitle = ref(props.whiteTitle);
 const showModalVideo = ref(false);
 const videoId = ref('WJ3L3Tpz2tA');

 const saveTemplate = inject('saveTemplate');

 const localTemplate = computed(() => {
  let currentTemplate = props.template;
  templateStore.structure.page_template.sections.forEach((section) => {
    if (section.id === props.id) {
      currentTemplate = section.widget.element.template;
    }
  });
  return currentTemplate;
});
 
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
     localCards.value = currentSection.widget.element.cards || [];
     localWhiteTitle.value = currentSection.widget.element.whiteTitle || false;
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
 
 const isDarkBackground = computed(() => {
  if (localBackgroundType.value === 'color') {
    // Asegúrate de que backgroundColor.value sea una cadena
    const hexColor = String(localBackgroundColor.value).replace('#', '');
    // Verifica si el color es válido
    if (hexColor.length !== 6) {
      console.warn('Color de fondo inválido:', localBackgroundColor.value);
      return false;
    }
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  return false;
});
 
 function openConfigModal() {
   showConfigModal.value = true;
 }
 
 function closeConfigModal() {
   showConfigModal.value = false;
 }
 
 function addCard() {
    localCards.value.push({
    image: '/img/servicio.jpg',
    title: `Servicio ${localCards.value.length + 1}`,
    description: `Descripción del servicio ${localCards.value.length + 1}`,
    buttonText: 'Más info',
    buttonColor: '#3b82f6',
    buttonLink: '#'
    });
    saveChanges();
 }
 
 function removeCard(index) {
    localCards.value.splice(index, 1);
   saveChanges();
 }
 
 function saveChanges() {
   templateStore.updateWidgetInSection(props.id, {
     sectionTitle: localSectionTitle.value,
     backgroundType: localBackgroundType.value,
     backgroundColor: localBackgroundColor.value,
     backgroundImage: localBackgroundImage.value,
     cards: localCards.value,
     whiteTitle: localWhiteTitle.value
   });
 }

 function saveChangesAndClose() {
    saveChanges();
    closeConfigModal();
    saveTemplate();
 }
 
 function updateSectionTitle(event) {
   localSectionTitle.value = event.target.innerText;
   saveChanges();
 }
 
 function updateCardTitle(event, index) {
    localCards.value[index].title = event.target.innerText;
   saveChanges();
 }
 
 function updateCardDescription(event, index) {
    localCards.value[index].description = event.target.innerText;
   saveChanges();
 }
 
 function updateCardButtonText(index, newText) {
    localCards.value[index].buttonText = newText;
   saveChanges();
 }
 
 function updateCardButtonColor(index, newColor) {
    localCards.value[index].buttonColor = newColor;
   saveChanges();
 }
 
 function updateCardButtonLink(index, newLink) {
    localCards.value[index].buttonLink = newLink;
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
 
 // Función para abrir el modal de imágenes para la imagen de una tarjeta
 function openCardImageModal(index) {
   currentStore.setSectionId(props.id);
   currentStore.setSectionProp(`cards[${index}].image`);
   if (openGaleryImages) {
     openGaleryImages();
   } else {
     console.error('openGaleryImages function is not available');
   }
 }
 
 // Watcher para actualizar las imágenes cuando se seleccionan en el modal
 watch(() => currentStore.selectedImage, (newImage) => {
   if (currentStore.sectionId === props.id) {
     if (currentStore.sectionProp === "backgroundImage") {
        localBackgroundImage.value = newImage;
       localBackgroundType.value = 'image';
     } else if (currentStore.sectionProp.startsWith("cards[")) {
       const match = currentStore.sectionProp.match(/cards\[(\d+)\]\.image/);
       if (match) {
         const index = parseInt(match[1]);
         localCards.value[index].image = newImage;
       }
     }
     saveChanges();
   }
 });
 
 // Función para cambiar entre color e imagen de fondo
 function toggleBackgroundType() {
   localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
   saveChanges();
 }

 function updateBackgroundColor(newColor) {
  saveChanges();
}
 
const openModalVideo = () => {
    showModalVideo.value = true;
};

const closeModalVideo = () => {
  showModalVideo.value = false;
}
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

.custom-modal {
  left: 40px;
  position: absolute;
  top: 40px;
  max-width: 500px !important;
  height: 80vh;
  overflow-y: scroll;
}
.instruction-scroll {
  position: absolute;
  top: 10px;
  left: 552px;
  color: white;
  background: black;
  padding: 20px;
  border-radius: 20px;
}
</style>