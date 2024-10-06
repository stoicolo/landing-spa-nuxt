<template>
  <div class="parallax-hero" ref="heroRef">
    <!-- Template 1 -->
    <div v-if="Number(localTemplate) === 1" class="hero-content">
      <div class="background-image" ref="bgImageRef" :style="backgroundImageStyle"></div>
      <div class="center-image" ref="centerImageRef">
        <img :src="localCenterImage" alt="Center Image">
      </div>
      <div class="text-container">
        <h1 class="title" ref="titleRef">
          <div class="styled-input styled-input-h1" :contenteditable="!viewMode" @input="onInputTitle"
            @blur="updateTitle" v-text="localTitle"></div>
        </h1>
        <p class="description" ref="descriptionRef">
          <div class="styled-input styled-input-p" :contenteditable="!viewMode" @input="onInputDescription"
            @blur="updateDescription" v-text="localDescription"></div>
        </p>
      </div>
      <div class="action-button">
        <a v-if="viewMode" :href="localButtonLink" :style="{ backgroundColor: localButtonColor }" ref="btnRef">
          <div class="styled-input" :contenteditable="!viewMode" @input="onInputButtonText"
            @blur="updateButtonText" v-text="localButtonText"></div>
        </a>
        <button v-if="!viewMode" :style="{ backgroundColor: localButtonColor }">
          <div class="styled-input" :contenteditable="!viewMode" @input="onInputButtonText"
              @blur="updateButtonText" v-text="localButtonText"></div>
        </button>
      </div>
      <div class="arrow-down" ref="arrowRef">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </div>

    <!-- Template 2 -->
    <div v-if="Number(localTemplate) === 2" class="hero-content template-2">
      <div class="background-image" ref="bgImageRef" :style="{ backgroundImage: `url(${localBackgroundImage})` }"></div>
      <div class="content-wrapper">
        <div class="center-image" ref="centerImageRef">
          <img :src="localCenterImage" alt="Center Image">
        </div>
        <div class="text-container">
          <h1 class="title" ref="titleRef">
            <div class="styled-input styled-input-h1" :contenteditable="!viewMode" @input="onInputTitle"
              @blur="updateTitle" v-text="localTitle"></div>
          </h1>
          <p class="description" ref="descriptionRef">
            <div class="styled-input styled-input-p" :contenteditable="!viewMode" @input="onInputDescription"
              @blur="updateDescription" v-text="localDescription"></div>
          </p>
          <div class="action-button">
            <a v-if="viewMode" :href="localButtonLink" :style="{ backgroundColor: localButtonColor }" ref="btnRef">
              <div class="styled-input" :contenteditable="!viewMode" @input="onInputButtonText"
                @blur="updateButtonText" v-text="localButtonText"></div>
            </a>

            <button v-if="!viewMode" :style="{ backgroundColor: localButtonColor }" >
              <div class="styled-input" :contenteditable="!viewMode" @input="onInputButtonText"
                @blur="updateButtonText" v-text="localButtonText"></div>
            </button>

          </div>
        </div>
      </div>
    </div>

    <!-- Botón de configuración -->
    <button v-if="!viewMode" @click="openConfigModal" class="config-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
    <button v-if="!viewMode" @click="openModalVideo" class="video-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
  </div>

  <!-- Modal de configuración -->
  <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[1001]">
    <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
    <div class="bg-white p-6 rounded-lg w-3/4 max-w-4xl custom-modal">
      <h2 class="text-2xl font-bold mb-4">Configuración del Parallax Header</h2>

      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <input type="text" id="title" v-model="localTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" v-model="localDescription" rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>

      <div class="flex flex-col gap-4 mb-4">
    <div class="flex-1 min-w-[200px]">
      <label for="buttonText" class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
      <input 
        type="text" 
        id="buttonText" 
        v-model="localButtonText"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>
    
    <div class="flex-1 min-w-[200px]">
      <label for="buttonColor" class="block text-sm font-medium text-gray-700 mb-1">Color del botón</label>
      <input 
        type="color" 
        id="buttonColor" 
        v-model="localButtonColor"
        class="w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>
    
    <div class="flex-1 min-w-[200px]">
      <label for="buttonLink" class="block text-sm font-medium text-gray-700 mb-1">Enlace del botón</label>
      <input 
        type="text" 
        id="buttonLink" 
        v-model="localButtonLink"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>
  </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Imagen de fondo</label>
        <div class="mt-1 flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background"
              class="h-full w-full object-cover">
            <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <button type="button" @click="openImageModal('background')"
            class="ml-5 bg-blue-500 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Seleccionar imagen
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Imagen central</label>
        <div class="mt-1 flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img v-if="localCenterImage" :src="localCenterImage" alt="Center" class="h-full w-full object-cover">
            <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <button type="button" @click="openImageModal('center')"
            class="ml-5 bg-blue-500 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Seleccionar imagen
          </button>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button @click="closeConfigModal"
          class="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancelar
        </button>
        <button @click="saveChanges"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Guardar cambios
        </button>
      </div>
    </div>
  </div>
  <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, inject, watch } from 'vue';
