<template>
    <div class="brand-carousel" ref="componentRef" :class="{ 'bg-image': localBackgroundType === 'image' }" :style="backgroundStyle">
      <button v-if="!viewMode" @click="openConfigModal" class="config-button shadow-md">
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
  
      <div class="container">
        <div v-if="localBackgroundImage" class="background-image" ref="bgImageRef" :style="backgroundImageStyle"></div>
        <div v-else class="background-color" :style="{ backgroundColor: localBackgroundColor }"></div>
  
        <div class="carousel-content">
          <!-- Optional Title -->
          <h2 v-if="localShowTitle" :style="titleStyle" class="carousel-title">
            <textarea
              v-if="!viewMode"
              class="styled-textarea styled-textarea-h2"
              :value="localTitle"
              @input="updateTitle($event)"
              @blur="saveChanges"
              v-auto-grow
            ></textarea>
            <span v-else>{{ localTitle }}</span>
          </h2>
  
          <!-- Carousel -->
          <div class="carousel-container" :style="{ height: `${localCarouselHeight}px` }">
            <div class="carousel-track" 
                 ref="carouselWrapper"
                 :style="carouselTrackStyle">
              <!-- Original items -->
              <div v-for="(image, index) in localImages" 
                   :key="index"
                   class="carousel-slide"
                   :style="slideStyle">
                <img :src="image.url" :alt="image.alt || 'Brand image'" class="brand-image">
              </div>
            </div>
  
            <!-- Optional Controls -->
            <div v-if="localShowControls" class="carousel-controls">
              <button @click="prevSlide" class="control-button prev">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="nextSlide" class="control-button next">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Optional Action Button -->
          <div v-if="localShowButton" class="action-button-container">
            <a v-if="localButtonType === 'whatsapp'" 
               :href="whatsappLink" 
               target="_blank" 
               class="action-button">
              {{ localButtonText }}
            </a>
            <a v-else 
               :href="localButtonUrl" 
               target="_blank" 
               class="action-button">
              {{ localButtonText }}
            </a>
          </div>
        </div>
      </div>
  
      <!-- Configuration Modal -->
      <div v-if="showConfigModal" class="config-modal">
        <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
        <div class="modal-content custom-modal">
          <div class="modal-scroll-content">
            <h2>Configuración del Carrusel <i class="fas fa-sliders"></i></h2>
  
            <div class="config-tabs">
              <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">General</button>
              <button :class="{ active: activeTab === 'images' }" @click="activeTab = 'images'">Imágenes</button>
              <button :class="{ active: activeTab === 'carousel' }" @click="activeTab = 'carousel'">Carrusel</button>
              <button :class="{ active: activeTab === 'button' }" @click="activeTab = 'button'">Botón</button>
            </div>
  
            <!-- General Tab -->
            <div v-if="activeTab === 'general'" class="config-section">
              <h3>Configuración General <i class="fas fa-cog"></i></h3>
              <div class="form-group">
                <label>Fondo de la sección</label>
                <div class="background-type-buttons flex mb-4">
                  <button @click="toggleBackgroundType" class="btn-primary mr-4" :class="{ 'active': localBackgroundType === 'color' }">
                    <i class="fas fa-fill-drip"></i> Color
                  </button>
                  <button @click="toggleBackgroundType" class="btn-primary" :class="{ 'active': localBackgroundType === 'image' }">
                    <i class="fas fa-image"></i> Imagen
                  </button>
                </div>
                <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor" @input="updateBackgroundColor" type="color">
                <div v-if="localBackgroundType === 'image'" class="background-image-selector">
                  <div class="image-preview-container">
                    <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background preview" class="image-preview">
                    <div v-else class="image-preview-placeholder">Sin imagen</div>
                  </div>
                  <button @click="openBackgroundImageModal" class="btn-primary">
                    <i class="fas fa-upload"></i> Cambiar imagen de fondo
                  </button>
                </div>
              </div>
  
              <div class="form-group">
                <label>Título del carrusel</label>
                <div class="title-config">
                  <div class="checkbox-group">
                    <input type="checkbox" id="showTitle" v-model="localShowTitle">
                    <label for="showTitle">Mostrar título</label>
                  </div>
                  <template v-if="localShowTitle">
                    <textarea
                      v-model="localTitle"
                      @input="saveChanges"
                      class="styled-textarea"
                      placeholder="Ingrese el título del carrusel"
                      v-auto-grow
                    ></textarea>
                    <input type="color" v-model="localTitleColor" @input="saveChanges">
                  </template>
                </div>
              </div>
            </div>
  
            <!-- Images Tab -->
            <div v-if="activeTab === 'images'" class="config-section">
              <h3>Gestión de Imágenes <i class="fas fa-images"></i></h3>
              <div class="images-grid">
                <div v-for="(image, index) in localImages" :key="index" class="image-config">
                  <div class="image-preview">
                    <img :src="image.url || '/img/default-image.jpg'" :alt="`Marca ${index + 1}`">
                  </div>
                  <div class="image-actions">
                    <button @click="openImageModal(index)" class="btn-primary">
                      <i class="fas fa-exchange-alt"></i> Cambiar imagen
                    </button>
                    <button @click="removeImage(index)" class="btn-danger">
                      <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
              <button v-if="localImages.length < 10" @click="addImage" class="btn-success">
                <i class="fas fa-plus"></i> Agregar nueva marca
              </button>
            </div>
  
            <!-- Carousel Tab -->
            <div v-if="activeTab === 'carousel'" class="config-section">
              <h3>Configuración del Carrusel <i class="fas fa-sliders"></i></h3>
              <div class="form-group">
                <label for="carouselHeight">Altura del carrusel: {{ localCarouselHeight }}px</label>
                <input type="range" id="carouselHeight" v-model="localCarouselHeight" min="100" max="500" step="10">
              </div>
  
              <div class="form-group">
                <div class="checkbox-group">
                  <input type="checkbox" id="showControls" v-model="localShowControls">
                  <label for="showControls">Mostrar controles de navegación</label>
                </div>
              </div>
  
              <div class="form-group">
                <div class="checkbox-group">
                  <input type="checkbox" id="autoPlay" v-model="localAutoPlay">
                  <label for="autoPlay">Reproducción automática</label>
                </div>
                <template v-if="localAutoPlay">
                  <label for="autoPlaySpeed">Velocidad de reproducción: {{ localAutoPlaySpeed }}ms</label>
                  <input type="range" id="autoPlaySpeed" v-model="localAutoPlaySpeed" min="1000" max="10000" step="500">
                </template>
              </div>
            </div>
  
            <!-- Button Tab -->
            <div v-if="activeTab === 'button'" class="config-section">
              <h3>Configuración del Botón <i class="fas fa-link"></i></h3>
              <div class="form-group">
                <div class="checkbox-group">
                  <input type="checkbox" id="showButton" v-model="localShowButton">
                  <label for="showButton">Mostrar botón de acción</label>
                </div>
              </div>
  
              <template v-if="localShowButton">
                <div class="form-group">
                  <label for="buttonText">Texto del botón</label>
                  <input type="text" id="buttonText" v-model="localButtonText" @input="saveChanges">
                </div>
  
                <div class="form-group">
                  <label>Tipo de botón</label>
                  <div class="radio-group">
                    <label>
                      <input type="radio" v-model="localButtonType" value="url">
                      URL externa
                    </label>
                    <label>
                      <input type="radio" v-model="localButtonType" value="whatsapp">
                      WhatsApp
                    </label>
                  </div>
                </div>
  
                <div class="form-group">
                  <label for="buttonLink">
                    {{ localButtonType === 'whatsapp' ? 'Número de WhatsApp' : 'URL' }}
                  </label>
                  <input type="text" id="buttonLink" 
                         :value="localButtonType === 'whatsapp' ? localPhoneNumber : localButtonUrl"
                         @input="handleButtonLinkInput"
                         :placeholder="localButtonType === 'whatsapp' ? '+1234567890' : 'https://example.com'">
                </div>
              </template>
            </div>
          </div>
          
          <div class="modal-actions">
            <button @click="closeConfigModal" class="btn-secondary">
              <i class="fas fa-times"></i> Cancelar
            </button>
            <button @click="saveChangesAndClose" class="btn-primary">
              <i class="fas fa-save"></i> Guardar cambios
            </button>
          </div>
        </div>
      </div>
      
      <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, inject, onMounted, onUnmounted } from 'vue';
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
    title: {
      type: String,
      default: 'Nuestras Marcas'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: '#2D3748'
    },
    backgroundType: {
      type: String,
      default: 'color'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    carouselHeight: {
      type: Number,
      default: 200
    },
 showControls: {
   type: Boolean,
   default: true
 },
 autoPlay: {
   type: Boolean,
   default: true
 },
 autoPlaySpeed: {
   type: Number,
   default: 3000
 },
 images: {
   type: Array,
   default: () => []
 },
 showButton: {
   type: Boolean,
   default: false
 },
 buttonText: {
   type: String,
   default: 'Contáctanos'
 },
 buttonType: {
   type: String,
   default: 'url'
 },
 buttonUrl: {
   type: String,
   default: ''
 },
 phoneNumber: {
   type: String,
   default: ''
 }
});

