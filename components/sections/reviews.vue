<template>
    <div class="reviews-section" :class="{ 'bg-image': localBackgroundType === 'image' }" :style="backgroundStyle" ref="reviewsSection">

      <button v-if="!viewMode" @click="openConfigModal" class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
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
  
      <div class="container">
        <h2 v-if="localSectionTitle" :class="{ 'white-title': localWhiteTitle }">
          <span v-if="!viewMode" @input="updateSectionTitle($event)" @blur="saveChanges" contenteditable>{{ localSectionTitle }}</span>
          <span v-else>{{ localSectionTitle }}</span>
        </h2>
  
        <div class="reviews-container">
          <!-- Template 1: Filas de reseñas -->
          <div v-if="Number(localTemplate) === 1" class="reviews-rows">
            <div v-for="(review, index) in localReviews" :key="index" class="review-row">
              <div class="review-content">
                <div class="reviewer-image">
                  <img :src="review.image" :alt="review.name">
                </div>
                <div class="review-text-content" :style="{ color: localTextColor }">
                  <h3 class="reviewer-name">
                    <span v-if="!viewMode" @input="updateReviewerName($event, index)" @blur="saveChanges" contenteditable>{{ review.name }}</span>
                    <span v-else>{{ review.name }}</span>
                  </h3>
                  <p class="review-text">
                    <span v-if="!viewMode" @input="updateReviewText($event, index)" @blur="saveChanges" contenteditable>{{ review.text }}</span>
                    <span v-else>{{ review.text }}</span>
                  </p>
                  <div class="review-rating">
                    <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= review.rating }"></span>
                  </div>
                  <div class="review-date">
                    <i class="far fa-calendar-alt"></i>
                    {{ review.date }}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Template 2: Grid de reseñas con animación -->
          <div v-if="Number(localTemplate) === 2" class="reviews-grid">
            <div v-for="(review, index) in localReviews" :key="index" class="review-card" :class="{ 'animate': isVisible }" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="review-content" :style="{ color: localTextColor }">
                <div class="reviewer-image">
                  <img :src="review.image" :alt="review.name">
                </div>
                <h3 class="reviewer-name">
                  <span v-if="!viewMode" @input="updateReviewerName($event, index)" @blur="saveChanges" contenteditable>{{ review.name }}</span>
                  <span v-else>{{ review.name }}</span>
                </h3>
                <div class="review-rating">
                    <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= review.rating }"></span>
                </div>
                <p class="review-text">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <span v-if="!viewMode" @input="updateReviewText($event, index)" @blur="saveChanges" contenteditable>{{ review.text }}</span>
                  <span v-else>{{ review.text }}</span>
                  <i class="fas fa-quote-right quote-icon"></i>
                </p>
                <div class="review-date">
                  <i class="far fa-calendar-alt"></i>
                  {{ review.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de configuración mejorado -->
      <div v-if="showConfigModal" class="config-modal">
        <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
        <div class="modal-content custom-modal">
          <h2>Configuración de Reseñas <i class="fas fa-comments"></i></h2>
          
          <div class="config-tabs">
            <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">General</button>
            <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reseñas</button>
          </div>
  
          <div v-if="activeTab === 'general'" class="config-section">
            <h3>Configuración General <i class="fas fa-cog"></i></h3>
            <div class="form-group">
              <label>Fondo de la sección</label>
              <div class="background-type-buttons">
                <button @click="toggleBackgroundType" :class="{ 'active': localBackgroundType === 'color' }">
                  <i class="fas fa-fill-drip"></i> Color
                </button>
                <button @click="toggleBackgroundType" :class="{ 'active': localBackgroundType === 'image' }">
                  <i class="fas fa-image"></i> Imagen
                </button>
              </div>
              <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor" @input="updateBackgroundColor" type="color">
              <div v-if="localBackgroundType === 'image'" class="background-image-selector">
                <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background">
                <button @click="openBackgroundImageModal"><i class="fas fa-upload"></i> Cambiar imagen</button>
              </div>
            </div>
            <div class="form-group">
              <label>Título de la sección (opcional)</label>
              <input v-model="localSectionTitle" @input="saveChanges" type="text" placeholder="Ingrese el título de la sección">
              <div v-if="localBackgroundType === 'image'" class="white-title-option">
                <input type="checkbox" id="whiteTitleCheckbox" v-model="localWhiteTitle" @change="saveChanges">
                <label for="whiteTitleCheckbox">Título color blanco</label>
              </div>
            </div>
            <div class="form-group">
              <label>Color del texto de las reseñas</label>
              <input v-model="localTextColor" @input="updateTextColor" type="color">
            </div>
          </div>
  
          <div v-if="activeTab === 'reviews'" class="config-section">
            <h3>Gestión de Reseñas <i class="fas fa-star"></i></h3>
            <div v-for="(review, index) in localReviews" :key="index" class="review-config">
              <h4>Reseña {{ index + 1 }}</h4>
              <div class="review-config-grid">
                <div class="form-group">
                  <label>Imagen</label>
                  <div class="image-selector">
                    <img v-if="review.image" :src="review.image" alt="Reviewer image">
                    <button @click="openReviewImageModal(index)"><i class="fas fa-upload"></i> Cambiar</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Nombre</label>
                  <input v-model="review.name" @input="saveChanges" type="text" maxlength="50">
                </div>
                <div class="form-group full-width">
                  <label>Texto de la reseña</label>
                  <textarea v-model="review.text" @input="saveChanges" rows="3" maxlength="200"></textarea>
                </div>
                <div class="form-group">
                  <label>Calificación</label>
                  <input v-model="review.rating" @input="saveChanges" type="number" min="1" max="5">
                </div>
                <div class="form-group">
                  <label>Fecha</label>
                  <input v-model="review.date" @input="saveChanges" type="date">
                </div>
              </div>
              <button @click="removeReview(index)" class="remove-review">
                <i class="fas fa-trash-alt"></i> Eliminar reseña
              </button>
            </div>
            <button @click="addReview" class="add-review">
              <i class="fas fa-plus"></i> Agregar reseña
            </button>
          </div>
  
          <div class="modal-actions">
            <button @click="closeConfigModal" class="cancel-button">
              <i class="fas fa-times"></i> Cancelar
            </button>
            <button @click="saveChangesAndClose" class="save-button">
              <i class="fas fa-save"></i> Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
    <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
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
    reviews: {
        type: Array
    },
    whiteTitle: {
        type: Boolean
    },
    textColor: {
        type: String,
        default: '#4a5568'
    }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const showConfigModal = ref(false);
const localSectionTitle = ref(props.sectionTitle);
const localBackgroundType = ref(props.backgroundType);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundImage = ref(props.backgroundImage);
const localReviews = ref(props.reviews);
const localWhiteTitle = ref(props.whiteTitle);
const localTextColor = ref(props.textColor);
const activeTab = ref('general');
const isVisible = ref(false);
const reviewsSection = ref(null);
const showModalVideo = ref(false);
const videoId = ref('PbUVY8ijs0I');

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
        localReviews.value = currentSection.widget.element.reviews || [];
        localWhiteTitle.value = currentSection.widget.element.whiteTitle || false;
        localTextColor.value = currentSection.widget.element.textColor || '#4a5568';
    }
}, { deep: true, immediate: true });

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