import { useTemplateStore } from '~/stores/template';
import { useCurrentStore } from '~/stores/current';
import Rellax from 'rellax';
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
  title: {
    type: String
  },
  description: {
    type: String
  },
  backgroundImage: {
    type: String
  },
  centerImage: {
    type: String
  },
  buttonText: {
    type: String,
  },
  buttonColor: {
    type: String,
  },
  buttonLink: {
    type: String,
  }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const heroRef = ref(null);
const bgImageRef = ref(null);
const centerImageRef = ref(null);
const titleRef = ref(null);
const descriptionRef = ref(null);
const arrowRef = ref(null);
const isMobile = ref(false);
const btnRef = ref(null);
const showModalVideo = ref(false);
const videoId = ref('xQeDHJ95nZc');

const localTitle = ref(props.title);
const localDescription = ref(props.description);
const localBackgroundImage = ref(props.backgroundImage);
const localCenterImage = ref(props.centerImage);
const localButtonText = ref(props.buttonText);
const localButtonColor = ref(props.buttonColor);
const localButtonLink = ref(props.buttonLink);
const localViewMode = ref(props.viewMode);

const showConfigModal = ref(false);
const currentImageType = ref('');

let rellaxInstances = [];

const localTemplate = computed(() => {
  let currentTemplate = props.template;
  templateStore.structure.page_template.sections.forEach((section) => {
    if (section.id === props.id) {
      currentTemplate = section.widget.element.template;
    }
  });
  return currentTemplate;
});

watch(() => templateStore.structure.page_template.sections, (newSections) => {
  
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection) {
    localTitle.value = currentSection.widget.element.title;
    localDescription.value = currentSection.widget.element.description;
    localBackgroundImage.value = currentSection.widget.element.backgroundImage;
    localCenterImage.value = currentSection.widget.element.centerImage;
    localButtonText.value = currentSection.widget.element.buttonText;
    localButtonColor.value = currentSection.widget.element.buttonColor;
    localButtonLink.value = currentSection.widget.element.buttonLink;
  }
}, { deep: true });

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);

  //     speed: -2,
	//     verticalSpeed: null,
	//     horizontalSpeed: null,
  //     breakpoints: [576, 768, 1201],
  //     center: false,
  //     wrapper: null,
  //     relativeToWrapper: false,
  //     round: true,
  //     vertical: true,
  //     horizontal: false,
  //     verticalScrollAxis: "y",
  //     horizontalScrollAxis: "x",

  if(props.viewMode){
    setTimeout(() => {
      rellaxInstances = [
            new Rellax(bgImageRef.value, { speed: isMobile.value ? -7.5 : 0, center: true }),
            new Rellax(centerImageRef.value, { speed: isMobile.value ? -4.5 : -8, center: true }),
            new Rellax(titleRef.value, { speed: isMobile.value ? -1 : -1, center: true }),
            new Rellax(descriptionRef.value, { speed: isMobile.value ? -1 : -1, center: true }),
            new Rellax(btnRef.value, { speed: isMobile.value ? -0.5 : -1, center: true }),
            new Rellax(arrowRef.value, { speed: isMobile.value ? -0.5 : 1, center: true })
          ];
    }, 1000);
  }

});