// Store and injections
const templateStore = useTemplateStore();
const currentStore = useCurrentStore();
const saveTemplate = inject('saveTemplate');
const openGaleryImages = inject('openGaleryImages', () => {
 console.warn('openGaleryImages function is not available');
});

// Local state
const componentRef = ref(null);
const bgImageRef = ref(null);
const carouselWrapper = ref(null);
const showConfigModal = ref(false);
const activeTab = ref('general');
const currentIndex = ref(0);
const showModalVideo = ref(false);
const videoId = ref('ZvDn_VTNgtM');

// Auto-scroll state
let autoPlayInterval = null;
let scrollListener = null;
let resizeObserver = null;

// Local reactive refs
const localTitle = ref(props.title);
const localShowTitle = ref(props.showTitle);
const localTitleColor = ref(props.titleColor);
const localBackgroundType = ref(props.backgroundType);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundImage = ref(props.backgroundImage);
const localCarouselHeight = ref(props.carouselHeight);
const localShowControls = ref(props.showControls);
const localAutoPlay = ref(props.autoPlay);
const localAutoPlaySpeed = ref(props.autoPlaySpeed);
const localImages = ref(props.images);
const localShowButton = ref(props.showButton);
const localButtonText = ref(props.buttonText);
const localButtonType = ref(props.buttonType);
const localButtonUrl = ref(props.buttonUrl);
const localPhoneNumber = ref(props.phoneNumber);