function addReview() {
    localReviews.value.push({
        image: '/img/default-avatar.jpg',
        name: `Cliente ${localReviews.value.length + 1}`,
        text: `Esta es una reseña de ejemplo para el cliente ${localReviews.value.length + 1}.`,
        rating: 5,
        date: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    });
    saveChanges();
}

function removeReview(index) {
    localReviews.value.splice(index, 1);
    saveChanges();
}

function saveChanges() {
    templateStore.updateWidgetInSection(props.id, {
        sectionTitle: localSectionTitle.value,
        backgroundType: localBackgroundType.value,
        backgroundColor: localBackgroundColor.value,
        backgroundImage: localBackgroundImage.value,
        reviews: localReviews.value,
        whiteTitle: localWhiteTitle.value,
        textColor: localTextColor.value
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

function updateReviewerName(event, index) {
    localReviews.value[index].name = event.target.innerText;
    saveChanges();
}

function updateReviewText(event, index) {
    localReviews.value[index].text = event.target.innerText;
    saveChanges();
}

function updateReviewRating(index, newRating) {
    localReviews.value[index].rating = newRating;
    saveChanges();
}

function updateTextColor() {
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

// Función para abrir el modal de imágenes para la imagen de una reseña
function openReviewImageModal(index) {
    currentStore.setSectionId(props.id);
    currentStore.setSectionProp(`reviews[${index}].image`);
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

// Funciones para manejar la visibilidad del componente
function checkVisibility() {
    if (reviewsSection.value) {
        const rect = reviewsSection.value.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        isVisible.value = rect.top <= windowHeight && rect.bottom >= 0;
    }
}

onMounted(() => {
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility();
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkVisibility);
    window.removeEventListener('resize', checkVisibility);
});

// Watcher para actualizar las imágenes cuando se seleccionan en el modal
watch(() => currentStore.selectedImage, (newImage) => {
    if (currentStore.sectionId === props.id) {
        if (currentStore.sectionProp === "backgroundImage") {
            localBackgroundImage.value = newImage;
            localBackgroundType.value = 'image';
        } else if (currentStore.sectionProp.startsWith("reviews[")) {
            const match = currentStore.sectionProp.match(/reviews\[(\d+)\]\.image/);
            if (match) {
                const index = parseInt(match[1]);
                localReviews.value[index].image = newImage;
            }
        }
        saveChanges();
    }
  });
  
  const openModalVideo = () => {
    showModalVideo.value = true;
  };

  const closeModalVideo = () => {
    showModalVideo.value = false;
  }
</script>
<style lang="scss" scoped>
.reviews-section {
  position: relative;
  width: 100%;
  padding: 2rem 0;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4rem 0;
  }

  &.bg-image {
    background-size: cover;
    background-position: center;
  }

  .config-button {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background-color: white;
    padding: 0.5rem;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    @media (min-width: 768px) {
      top: 1rem;
      left: 1rem;
      padding: 0.75rem;
    }

    &:hover {
      background-color: #f0f0f0;
      transform: rotate(45deg);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;

      @media (min-width: 768px) {
        width: 1.5rem;
        height: 1.5rem;
      }
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

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #2d3748;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    &.white-title {
      color: white;
    }
  }

  .reviews-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .review-rating {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    .star {
      position: relative;
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.6em;
      margin-right: 0.6em;
      margin-bottom: 0.8em;
      border-right: 0.3em solid transparent;
      border-bottom: 0.7em solid #ccc;
      border-left: 0.3em solid transparent;
      font-size: 14px;

      @media (min-width: 768px) {
        font-size: 16px;
        margin-left: 0.9em;
        margin-right: 0.9em;
        margin-bottom: 1.2em;
      }

      &:before, &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: .6em;
        left: -1em;
        border-right: 1em solid transparent;
        border-bottom: 0.7em solid #ccc;
        border-left: 1em solid transparent;
        transform: rotate(-35deg);
      }

      &:after {
        transform: rotate(35deg);
      }

      &.filled {
        border-bottom: 0.7em solid #f6e05e;

        &:before, &:after {
          border-bottom: 0.7em solid #f6e05e;
        }
      }
    }
  }

  .reviews-rows {
    width: 100%;
    max-width: 800px;

    .review-row {
      padding: 1.5rem 0;
      border-bottom: 1px solid #e2e8f0;
      width: 100%;
      margin: 0 auto;

      @media (min-width: 768px) {
        padding: 2rem 0;
        width: 80%;
      }

      &:last-child {
        border-bottom: none;
      }

      .review-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: flex-start;
        }
      }

      .reviewer-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 1rem;

        @media (min-width: 768px) {
          width: 120px;
          height: 120px;
          margin-right: 2rem;
          margin-bottom: 0;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .review-text-content {
        flex: 1;
        text-align: center;

        @media (min-width: 768px) {
          text-align: left;
        }
      }

      .reviewer-name {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;

        @media (min-width: 768px) {
          font-size: 1.5rem;
        }
      }

      .review-text {
        font-size: 0.875rem;
        margin-bottom: 1rem;

        @media (min-width: 768px) {
          font-size: 1rem;
        }
      }

      .review-rating {
        justify-content: center;
        margin-bottom: 0.75rem;

        @media (min-width: 768px) {
          justify-content: flex-start;
        }
      }

      .review-date {
        font-size: 0.75rem;
        color: #718096;

        @media (min-width: 768px) {
          font-size: 0.875rem;
        }

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .reviews-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    @media (min-width: 768px) {
      gap: 2rem;
    }
  }

  .review-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 100%;
    max-width: 350px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);

    @media (min-width: 768px) {
      padding: 2rem;
    }

    &.animate {
      animation: fadeInUp 0.5s ease forwards;
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .review-content {
      text-align: center;
    }

    .reviewer-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 1rem;

      @media (min-width: 768px) {
        width: 100px;
        height: 100px;
        margin-bottom: 1.5rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .reviewer-name {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .review-rating {
      justify-content: center;
      margin-bottom: 1rem;
    }

    .review-text {
      font-size: 0.875rem;
      margin-bottom: 1rem;
      font-style: italic;
      line-height: 1;

      @media (min-width: 768px) {
        font-size: 1rem;
      }

      .quote-icon {
        font-size: 1.25rem;
        color: #cbd5e0;
        margin: 0 0.5rem;
        opacity: 0.6;

        @media (min-width: 768px) {
          font-size: 1.5rem;
        }
      }
    }

    .review-date {
      font-size: 0.75rem;
      color: #718096;

      @media (min-width: 768px) {
        font-size: 0.875rem;
      }

      i {
        margin-right: 0.5rem;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.config-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;

  .modal-content {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;

    @media (min-width: 768px) {
      padding: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      color: #2d3748;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (min-width: 768px) {
        font-size: 2rem;
      }

      i {
        font-size: 1.5rem;
        color: #4299e1;

        @media (min-width: 768px) {
          font-size: 1.75rem;
        }
      }
    }

    .config-tabs {
      display: flex;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #e2e8f0;

      @media (min-width: 768px) {
        margin-bottom: 2rem;
      }

      button {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: bold;
        color: #4a5568;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;

        @media (min-width: 768px) {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        &.active {
          color: #4299e1;
          border-bottom: 2px solid #4299e1;
        }

        &:hover:not(.active) {
          background-color: #f7fafc;
        }
      }
    }

    .config-section {
      h3 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #2d3748;
        display: flex;
        align-items: center;

        @media (min-width: 768px) {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        i {
          margin-left: 0.5rem;
          color: #4299e1;
        }
      }

      .form-group {
        margin-bottom: 1rem;

        @media (min-width: 768px) {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #4a5568;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        textarea,
        select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #2d3748;
          transition: border-color 0.3s ease;

          @media (min-width: 768px) {
            padding: 0.75rem;
            font-size: 1rem;
          }

          &:focus {
            outline: none;
            border-color: #4299e1;
          }
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

      .background-type-buttons {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;

        @media (min-width: 768px) {
          gap: 1rem;
        }

        button {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          background-color: white;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.3s ease;

          @media (min-width: 768px) {
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }

          &.active {
            background-color: #4299e1;
            color: white;
            border-color: #4299e1;
          }

          &:hover:not(.active) {
            background-color: #f7fafc;
          }

          i {
            margin-right: 0.25rem;

            @media (min-width: 768px) {
              margin-right: 0.5rem;
            }
          }
        }
      }

      .background-image-selector,
      .image-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        @media (min-width: 768px) {
          gap: 1rem;
        }

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 0.25rem;

          @media (min-width: 768px) {
            width: 100px;
            height: 100px;
          }
        }

        button {
          padding: 0.5rem 0.75rem;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.3s ease;

          @media (min-width: 768px) {
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }

          &:hover {
            background-color: #3182ce;
          }

          i {
            margin-right: 0.25rem;

            @media (min-width: 768px) {
              margin-right: 0.5rem;
            }
          }
        }
      }

      .white-title-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.75rem;

        @media (min-width: 768px) {
          gap: 0.75rem;
          margin-top: 1rem;
        }

        input[type="checkbox"] {
          width: 1rem;
          height: 1rem;

          @media (min-width: 768px) {
            width: 1.25rem;
            height: 1.25rem;
          }
        }

        label {
          font-size: 0.875rem;
          color: #4a5568;

          @media (min-width: 768px) {
            font-size: 1rem;
          }
        }
      }

      .review-config {
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;

        @media (min-width: 768px) {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        h4 {
          font-size: 1.125rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #2d3748;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
          }
        }

        .review-config-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;

          @media (min-width: 768px) {
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }

          .full-width {
            grid-column: 1 / -1;
          }
        }

        .remove-review {
          margin-top: 1rem;
          padding: 0.5rem 0.75rem;
          background-color: #f56565;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.3s ease;

          @media (min-width: 768px) {
            margin-top: 1.5rem;
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }

          &:hover {
            background-color: #e53e3e;
          }

          i {
            margin-right: 0.25rem;

            @media (min-width: 768px) {
              margin-right: 0.5rem;
            }
          }
        }
      }

      .add-review {
        margin-top: 1rem;
        padding: 0.5rem 0.75rem;
        background-color: #48bb78;
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: background-color 0.3s ease;

        @media (min-width: 768px) {
          margin-top: 1.5rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
        }

        &:hover {
          background-color: #38a169;
        }

        i {
          margin-right: 0.25rem;

          @media (min-width: 768px) {
            margin-right: 0.5rem;
          }
        }
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1.5rem;

      @media (min-width: 768px) {
        gap: 1rem;
        margin-top: 2rem;
      }

      button {
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.3s ease;

        @media (min-width: 768px) {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        &.cancel-button {
          background-color: #e2e8f0;
          color: #4a5568;

          &:hover {
            background-color: #cbd5e0;
          }
        }

        &.save-button {
          background-color: #4299e1;
          color: white;

          &:hover {
            background-color: #3182ce;
          }
        }

        i {
          margin-right: 0.25rem;

          @media (min-width: 768px) {
            margin-right: 0.5rem;
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