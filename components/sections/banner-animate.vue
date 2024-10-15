<template>
  <div class="parallax-section" :style="{ backgroundColor: localBackgroundColor }">
    <div class="image-container" ref="imageContainer">
      <img :src="localImage" alt="Parallax Image" ref="parallaxImage">
    </div>
    <div class="content-container">
      <h2 :style="{ color: localTitleColor, fontWeight: localTitleWeight }">
        <span v-if="!viewMode" @input="updateTitle($event)" @blur="saveChanges" contenteditable>{{ localTitle }}</span>
        <span v-else>{{ localTitle }}</span>
      </h2>
      <p :style="{ color: localDescriptionColor }">
        <span v-if="!viewMode" @input="updateDescription($event)" @blur="saveChanges" contenteditable>{{ localDescription }}</span>
        <span v-else>{{ localDescription }}</span>
      </p>
      <a 
        v-if="viewMode"
        :href="localButtonUrl"
        :style="{ backgroundColor: localButtonColor, color: localButtonTextColor }"
        class="action-button"
      >
        {{ localButtonText }}
      </a>
      <div 
        v-if="!viewMode"
        :style="{ backgroundColor: localButtonColor, color: localButtonTextColor }"
        class="action-button"
      >
        {{ localButtonText }}
      </div>
    </div>
    <button v-if="!viewMode" @click="openConfigModal" class="config-button">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  </div>

  <!-- Configuration Modal -->
  <div v-if="showConfigModal" class="modal">
    <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
    <div class="modal-content custom-modal">
      <h2>Configuración de la Sección Parallax</h2>
      
      <div class="scrollable-content">
        <label>
          Título:
          <input v-model="localTitle" @input="saveChanges" type="text">
        </label>
        
        <label>
          Color del Título:
          <input v-model="localTitleColor" @input="saveChanges" type="color">
        </label>
        
        <label>
          Peso de la Fuente del Título:
          <select v-model="localTitleWeight" @change="saveChanges">
            <option value="normal">Normal</option>
            <option value="bold">Negrita</option>
            <option value="bolder">Más Negrita</option>
            <option value="lighter">Más Ligera</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </label>
        
        <label>
          Descripción:
          <textarea v-model="localDescription" @input="saveChanges"></textarea>
        </label>
        
        <label>
          Color de la Descripción:
          <input v-model="localDescriptionColor" @input="saveChanges" type="color">
        </label>
        
        <label>
          Texto del Botón:
          <input v-model="localButtonText" @input="saveChanges" type="text">
        </label>
        
        <label>
          URL del Botón:
          <input v-model="localButtonUrl" @input="saveChanges" type="text" placeholder="https://...">
        </label>
        
        <label>
          Color del Botón:
          <input v-model="localButtonColor" @input="saveChanges" type="color">
        </label>
        
        <label>
          Color del Texto del Botón:
          <input v-model="localButtonTextColor" @input="saveChanges" type="color">
        </label>
        
        <label>
          Color de Fondo:
          <input v-model="localBackgroundColor" @input="saveChanges" type="color">
        </label>
        
        <div class="image-selector">
          <span>Imagen de Parallax:</span>
          <div class="flex items-center mt-2">
            <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <img v-if="localImage" :src="localImage" alt="Parallax Image" class="h-full w-full object-cover">
              <div v-else class="h-full w-full bg-gray-300"></div>
            </span>
            <button @click="openImageModal" class="select-image-button">
              Seleccionar Imagen
            </button>
          </div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button @click="closeConfigModal" class="cancel-button">Cancelar</button>
        <button @click="saveChangesAndClose" class="save-button">Guardar Cambios</button>
      </div>
    </div>
  </div>
  <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
</template>

<script setup>
import { ref, watch, inject, onMounted, onUnmounted } from 'vue';
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
    type: String
  },
  description: {
    type: String
  },
  buttonText: {
    type: String
  },
  buttonUrl: {
    type: String
  },
  image: {
    type: String
  },
  titleColor: {
    type: String
  },
  titleWeight: {
    type: String,
  },
  descriptionColor: {
    type: String
  },
  buttonColor: {
    type: String
  },
  buttonTextColor: {
    type: String
  },
  backgroundColor: {
    type: String
  }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const showConfigModal = ref(false);
const localTitle = ref(props.title);
const localDescription = ref(props.description);
const localButtonText = ref(props.buttonText);
const localButtonUrl = ref(props.buttonUrl);
const localImage = ref(props.image);
const localTitleColor = ref(props.titleColor);
const localTitleWeight = ref(props.titleWeight);
const localDescriptionColor = ref(props.descriptionColor);
const localButtonColor = ref(props.buttonColor);
const localButtonTextColor = ref(props.buttonTextColor);
const localBackgroundColor = ref(props.backgroundColor);
const showModalVideo = ref(false);
const videoId = ref('2tc18flnqBw');

const saveTemplate = inject('saveTemplate');

const imageContainer = ref(null);
const parallaxImage = ref(null);

const openGaleryImages = inject('openGaleryImages', () => {
  console.warn('openGaleryImages function is not available');
});

watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection && currentSection.widget.element) {
    localTitle.value = currentSection.widget.element.title || "";
    localDescription.value = currentSection.widget.element.description || "";
    localButtonText.value = currentSection.widget.element.buttonText || "";
    localButtonUrl.value = currentSection.widget.element.buttonUrl || "";
    localImage.value = currentSection.widget.element.image || "";
    localTitleColor.value = currentSection.widget.element.titleColor || "";
    localTitleWeight.value = currentSection.widget.element.titleWeight || "";
    localDescriptionColor.value = currentSection.widget.element.descriptionColor || "";
    localButtonColor.value = currentSection.widget.element.buttonColor || "";
    localButtonTextColor.value = currentSection.widget.element.buttonTextColor || "";
    localBackgroundColor.value = currentSection.widget.element.backgroundColor || "";
  }
}, { deep: true, immediate: true });

function openConfigModal() {
  showConfigModal.value = true;
}

function closeConfigModal() {
  showConfigModal.value = false;
}

function saveChanges() {
  templateStore.updateWidgetInSection(props.id, {
    title: localTitle.value,
    description: localDescription.value,
    buttonText: localButtonText.value,
    buttonUrl: localButtonUrl.value,
    image: localImage.value,
    titleColor: localTitleColor.value,
    titleWeight: localTitleWeight.value,
    descriptionColor: localDescriptionColor.value,
    buttonColor: localButtonColor.value,
    buttonTextColor: localButtonTextColor.value,
    backgroundColor: localBackgroundColor.value
  });
}

function saveChangesAndClose() {
  saveChanges();
  closeConfigModal();
  saveTemplate();
}

function updateTitle(event) {
  localTitle.value = event.target.innerText;
  saveChanges();
}

function updateDescription(event) {
  localDescription.value = event.target.innerText;
  saveChanges();
}

function openImageModal() {
  currentStore.setSectionId(props.id);
  currentStore.setSectionProp("image");
  if (openGaleryImages) {
    openGaleryImages();
  } else {
    console.error('openGaleryImages function is not available');
  }
}

watch(() => currentStore.selectedImage, (newImage) => {
  if (currentStore.sectionId === props.id && currentStore.sectionProp === "image") {
    localImage.value = newImage;
    saveChanges();
  }
});

function handleParallax() {
  if (imageContainer.value && parallaxImage.value) {
    if (window.innerWidth > 768) {
      const scrollPosition = window.pageYOffset;
      const containerRect = imageContainer.value.getBoundingClientRect();
      const containerTop = containerRect.top + scrollPosition;
      const containerBottom = containerTop + containerRect.height;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition + windowHeight > containerTop && scrollPosition < containerBottom) {
        const relativeScroll = (scrollPosition + windowHeight - containerTop) / (windowHeight + containerRect.height);
        const rotationDegree = 30 - relativeScroll * 60; // From 30 to -30 degrees
        imageContainer.value.style.setProperty('--rotation', `${rotationDegree}deg`);
      }
    } else {
      imageContainer.value.style.setProperty('--rotation', '0deg');
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleParallax);
  handleParallax();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax);
});

const openModalVideo = () => {
  showModalVideo.value = true;
};

const closeModalVideo = () => {
  showModalVideo.value = false;
}
</script>

<style lang="scss" scoped>
.parallax-section {
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;

  @media (min-width: 769px) {
    padding: 4rem 2rem;
    flex-direction: row;
    align-items: center;
  }

  .content-container {
    width: 100%;
    z-index: 1;
    text-align: center;

    @media (min-width: 769px) {
      width: 50%;
      text-align: left;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333333;

      @media (min-width: 769px) {
        font-size: 2.5rem;
      }
    }

p {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #333333;

  @media (min-width: 769px) {
    font-size: 1.1rem;
  }
}

.action-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}
}

.image-container {
width: 100%;
height: 300px;
overflow: hidden;
background-color: #4a4a4a;
margin-bottom: 2rem;

@media (min-width: 769px) {
  position: absolute;
  right: -5%;
  width: 60%;
  height: 83%;
  margin-bottom: 0;
  transform: rotate(var(--rotation, 30deg));
  transition: transform 0.3s ease-out;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
}

.config-button {
position: absolute;
top: 1rem;
left: 1rem;
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
top: 4rem;
left: 1rem;
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
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;

  .modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;

h2 {
  padding: 1rem;
  margin: 0;
  border-bottom: 1px solid #e5e5e5;
}

.scrollable-content {
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;

  label {
    display: block;
    margin-bottom: 1rem;

    input, textarea, select {
      display: block;
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    select {
      height: 40px;
    }

    input[type="color"] {
      height: 40px;
      padding: 0;
    }

    textarea {
      height: 100px;
    }
  }

  .image-selector {
    margin-bottom: 1rem;

    .select-image-button {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e5e5e5;

  button {
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;

    &.cancel-button {
      background-color: #6c757d;
      color: white;

      &:hover {
        background-color: #5a6268;
      }
    }

    &.save-button {
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }
    }
  }
}
}
}

.custom-modal {
  left: 40px;
  position: absolute;
  top: 40px;
  max-width: 500px !important;
  height: 80vh;
  overflow-y: auto;
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