const vAutoGrow = {
 mounted(el) {
   el.style.overflow = 'hidden';
   el.style.resize = 'none';
   el.style.boxSizing = 'border-box';
   
   const resize = () => {
     el.style.height = '40px';
     el.style.height = `${el.scrollHeight}px`;
   };
   
   el.__resizeListener = resize;
   el.addEventListener('input', resize);
   
   setTimeout(resize, 0);
 },
 updated(el) {
   el.__resizeListener();
 },
 unmounted(el) {
   el.removeEventListener('input', el.__resizeListener);
 }
};

// Computed properties
const visibleSlides = computed(() => {
 const baseHeight = 200;
 const ratio = baseHeight / localCarouselHeight.value;
 return Math.max(Math.ceil(4 * ratio), 1);
});

const slideWidth = computed(() => {
 return 100 / visibleSlides.value;
});

const slideStyle = computed(() => ({
 width: `${slideWidth.value}%`,
 flex: `0 0 ${slideWidth.value}%`
}));

const carouselTrackStyle = computed(() => ({
 transform: `translateX(-${currentIndex.value * slideWidth.value}%)`,
 transition: 'transform 0.5s ease-out'
}));

const backgroundStyle = computed(() => {
 if (localBackgroundType.value === 'image') {
   return {
     backgroundImage: `url(${localBackgroundImage.value})`,
     backgroundSize: 'cover',
     backgroundPosition: 'center'
   };
 }
 return { backgroundColor: localBackgroundColor.value };
});

