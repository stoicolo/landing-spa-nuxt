<template>
    <header ref="headerRef" class="dynamic-header" :style="{ backgroundColor: localBackgroundColor }">
      <div class="header-content" :class="{ 'template-1': localTemplate === 1, 'template-2': localTemplate === 2 }">
        <div class="image-container" ref="imageContainerRef" :style="{ flex: `0 0 ${localImageWidth}%` }">
          <img :src="localHeaderImage" alt="Header Image" class="header-image">
        </div>
        <div class="text-content" ref="textContentRef">
          <h1 class="title" :style="{ color: localTitleColor }">
            <span class="styled-input" :contenteditable="!viewMode" @input="onInputTitle" v-text="localTitle"></span>
          </h1>
          <p class="description" :style="{ color: localTextColor }">
            <span class="styled-input" :contenteditable="!viewMode" @input="onInputDescription" v-text="localDescription"></span>
          </p>
          
          <div v-for="(circle, index) in localCircles" :key="index" 
            class="circle" 
            :style="{ 
                width: `${circle.size}px`, 
                height: `${circle.size}px`, 
                left: `${circle.positionX}%`,
                top: `${circle.positionY}%`,
                borderColor: circle.borderColor,
                backgroundImage: circle.image ? `url(${circle.image})` : 'none'
            }">
        </div>
        </div>
      </div>
  
      <button v-if="!viewMode" @click="openConfigModal" class="config-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
  
      <button v-if="!viewMode" @click="openModalVideo" class="video-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </header>
  
    <!-- Modal de configuración -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
      <div class="bg-white rounded-lg w-11/12 max-w-4xl h-[90vh] flex flex-col">
        <div class="p-6 overflow-y-auto flex-grow">
          <h2 class="text-2xl font-bold mb-4">Configuración del Header Dinámico</h2>
  
          <div class="mb-4">
            <label for="backgroundColor" class="block text-sm font-medium text-gray-700">Color de Fondo del Header</label>
            <input id="backgroundColor" v-model="localBackgroundColor" type="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
  
          <div class="mb-4">
            <label for="template" class="block text-sm font-medium text-gray-700">Template</label>
            <select id="template" v-model="localTemplate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option :value="1">Template 1</option>
              <option :value="2">Template 2</option>
            </select>
          </div>
  
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
            <input id="title" v-model="localTitle" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
  
          <div class="mb-4">
            <label for="titleColor" class="block text-sm font-medium text-gray-700">Color del Título</label>
            <input id="titleColor" v-model="localTitleColor" type="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
  
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" v-model="localDescription" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
          </div>
  
          <div class="mb-4">
            <label for="textColor" class="block text-sm font-medium text-gray-700">Color del Texto</label>
            <input id="textColor" v-model="localTextColor" type="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
  
          <div class="mb-4">
            <label for="buttonTextColor" class="block text-sm font-medium text-gray-700">Color del Texto del Botón</label>
            <input id="buttonTextColor" v-model="localButtonTextColor" type="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Imagen del Header</label>
            <div class="mt-1 flex items-center">
              <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <img v-if="localHeaderImage" :src="localHeaderImage" alt="Header" class="h-full w-full object-cover">
                <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button @click="changeImage('headerImage')" class="ml-5 bg-sky-500 hover:bg-sky-600 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm leading-4 font-medium text-white">
                Seleccionar imagen
              </button>
            </div>
          </div>
  
          <div class="mb-4">
            <label for="imageWidth" class="block text-sm font-medium text-gray-700">Ancho de la Imagen Principal (%)</label>
            <input id="imageWidth" v-model="localImageWidth" type="range" min="10" max="90" class="mt-1 block w-full">
            <span class="text-sm text-gray-500">{{ localImageWidth }}%</span>
          </div>
  
          <div v-for="(circle, index) in localCircles" :key="index" class="mb-4">
            <h3 class="text-lg font-medium text-gray-700">Círculo {{ index + 1 }}</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label :for="'circleSize' + index" class="block text-sm font-medium text-gray-700">Tamaño</label>
                <input :id="'circleSize' + index" v-model="circle.size" type="range" min="50" max="300" class="mt-1 block w-full">
                <span class="text-sm text-gray-500">{{ circle.size }}px</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label :for="'circlePositionX' + index" class="block text-sm font-medium text-gray-700">Posición X (%)</label>
                  <input :id="'circlePositionX' + index" v-model="circle.positionX" type="range" min="0" max="100" class="mt-1 block w-full">
                  <span class="text-sm text-gray-500">{{ circle.positionX }}%</span>
                </div>
                <div>
                  <label :for="'circlePositionY' + index" class="block text-sm font-medium text-gray-700">Posición Y (%)</label>
                  <input :id="'circlePositionY' + index" v-model="circle.positionY" type="range" min="0" max="100" class="mt-1 block w-full">
                  <span class="text-sm text-gray-500">{{ circle.positionY }}%</span>
                </div>
              </div>
              <div>
                <label :for="'circleBorderColor' + index" class="block text-sm font-medium text-gray-700">Color del Borde</label>
                <input :id="'circleBorderColor' + index" v-model="circle.borderColor" type="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Imagen</label>
                <div class="mt-1 flex items-center">
                    <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img v-if="circle.image" :src="circle.image" alt="Circle Image" class="h-full w-full object-cover">
                    <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </span>
                    <button @click="changeCircleImage(index)" class="ml-5 bg-sky-500 hover:bg-sky-600 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm leading-4 font-medium text-white">
                    Seleccionar imagen
                    </button>
                </div>
              </div>
            </div>
            <hr class="my-4 border-gray-200">
          </div>
  
        </div>
  
        <div class="p-4 border-t border-gray-200 bg-gray-50 flex justify-end items-center">
          <button @click="closeConfigModal" class="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancelar
          </button>
          <button @click="saveChanges" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  
    <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch, nextTick, inject } from 'vue';
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
    title: {
      type: String,
      default: 'Bienvenido a nuestro sitio'
    },
    titleColor: {
      type: String,
      default: '#000000'
    },
    description: {
      type: String,
      default: 'Descubre nuestros increíbles productos y servicios.'
    },
    textColor: {
      type: String,
      default: '#000000'
    },
    buttonText: {
      type: String,
      default: 'Saber más'
    },
    buttonLink: {
      type: String,
      default: '#'
    },
    buttonColor: {
      type: String,
      default: '#3490dc'
    },
    buttonTextColor: {
    type: String,
    default: '#ffffff'
  },
  headerImage: {
    type: String,
    default: 'https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/1727737120490_servicio-2-jpg_1'
  },
  animationDuration: {
    type: Number,
    default: 2 // duración en segundos
  },
  backgroundColor: {
    type: String,
    default: '#ffffff' // Color de fondo predeterminado
  },
  imageWidth: {
    type: Number,
    default: 50
  },
  circles: {
    type: Array,
    default: () => [
      { size: 186, positionX: 20, positionY: 50, borderColor: '#cccccc', image: 'https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/1727736731942_bg-doctor-9-jpg_1' },
      { size: 196, positionX: 50, positionY: 60, borderColor: '#cccccc', image: 'https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/1727736731942_bg-doctor-9-jpg_1' },
      { size: 104, positionX: 23, positionY: 70, borderColor: '#cccccc', image: 'https://a0x7.c18.e2-5.dev/weblox-v1/weblox-v1/images/1727736731942_bg-doctor-9-jpg_1' }
    ]
  }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const headerRef = ref(null);