onBeforeUnmount(() => {
  rellaxInstances.forEach(instance => {
    if (instance && typeof instance === 'object' && 'destroy' in instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
  window.removeEventListener('resize', checkIfMobile);
});

const backgroundImageStyle = computed(() => {
  return {
    backgroundImage: `url(${localBackgroundImage.value})`
  }
});

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 768;
  updateRellaxSpeeds();
}

function onInputTitle(event) {
  localTitle.value = event.target.innerText;
}

function onInputButtonText(event) {
  localButtonText.value = event.target.innerText;
}

function onInputDescription(event) {
  localDescription.value = event.target.innerText;
}

function updateTitle() {
  templateStore.updateWidgetInSection(props.id, {
    title: localTitle.value
  });
}

function updateButtonText() {
  templateStore.updateWidgetInSection(props.id, {
    buttonText: localButtonText.value
  });
}

function updateDescription() {
  templateStore.updateWidgetInSection(props.id, {
    description: localDescription.value
  });
}

function updateRellaxSpeeds() {
  rellaxInstances.forEach((instance, index) => {
    const speeds = [
      isMobile.value ? -7.5 : -15,
      isMobile.value ? -4.5 : -9,
      isMobile.value ? -1 : -2,
      isMobile.value ? -1 : -2,
      isMobile.value ? -0.5 : -1
    ];
    instance.options.speed = speeds[index];
    instance.refresh();
  });
}

function openConfigModal() {
  currentStore.setSectionId(props.id);
  showConfigModal.value = true;
}

function closeConfigModal() {
  showConfigModal.value = false;
}

const openGaleryImages = inject('openGaleryImages', () => {
  console.warn('openGaleryImages function is not available');
});

function openImageModal(type) {
  currentImageType.value = type;
  if (type === 'background') {
    currentStore.setSectionProp("backgroundImage");
  }
  if (type === 'center') {
    currentStore.setSectionProp("centerImage");
  }
  if (openGaleryImages) {
    openGaleryImages();
  } else {
    console.error('openGaleryImages function is not available');
  }
}

function saveChanges() {
  templateStore.updateWidgetInSection(props.id, {
    title: localTitle.value,
    description: localDescription.value,
    backgroundImage: localBackgroundImage.value,
    centerImage: localCenterImage.value,
    buttonText: localButtonText.value,
    buttonColor: localButtonColor.value,
    buttonLink: localButtonLink.value
  });
  closeConfigModal();
}

const openModalVideo = () => {
    showModalVideo.value = true;
  };

const closeModalVideo = () => {
  showModalVideo.value = false;
}
</script>

<style scoped>
/* Base styles */
.parallax-hero {
  width: 100%;
  height: 800px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Image styles */
.center-image {
  position: relative;
  width: 350px;
  height: 530px;
  margin-bottom: -8rem;
}

.center-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Text container styles */
.text-container {
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  box-sizing: border-box;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Button styles */
.action-button {
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  margin-top: 20px;
  z-index: 10;
}

.action-button a, .action-button button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;
  opacity: 0.7;
}

.action-button a:hover {
  opacity: 1;
}

/* Title and description styles */
.title,
.description {
  position: relative;
  width: 100%;
}

/* Input styles */
.styled-input {
  width: 100%;
  background: transparent;
  border: none;
  color: inherit;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  min-height: 1em;
}

.styled-input:focus {
  outline: none;
  border-bottom: 1px solid white;
}

.styled-input-h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  line-height: 1.2;
}

.styled-input-p {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

/* Arrow styles */
.arrow-down {
  width: 40px;
  height: 80px;
  position: relative;
}

.arrow-down svg {
  width: 100%;
  height: 100%;
}

/* Config button styles */
.config-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.config-button:hover {
  background-color: rgba(255, 255, 255, 1);
}

.video-button {
  position: absolute;
  top: 56px;
  left: 10px;
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

/* Template 2 specific styles */
.template-2 .hero-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.template-2 .content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.template-2 .center-image {
  width: 50%;
  height: auto;
  margin-right: 5%;
}

.template-2 .center-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 190px;
}

.template-2 .text-container {
  width: 45%;
  text-align: left;
}

.template-2 .styled-input {
  text-align: left;
}

.template-2 .styled-input-h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.template-2 .styled-input-p {
  font-size: 1.2rem;
}

/* Media queries */
@media (max-width: 768px) {
  .parallax-hero {
    height: 100vh;
  }

  .center-image {
    width: 250px;
    height: 380px;
  }

  .styled-input-h1 {
    font-size: 2rem;
  }

  .styled-input-p {
    font-size: 1rem;
  }

  .template-2 .content-wrapper {
    flex-direction: column;
  }

  .template-2 .center-image,
  .template-2 .text-container {
    width: 100%;
    margin-right: 0;
  }

  .template-2 .center-image {
    margin-bottom: 2rem;
  }
}

.custom-modal {
  left: 40px;
  position: absolute;
  top: 40px;
  width: 500px;
  max-height: 560px;
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