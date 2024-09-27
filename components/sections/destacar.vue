<template>
    <div class="parallax-section" :style="{ backgroundColor: localBackgroundColor }">
      <div class="content-container">
        <h2 :style="{ color: localTitleColor }">
          <span v-if="!viewMode" @input="updateTitle($event)" @blur="saveChanges" contenteditable>{{ localTitle }}</span>
          <span v-else>{{ localTitle }}</span>
        </h2>
        <p :style="{ color: localDescriptionColor }">
          <span v-if="!viewMode" @input="updateDescription($event)" @blur="saveChanges" contenteditable>{{ localDescription }}</span>
          <span v-else>{{ localDescription }}</span>
        </p>
        <button 
          :style="{ backgroundColor: localButtonColor, color: localButtonTextColor }"
          @click="handleButtonClick"
        >
          {{ localButtonText }}
        </button>
      </div>
      <div class="image-container" ref="imageContainer">
        <img :src="localImage" alt="Parallax Image" ref="parallaxImage">
      </div>
      <button v-if="!viewMode" @click="openConfigModal" class="config-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    </div>
  
    <!-- Configuration Modal -->
    <div v-if="showConfigModal" class="modal">
      <div class="modal-content">
        <h2>Configuración de la Sección Parallax</h2>
        
        <label>
          Título:
          <input v-model="localTitle" @input="saveChanges" type="text">
        </label>
        
        <label>
          Color del Título:
          <input v-model="localTitleColor" @input="saveChanges" type="color">
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
          <button @click="openImageModal">Seleccionar Imagen</button>
        </div>
        
        <div class="modal-actions">
          <button @click="closeConfigModal">Cancelar</button>
          <button @click="saveChangesAndClose">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, computed, watch, inject, onMounted, onUnmounted } from 'vue';
  import { useTemplateStore } from '~/stores/template';
  import { useCurrentStore } from '~/stores/current';
  
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
      default: 'Título de la Sección'
    },
    description: {
      type: String,
      default: 'Descripción de la sección con efecto parallax.'
    },
    buttonText: {
      type: String,
      default: 'Acción'
    },
    image: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: '#000000'
    },
    descriptionColor: {
      type: String,
      default: '#333333'
    },
    buttonColor: {
      type: String,
      default: '#007bff'
    },
    buttonTextColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundColor: {
      type: String,
      default: '#f8f9fa'
    }
  });
  
  const templateStore = useTemplateStore();
  const currentStore = useCurrentStore();
  
  const showConfigModal = ref(false);
  const localTitle = ref(props.title);
  const localDescription = ref(props.description);
  const localButtonText = ref(props.buttonText);
  const localImage = ref(props.image);
  const localTitleColor = ref(props.titleColor);
  const localDescriptionColor = ref(props.descriptionColor);
  const localButtonColor = ref(props.buttonColor);
  const localButtonTextColor = ref(props.buttonTextColor);
  const localBackgroundColor = ref(props.backgroundColor);
  
  const imageContainer = ref(null);
  const parallaxImage = ref(null);
  
  const openGaleryImages = inject('openGaleryImages', () => {
    console.warn('openGaleryImages function is not available');
  });
  
  watch(() => templateStore.structure.page_template.sections, (newSections) => {
    const currentSection = newSections.find(section => section.id === props.id);
    if (currentSection && currentSection.widget.element) {
      localTitle.value = currentSection.widget.element.title || '';
      localDescription.value = currentSection.widget.element.description || '';
      localButtonText.value = currentSection.widget.element.buttonText || '';
      localImage.value = currentSection.widget.element.image || '';
      localTitleColor.value = currentSection.widget.element.titleColor || '#000000';
      localDescriptionColor.value = currentSection.widget.element.descriptionColor || '#333333';
      localButtonColor.value = currentSection.widget.element.buttonColor || '#007bff';
      localButtonTextColor.value = currentSection.widget.element.buttonTextColor || '#ffffff';
      localBackgroundColor.value = currentSection.widget.element.backgroundColor || '#f8f9fa';
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
      image: localImage.value,
      titleColor: localTitleColor.value,
      descriptionColor: localDescriptionColor.value,
      buttonColor: localButtonColor.value,
      buttonTextColor: localButtonTextColor.value,
      backgroundColor: localBackgroundColor.value
    });
  }
  
  function saveChangesAndClose() {
    saveChanges();
    closeConfigModal();
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
  
  function handleButtonClick() {
    // Implementar la acción del botón aquí
    console.log('Botón clickeado');
  }
  
  function handleParallax() {
    if (imageContainer.value && parallaxImage.value) {
      const scrollPosition = window.pageYOffset;
      const containerRect = imageContainer.value.getBoundingClientRect();
      const containerTop = containerRect.top + scrollPosition;
      const containerBottom = containerTop + containerRect.height;
      
      if (scrollPosition + window.innerHeight > containerTop && scrollPosition < containerBottom) {
        const relativeScroll = (scrollPosition + window.innerHeight - containerTop) / (window.innerHeight + containerRect.height);
        const movement = 50 * (relativeScroll - 0.5);
        parallaxImage.value.style.transform = `translateX(${movement}px)`;
      }
    }
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleParallax);
    handleParallax(); // Initial call to set the image position
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleParallax);
  });
  </script>
  <style lang="scss" scoped>
   .parallax-section {
        position: relative;
        overflow: hidden;
        padding: 4rem 2rem;
        display: flex;
        align-items: center;
        min-height: 80vh;

  .content-container {
    width: 50%;
    z-index: 1;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333333; // Gris oscuro por defecto
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: #333333; // Gris oscuro por defecto
    }

    button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
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
    position: absolute;
    top: -10%;
    right: -5%;
    width: 60%;
    height: 120%;
    overflow: hidden;
    background-color: #4a4a4a; // Fondo gris oscuro por defecto

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.1s ease-out;
    }
  }

  .config-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;

    svg {
      width: 24px;
      height: 24px;
      color: #333;
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
  align-items: center;
  z-index: 1000;

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;

    h2 {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 1rem;

      input, textarea {
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      input[type="color"] {
        height: 10px;
        padding: 0;
      }

      textarea {
        height: 100px;
      }
    }

    .image-selector {
      margin-bottom: 1rem;

      button {
        margin-top: 0.5rem;
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

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;

      button {
        padding: 0.5rem 1rem;
        margin-left: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:first-child {
          background-color: #6c757d;
          color: white;

          &:hover {
            background-color: #5a6268;
          }
        }

        &:last-child {
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
  </style>