const imageContainerRef = ref(null);
const textContentRef = ref(null);
const showConfigModal = ref(false);
const showModalVideo = ref(false);
const videoId = ref('xQeDHJ95nZc');

const localTemplate = ref(props.template);
const localTitle = ref(props.title);
const localTitleColor = ref(props.titleColor);
const localDescription = ref(props.description);
const localTextColor = ref(props.textColor);
const localButtonText = ref(props.buttonText);
const localButtonLink = ref(props.buttonLink);
const localButtonColor = ref(props.buttonColor);
const localButtonTextColor = ref(props.buttonTextColor);
const localHeaderImage = ref(props.headerImage);
const localBackgroundColor = ref(props.backgroundColor);
const localImageWidth = ref(props.imageWidth);
const localCircles = ref(props.circles);

const isVisible = ref(false);
const lastScrollTop = ref(0);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  checkVisibility();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = headerRef.value;
  
  if (!header) return;

  const headerRect = header.getBoundingClientRect();
  const headerBottom = headerRect.bottom;
  const headerTop = headerRect.top;

  if (headerBottom <= 400) {
    // Header is out of view, animate out
    animateOut();
  } else if (scrollTop < lastScrollTop.value && !isVisible.value) {
    // Scrolling up and header is not visible, animate in
    animateIn();
  }
  console.log(headerTop);
  if (headerTop > 300) {
    animateIn();
  }

  lastScrollTop.value = scrollTop;
};