const backgroundImageStyle = computed(() => ({
 backgroundImage: `url(${localBackgroundImage.value})`,
 transition: 'transform 0.5s ease-out',
 position: 'absolute',
 top: 0,
 left: 0,
 width: '100%',
 height: '1500px',
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 willChange: 'transform'
}));

const titleStyle = computed(() => ({
 color: localTitleColor.value,
 position: 'relative',
 zIndex: 1
}));

const whatsappLink = computed(() => {
 const cleanNumber = localPhoneNumber.value.replace(/\D/g, '');
 return `https://wa.me/${cleanNumber}`;
});

// Methods
const handleScroll = () => {
 if (bgImageRef.value && componentRef.value) {
   const rect = componentRef.value.getBoundingClientRect();
   const windowHeight = window.innerHeight;
   
   if (rect.top < windowHeight && rect.bottom > 0) {
     const scrollPercentage = (windowHeight - rect.top) / (windowHeight + rect.height);
     const maxMove = rect.height * 0.4;
     let moveAmount = maxMove * scrollPercentage;
     moveAmount = Math.max(0, Math.min(moveAmount, maxMove));
     
     bgImageRef.value.style.transform = `translateY(-${moveAmount}px)`;
   }
 }
};

const handleResize = () => {
 handleScroll();
};

const startAutoPlay = () => {
 if (localAutoPlay.value && localImages.value.length > visibleSlides.value) {
   stopAutoPlay();
   autoPlayInterval = setInterval(() => {
     nextSlide();
   }, localAutoPlaySpeed.value);
 }
};

const stopAutoPlay = () => {
 if (autoPlayInterval) {
   clearInterval(autoPlayInterval);
   autoPlayInterval = null;
 }
};

const nextSlide = () => {
 if (currentIndex.value >= localImages.value.length - visibleSlides.value) {
   // Reset to start with smooth transition
   currentIndex.value = 0;
 } else {
   currentIndex.value++;
 }
};

const prevSlide = () => {
 if (currentIndex.value <= 0) {
   // Go to end with smooth transition
   currentIndex.value = localImages.value.length - visibleSlides.value;
 } else {
   currentIndex.value--;
 }
};

const openConfigModal = () => {
 currentStore.setSectionId(props.id);
 showConfigModal.value = true;
};

const closeConfigModal = () => {
 showConfigModal.value = false;
};

const toggleBackgroundType = () => {
 localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
 saveChanges();
};