const checkVisibility = () => {
  const header = headerRef.value;
  if (!header) return;

  const headerRect = header.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (headerRect.top < windowHeight && headerRect.bottom > 0 && !isVisible.value) {
    animateIn();
  }
};

const animateOut = () => {
  isVisible.value = false;
  if (textContentRef.value) {
    textContentRef.value.style.transition = `opacity ${props.animationDuration}s ease, transform ${props.animationDuration}s ease`;
    textContentRef.value.style.opacity = '0';
    textContentRef.value.style.transform = 'translateX(-100%)';
  }
  if (imageContainerRef.value) {
    imageContainerRef.value.style.transition = `opacity ${props.animationDuration}s ease, transform ${props.animationDuration}s ease`;
    imageContainerRef.value.style.opacity = '0';
    imageContainerRef.value.style.transform = 'translateY(-100%)';
  }
};

const animateIn = () => {
  isVisible.value = true;
  if (textContentRef.value) {
    textContentRef.value.style.transition = `opacity ${props.animationDuration}s ease, transform ${props.animationDuration}s ease`;
    textContentRef.value.style.opacity = '1';
    textContentRef.value.style.transform = 'translateX(0)';
  }
  if (imageContainerRef.value) {
    imageContainerRef.value.style.transition = `opacity ${props.animationDuration}s ease, transform ${props.animationDuration}s ease`;
    imageContainerRef.value.style.opacity = '1';
    imageContainerRef.value.style.transform = 'translateY(0)';
  }
};

const onInputTitle = (event) => {
  localTitle.value = event.target.innerText;
  saveChanges();
};

const onInputDescription = (event) => {
  localDescription.value = event.target.innerText;
  saveChanges();
};

const onInputButtonText = (event) => {
  localButtonText.value = event.target.innerText;
  saveChanges();
};

const openConfigModal = () => {
  currentStore.setSectionId(props.id);
  showConfigModal.value = true;
};

const closeConfigModal = () => {
  showConfigModal.value = false;
};

const openGaleryImages = inject('openGaleryImages', () => {
  console.warn('openGaleryImages function is not available');
});

const changeImage = (type) => {
  currentStore.setSectionId(props.id);
  currentStore.setSectionProp('headerImage'); 
  if (openGaleryImages) {
     openGaleryImages();
  } else {
     console.error('openGaleryImages function is not available');
  }
}

function changeCircleImage(index) {
   currentStore.setSectionId(props.id);
   currentStore.setSectionProp(`circles[${index}].image`);
   if (openGaleryImages) {
     openGaleryImages();
   } else {
     console.error('openGaleryImages function is not available');
   }
 }

const openModalVideo = () => {
  showModalVideo.value = true;
};

const closeModalVideo = () => {
  showModalVideo.value = false;
};

const saveChanges = () => {
  templateStore.updateWidgetInSection(props.id, {
    template: localTemplate.value,
    title: localTitle.value,
    titleColor: localTitleColor.value,
    description: localDescription.value,
    textColor: localTextColor.value,
    buttonText: localButtonText.value,
    buttonLink: localButtonLink.value,
    buttonColor: localButtonColor.value,
    buttonTextColor: localButtonTextColor.value,
    headerImage: localHeaderImage.value,
    backgroundColor: localBackgroundColor.value,
    imageWidth: localImageWidth.value,
    circles: localCircles.value
  });
  closeConfigModal();
};

watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection && currentSection.widget.element) {
    localTemplate.value = currentSection.widget.element.template ?? localTemplate.value;
    localTitle.value = currentSection.widget.element.title ?? localTitle.value;
    localTitleColor.value = currentSection.widget.element.titleColor ?? localTitleColor.value;
    localDescription.value = currentSection.widget.element.description ?? localDescription.value;
    localTextColor.value = currentSection.widget.element.textColor ?? localTextColor.value;
    localButtonText.value = currentSection.widget.element.buttonText ?? localButtonText.value;
    localButtonLink.value = currentSection.widget.element.buttonLink ?? localButtonLink.value;
    localButtonColor.value = currentSection.widget.element.buttonColor ?? localButtonColor.value;
    localButtonTextColor.value = currentSection.widget.element.buttonTextColor ?? localButtonTextColor.value;
    localHeaderImage.value = currentSection.widget.element.headerImage ?? localHeaderImage.value;
    localBackgroundColor.value = currentSection.widget.element.backgroundColor ?? localBackgroundColor.value;
    localImageWidth.value = currentSection.widget.element.imageWidth ?? localImageWidth.value;
    localCircles.value = currentSection.widget.element.circles ?? localCircles.value;
  }
}, { deep: true });

watch(() => currentStore.selectedImage, (newImage) => {
  if (currentStore.sectionId === props.id) {
    if (currentStore.sectionProp === "headerImage") {
      localHeaderImage.value = newImage;
    } else if (currentStore.sectionProp.startsWith("circles[")) {
      const match = currentStore.sectionProp.match(/circles\[(\d+)\]\.image/);
      if (match) {
        const index = parseInt(match[1]);
        localCircles.value = localCircles.value.map((circle, i) => 
            i === index ? { ...circle, image: newImage } : circle
        );
      }
    }
    saveChanges();
  }
});

watch(() => localTemplate.value, (newTemplate, oldTemplate) => {
  if (newTemplate !== oldTemplate) {
    nextTick(() => {
      checkVisibility();
    });
  }
});
</script>

<style scoped>
.dynamic-header {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.header-content {
  display: flex;
  height: 100%;
}

.template-1 {
  flex-direction: row;
}

.template-2 {
  flex-direction: row-reverse;
}

.image-container {
  overflow: hidden;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem;
  padding-top: 100px;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.action-button {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.action-button:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}

.styled-input {
  background: transparent;
  border: none;
  color: inherit;
  width: 100%;
}

.styled-input:focus {
  outline: none;
  border-bottom: 1px solid currentColor;
}

.config-button,
.video-button {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.config-button {
  top: 10px;
  left: 10px;
}

.video-button {
  top: 60px;
  left: 10px;
}

.config-button:hover,
.video-button:hover {
  background-color: rgba(255, 255, 255, 1);
}

.circle {
  position: absolute;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border-style: solid;
  border-width: 3px;
  opacity: 1;
  transform: scale(0.8);
  transition: all 0.5s ease;
  cursor: pointer;
}

.circle:hover {
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }

  .template-1,
  .template-2 {
    flex-direction: column;
  }

  .image-container,
  .text-content {
    flex: none;
    width: 100%;
  }

  .text-content {
    padding: 1rem;
    padding-top: 80px;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .circle {
    display: none;
  }

  .text-content {
    padding-top: 10px;
  }
}
</style>