const openBackgroundImageModal = () => {
 currentStore.setSectionId(props.id);
 currentStore.setSectionProp("backgroundImage");
 if (openGaleryImages) {
   openGaleryImages();
 } else {
   console.error('openGaleryImages function is not available');
 }
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

const addImage = () => {
 if (localImages.value.length < 10) {
   localImages.value.push({
     url: '',
     alt: `Marca ${localImages.value.length + 1}`
   });
   saveChanges();
 }
};

const removeImage = (index) => {
 localImages.value.splice(index, 1);
 if (currentIndex.value >= localImages.value.length - visibleSlides.value) {
   currentIndex.value = Math.max(0, localImages.value.length - visibleSlides.value);
 }
 saveChanges();
};

const updateTitle = (event) => {
 localTitle.value = event.target.value;
 saveChanges();
};

const handleButtonLinkInput = (event) => {
 if (localButtonType.value === 'whatsapp') {
   localPhoneNumber.value = event.target.value;
 } else {
   localButtonUrl.value = event.target.value;
 }
 saveChanges();
};

const updateBackgroundColor = () => {
 saveChanges();
};

const saveChanges = () => {
 templateStore.updateWidgetInSection(props.id, {
   title: localTitle.value,
   showTitle: localShowTitle.value,
   titleColor: localTitleColor.value,
   backgroundType: localBackgroundType.value,
   backgroundColor: localBackgroundColor.value,
   backgroundImage: localBackgroundImage.value,
   carouselHeight: localCarouselHeight.value,
   showControls: localShowControls.value,
   autoPlay: localAutoPlay.value,
   autoPlaySpeed: localAutoPlaySpeed.value,
   images: localImages.value,
   showButton: localShowButton.value,
   buttonText: localButtonText.value,
   buttonType: localButtonType.value,
   buttonUrl: localButtonUrl.value,
   phoneNumber: localPhoneNumber.value
 });
};

const saveChangesAndClose = () => {
 saveChanges();
 saveTemplate();
 closeConfigModal();
};

const openModalVideo = () => {
 showModalVideo.value = true;
};

const closeModalVideo = () => {
 showModalVideo.value = false;
};

// Watchers
watch(() => templateStore.structure.page_template.sections, (newSections) => {
 const currentSection = newSections.find(section => section.id === props.id);
 if (currentSection && currentSection.widget.element) {
   localTitle.value = currentSection.widget.element.title;
   localShowTitle.value = currentSection.widget.element.showTitle;
   localTitleColor.value = currentSection.widget.element.titleColor;
   localBackgroundType.value = currentSection.widget.element.backgroundType;
   localBackgroundColor.value = currentSection.widget.element.backgroundColor;
   localBackgroundImage.value = currentSection.widget.element.backgroundImage;
   localCarouselHeight.value = currentSection.widget.element.carouselHeight;
   localShowControls.value = currentSection.widget.element.showControls;
   localAutoPlay.value = currentSection.widget.element.autoPlay;
   localAutoPlaySpeed.value = currentSection.widget.element.autoPlaySpeed;
   localImages.value = currentSection.widget.element.images;
   localShowButton.value = currentSection.widget.element.showButton;
   localButtonText.value = currentSection.widget.element.buttonText;
   localButtonType.value = currentSection.widget.element.buttonType;
   localButtonUrl.value = currentSection.widget.element.buttonUrl;
   localPhoneNumber.value = currentSection.widget.element.phoneNumber;
 }
}, { deep: true });

watch(() => currentStore.selectedImage, (newImage) => {
 if (currentStore.sectionId === props.id) {
   if (currentStore.sectionProp === "backgroundImage") {
     localBackgroundImage.value = newImage;
     localBackgroundType.value = 'image';
   } else if (currentStore.sectionProp.startsWith("images[")) {
     const match = currentStore.sectionProp.match(/images\[(\d+)\]\.url/);
     if (match) {
       const index = parseInt(match[1]);
       if (localImages.value[index]) {
         localImages.value[index].url = newImage;
       }
     }
   }
   saveChanges();
 }
});

watch(localAutoPlay, (newValue) => {
 if (newValue) {
   startAutoPlay();
 } else {
   stopAutoPlay();
 }
});

watch(localAutoPlaySpeed, () => {
 if (localAutoPlay.value) {
   startAutoPlay();
 }
});

watch([localCarouselHeight, localImages], () => {
 if (currentIndex.value > localImages.value.length - visibleSlides.value) {
   currentIndex.value = Math.max(0, localImages.value.length - visibleSlides.value);
 }
});

// Lifecycle hooks
onMounted(() => {
 if (localBackgroundImage.value && bgImageRef.value) {
   scrollListener = window.addEventListener('scroll', handleScroll);
   resizeObserver = new ResizeObserver(handleResize);
   resizeObserver.observe(document.body);
 }
 
 if (localAutoPlay.value) {
   startAutoPlay();
 }
});

onUnmounted(() => {
 stopAutoPlay();
 
 if (scrollListener) {
   window.removeEventListener('scroll', handleScroll);
 }
 if (resizeObserver) {
   resizeObserver.disconnect();
 }
});
</script>
<style lang="scss" scoped>
.brand-carousel {
 position: relative;
 width: 100%;
 overflow: hidden;

 &.bg-image {
   background-size: cover;
   background-position: center;
 }
}

.container {
 max-width: 1200px;
 margin: 0 auto;
 padding: 2rem 1rem;
}

.carousel-content {
 position: relative;
 z-index: 1;
}

.carousel-title {
 text-align: center;
 margin-bottom: 2rem;
 font-size: 2rem;
 font-weight: bold;

 @media (min-width: 768px) {
   font-size: 2.5rem;
 }
}

.background-image {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 1500px;
 background-size: cover;
 background-position: center;
 will-change: transform;
}

// Nuevos estilos del carrusel
.carousel-container {
 position: relative;
 width: 100%;
 overflow: hidden;
 touch-action: pan-y;
 user-select: none;
}

.carousel-track {
 display: flex;
 width: 100%;
 height: 100%;
 will-change: transform;
}

.carousel-slide {
 height: 100%;
 padding: 0 10px;
 display: flex;
 align-items: center;
 justify-content: center;
 
 img {
   max-width: 100%;
   max-height: 100%;
   object-fit: contain;
   user-select: none;
   -webkit-user-drag: none;
   pointer-events: none;
 }
}

.carousel-controls {
 position: absolute;
 top: 50%;
 left: 0;
 right: 0;
 transform: translateY(-50%);
 display: flex;
 justify-content: space-between;
 padding: 0 1rem;
 pointer-events: none;
 z-index: 2;
}

.control-button {
 pointer-events: auto;
 background-color: rgba(255, 255, 255, 0.8);
 border: none;
 border-radius: 50%;
 width: 40px;
 height: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 transition: all 0.3s ease;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

 &:hover {
   background-color: white;
   transform: scale(1.1);
 }

 &:active {
   transform: scale(0.95);
 }
}

.action-button {
 display: inline-block;
 padding: 0.75rem 1.5rem;
 background-color: #4299e1;
 color: white;
 text-decoration: none;
 border-radius: 0.25rem;
 transition: background-color 0.3s ease;
 margin-top: 1rem;

 &:hover {
   background-color: #3182ce;
 }
}

// Modal Styles
.config-modal {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 z-index: 1000;

 .modal-content {
   background-color: white;
   border-radius: 0.5rem;
   max-width: 500px !important;
   width: 95%;
   display: flex;
   flex-direction: column;
   height: 80vh;
   margin: auto;

   h2 {
     font-size: 1.5rem;
     font-weight: bold;
     margin-bottom: 1.5rem;
     color: #2d3748;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 1rem;
     border-bottom: 1px solid #e2e8f0;

     i {
       font-size: 1.25rem;
       color: #4299e1;
     }
   }

   .modal-scroll-content {
     flex: 1;
     overflow-y: auto;
     padding: 1rem;
     padding-bottom: 70px; // Espacio para los botones
   }
 }
}

.config-tabs {
 display: flex;
 margin-bottom: 1.5rem;
 border-bottom: 2px solid #e2e8f0;
 gap: 0.5rem;

 button {
   padding: 0.75rem 1rem;
   font-size: 1rem;
   font-weight: 500;
   color: #4a5568;
   background: none;
   border: none;
   cursor: pointer;
   transition: all 0.3s ease;

   &.active {
     color: #4299e1;
     border-bottom: 2px solid #4299e1;
   }

   &:hover:not(.active) {
     background-color: #f7fafc;
   }
 }
}

// Unified Button Styles
.btn-primary,
.btn-secondary,
.btn-danger,
.btn-success {
 padding: 0.75rem 1rem;
 border: none;
 border-radius: 0.25rem;
 font-weight: 500;
 cursor: pointer;
 transition: all 0.3s ease;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.5rem;
 width: auto;
 min-width: 120px;

 i {
   font-size: 1rem;
 }
}

.btn-primary {
 background-color: #4299e1;
 color: white;

 &:hover {
   background-color: #3182ce;
 }
}

.btn-secondary {
 background-color: #e2e8f0;
 color: #4a5568;

 &:hover {
   background-color: #cbd5e0;
 }
}

.btn-danger {
 background-color: #f56565;
 color: white;

 &:hover {
   background-color: #e53e3e;
 }
}

.btn-success {
 background-color: #48bb78;
 color: white;
 width: 100%;

 &:hover {
   background-color: #38a169;
 }
}

// Form Styles
.form-group {
 margin-bottom: 1.5rem;

 label {
   display: block;
   font-weight: 500;
   margin-bottom: 0.5rem;
   color: #4a5568;
 }

 input[type="text"],
 input[type="number"] {
   width: 100%;
   padding: 0.5rem;
   border: 1px solid #e2e8f0;
   border-radius: 0.25rem;
   transition: border-color 0.3s ease;

   &:focus {
     outline: none;
     border-color: #4299e1;
   }
 }

 input[type="range"] {
   width: 100%;
   margin: 0.5rem 0;
 }

 input[type="color"] {
   width: 100%;
   height: 40px;
   padding: 0;
   border: none;
   border-radius: 0.25rem;
   cursor: pointer;
 }
}

// Image Management Styles
.image-preview-container {
 width: 100%;
 height: 200px;
 background-color: #f7fafc;
 border-radius: 0.5rem;
 overflow: hidden;
 margin-bottom: 1rem;
 display: flex;
 align-items: center;
 justify-content: center;

 img {
   max-width: 100%;
   max-height: 100%;
   object-fit: contain;
 }

 .image-preview-placeholder {
   color: #a0aec0;
   font-size: 0.875rem;
 }
}

.images-grid {
 display: grid;
 gap: 1.5rem;
 margin-bottom: 1.5rem;

 .image-config {
   background-color: #f7fafc;
   border-radius: 0.5rem;
   padding: 1rem;

   .image-actions {
     display: flex;
     gap: 0.5rem;
     margin-top: 1rem;
   }
 }
}

// Fixed Modal Actions
.modal-actions {
 position: sticky;
 bottom: 0;
 left: 0;
 right: 0;
 padding: 1rem;
 background-color: white;
 border-top: 1px solid #e2e8f0;
 display: flex;
 justify-content: flex-end;
 gap: 1rem;
 z-index: 10;
 box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

// Other Utility Styles
.checkbox-group,
.radio-group {
 display: flex;
 align-items: center;
 gap: 0.5rem;
 margin-bottom: 1rem;

 label {
   margin: 0;
   cursor: pointer;
 }
}

.styled-textarea {
 width: 100%;
 background: transparent;
 border: none;
 color: inherit;
 text-align: inherit;
 word-wrap: break-word;
 overflow-wrap: break-word;
 resize: none;
 font-family: inherit;
 padding: 0;
 margin: 0;
 line-height: 1.5;

 &:focus {
   outline: none;
   border-bottom: 1px solid currentColor;
 }
}

.styled-textarea-h2 {
 font-size: inherit;
 font-weight: bold;
 text-align: center;
 width: 100%;
}

.custom-modal {
 left: 40px;
 position: absolute;
 top: 40px;
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

.config-button {
    position: absolute;
    top: 15px;
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

@media only screen and (max-width: 767px) {
 .carousel-title {
   font-size: 24px !important;
 }
 
 .carousel-controls {
   padding: 0 10px;
 }
 
 .control-button {
   width: 32px;
   height: 32px;
 }

 .config-modal {
   .modal-content {
     width: 100%;
     height: 100vh;
     margin: 0;
     border-radius: 0;
   }

   .config-tabs {
     flex-wrap: wrap;

     button {
       font-size: 0.875rem;
       padding: 0.5rem;
     }
   }
 }

 .custom-modal {
   left: 0;
   top: 0;
   width: 100% !important;
   height: 100vh;
 }

 .instruction-scroll {
   display: none;
 }

 .modal-actions {
   position: sticky;
   bottom: 0;
   left: 0;
   width: 100%;
   padding: 1rem;
 }
}
</style>