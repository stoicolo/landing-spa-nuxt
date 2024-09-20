<template>
    <div class="article-section" :class="{ 'bg-image': localBackgroundType === 'image' }" :style="backgroundStyle" ref="articleSection">
      <button v-if="!viewMode" @click="openConfigModal" class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
  
      <div class="container">
        <h2 :class="{ 'white-title': localWhiteTitle }">
          <span v-if="!viewMode" @input="updateTitle($event)" @blur="saveChanges" contenteditable>{{ localTitle }}</span>
          <span v-else>{{ localTitle }}</span>
        </h2>
  
        <div class="article-content">
          <div class="images-container">
            <div v-for="(picture, index) in localPictures" :key="index" class="article-image">
                <img :src="picture.image || '/img/default-image.jpg'" :alt="`Imagen ${index + 1}`">
                <div class="image-overlay" :style="{ backgroundColor: localOverlayColor }"></div>
            </div>
          </div>
          <div class="text-content" :style="{ color: localTextColor }">
            <p v-if="!viewMode" @input="updateDescription($event)" @blur="saveChanges" contenteditable>{{ localDescription }}</p>
            <p v-else>{{ localDescription }}</p>
          </div>
        </div>
  
        <button v-if="localShowActionButton" class="action-button" @click="handleActionClick">
          {{ localActionButtonText }} <font-awesome-icon icon="fa fa-link"/>
        </button>
  
        <div class="share-section">
          <p :style="{ color: localTextColor }" class="mb-2">Compartir en:</p>
          <div class="share-buttons">
            <button v-if="localShowFacebook" @click="shareOnFacebook" class="share-button facebook">
              <font-awesome-icon icon="fa-brands fa-square-facebook"/>
            </button>
            <button v-if="localShowInstagram" @click="shareOnInstagram" class="share-button instagram">
                <font-awesome-icon icon="fa-brands fa-square-instagram"/>
            </button>
            <button v-if="localShowTwitter" @click="shareOnTwitter" class="share-button twitter">
                <font-awesome-icon icon="fa-brands fa-square-twitter"/>
            </button>
            <button v-if="localShowWhatsapp" @click="shareOnWhatsapp" class="share-button whatsapp">
                <font-awesome-icon icon="fa-brands fa-whatsapp"/>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal de configuración -->
      <div v-if="showConfigModal" class="config-modal">
        <div class="modal-content">
          <h2>Configuración del Artículo <i class="fas fa-newspaper"></i></h2>
          
          <div class="config-tabs">
            <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">General</button>
            <button :class="{ active: activeTab === 'images' }" @click="activeTab = 'images'">Imágenes</button>
            <button :class="{ active: activeTab === 'sharing' }" @click="activeTab = 'sharing'">Compartir</button>
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
              <label>Título del artículo</label>
              <input v-model="localTitle" @input="saveChanges" type="text" placeholder="Ingrese el título del artículo">
              <div v-if="localBackgroundType === 'image'" class="white-title-option">
                <input type="checkbox" id="whiteTitleCheckbox" v-model="localWhiteTitle" @change="saveChanges">
                <label for="whiteTitleCheckbox">Título color blanco</label>
              </div>
            </div>
            <div class="form-group">
              <label>Color del texto del artículo</label>
              <input v-model="localTextColor" @input="updateTextColor" type="color">
            </div>
            <div class="form-group">
              <label>Descripción del artículo</label>
              <textarea v-model="localDescription" @input="saveChanges" rows="5" placeholder="Ingrese la descripción del artículo"></textarea>
            </div>
            <div class="form-group">
              <label>Botón de acción</label>
              <div class="action-button-config">
                <input type="checkbox" id="showActionButton" v-model="localShowActionButton" @change="saveChanges">
                <label for="showActionButton">Mostrar botón de acción</label>
              </div>
              <input v-if="localShowActionButton" v-model="localActionButtonText" @input="saveChanges" type="text" placeholder="Texto del botón">
              <input v-if="localShowActionButton" v-model="localActionButtonUrl" @input="saveChanges" type="text" placeholder="URL del botón">
            </div>
          </div>
  
          <div v-if="activeTab === 'images'" class="config-section">
            <h3>Gestión de Imágenes <i class="fas fa-images"></i></h3>
            <div v-for="(picture, index) in localPictures" :key="index" class="image-config">
              <div class="image-preview">
                <img :src="picture.image || '/img/default-image.jpg'" :alt="`Imagen ${index + 1}`">
              </div>
              <button @click="openImageModal(index)" class="change-image-button">
                <i class="fas fa-exchange-alt"></i> Cambiar imagen
              </button>
              <button @click="removeImage(index)" class="remove-image-button">
                <i class="fas fa-trash-alt"></i> Eliminar imagen
              </button>
            </div>
            <button v-if="localPictures.length < 5" @click="addImage" class="add-image-button">
              <i class="fas fa-plus"></i> Agregar imagen
            </button>
            <div class="form-group">
              <label>Color de superposición en hover</label>
              <input v-model="localOverlayColor" @input="updateOverlayColor" type="color">
            </div>
          </div>
  
          <div v-if="activeTab === 'sharing'" class="config-section">
            <h3>Configuración de Compartir <i class="fas fa-share-alt"></i></h3>
            <div class="form-group">
              <label>Facebook</label>
              <div class="share-option">
                <input type="checkbox" id="showFacebook" v-model="localShowFacebook" @change="saveChanges">
                <label for="showFacebook">Mostrar botón de Facebook</label>
              </div>
            </div>
            <div class="form-group">
              <label>Instagram</label>
              <div class="share-option">
                <input type="checkbox" id="showInstagram" v-model="localShowInstagram" @change="saveChanges">
                <label for="showInstagram">Mostrar botón de Instagram</label>
                <span class="sr-only">Copiar enlace para Instagram</span>
              </div>
            </div>
            <div class="form-group">
              <label>Twitter (X)</label>
              <div class="share-option">
                <input type="checkbox" id="showTwitter" v-model="localShowTwitter" @change="saveChanges">
                <label for="showTwitter">Mostrar botón de Twitter</label>
              </div>
            </div>
            <div class="form-group">
              <label>WhatsApp</label>
              <div class="share-option">
                <input type="checkbox" id="showWhatsapp" v-model="localShowWhatsapp" @change="saveChanges">
                <label for="showWhatsapp">Mostrar botón de WhatsApp</label>
              </div>
              <input v-if="localShowWhatsapp" v-model="localWhatsappNumber" @input="saveChanges" type="text" placeholder="Número de WhatsApp">
            </div>
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
      template: {
          type: Number,
          default: 1
      },
      title: {
          type: String,
          default: 'Título del Artículo'
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
      description: {
          type: String,
          default: 'Descripción del artículo...'
      },
      pictures: {
          type: Array,
          default: () => []
      },
      whiteTitle: {
          type: Boolean,
          default: false
      },
      textColor: {
          type: String,
          default: '#333333'
      },
      overlayColor: {
          type: String,
          default: 'rgba(0, 0, 0, 0.5)'
      },
      showActionButton: {
          type: Boolean,
          default: false
      },
      actionButtonText: {
          type: String,
          default: 'Nombre del Botón'
      },
      actionButtonUrl: {
          type: String,
          default: '/url-del-boton'
      },
      showFacebook: {
          type: Boolean,
          default: true
      },
      showInstagram: {
          type: Boolean,
          default: true
      },
      showTwitter: {
          type: Boolean,
          default: true
      },
      showWhatsapp: {
          type: Boolean,
          default: true
      },
      facebookAccount: {
          type: String,
          default: ''
      },
      instagramAccount: {
          type: String,
          default: ''
      },
      twitterAccount: {
          type: String,
          default: ''
      },
      whatsappNumber: {
          type: String,
          default: ''
      }
  });
  
  const templateStore = useTemplateStore();
  const currentStore = useCurrentStore();
  
  const showConfigModal = ref(false);
  const activeTab = ref('general');
  const localTitle = ref(props.title);
  const localBackgroundType = ref(props.backgroundType);
  const localBackgroundColor = ref(props.backgroundColor);
  const localBackgroundImage = ref(props.backgroundImage);
  const localDescription = ref(props.description);
  const localPictures = ref(props.pictures);
  const localWhiteTitle = ref(props.whiteTitle);
  const localTextColor = ref(props.textColor);
  const localOverlayColor = ref(props.overlayColor);
  const localShowActionButton = ref(props.showActionButton);
  const localActionButtonText = ref(props.actionButtonText);
  const localActionButtonUrl = ref(props.actionButtonUrl);
  const localShowFacebook = ref(props.showFacebook);
  const localShowInstagram = ref(props.showInstagram);
  const localShowTwitter = ref(props.showTwitter);
  const localShowWhatsapp = ref(props.showWhatsapp);
  const localFacebookAccount = ref(props.facebookAccount);
  const localInstagramAccount = ref(props.instagramAccount);
  const localTwitterAccount = ref(props.twitterAccount);
  const localWhatsappNumber = ref(props.whatsappNumber);
  
  const openGaleryImages = inject('openGaleryImages', () => {
      console.warn('openGaleryImages function is not available');
  });
  
  const backgroundStyle = computed(() => {
      if (localBackgroundType.value === 'image') {
          return { backgroundImage: `url(${localBackgroundImage.value})` };
      } else {
          return { backgroundColor: localBackgroundColor.value };
      }
  });
  
  watch(() => templateStore.structure.page_template.sections, (newSections) => {
      const currentSection = newSections.find(section => section.id === props.id);
      if (currentSection && currentSection.widget.element) {
          localTitle.value = currentSection.widget.element.title || 'Título del Artículo';
          localBackgroundType.value = currentSection.widget.element.backgroundType || 'color';
          localBackgroundColor.value = currentSection.widget.element.backgroundColor || '#ffffff';
          localBackgroundImage.value = currentSection.widget.element.backgroundImage || '';
          localDescription.value = currentSection.widget.element.description || 'Descripción del artículo...';
          localPictures.value = currentSection.widget.element.pictures || [];
          localWhiteTitle.value = currentSection.widget.element.whiteTitle || false;
          localTextColor.value = currentSection.widget.element.textColor || '#333333';
          localOverlayColor.value = currentSection.widget.element.overlayColor || 'rgba(0, 0, 0, 0.5)';
          localShowActionButton.value = currentSection.widget.element.showActionButton || false;
          localActionButtonText.value = currentSection.widget.element.actionButtonText || 'Nombre del botón';
          localActionButtonUrl.value = currentSection.widget.element.actionButtonUrl || '/url-del-boton';
          localShowFacebook.value = currentSection.widget.element.showFacebook !== undefined ? currentSection.widget.element.showFacebook : true;
          localShowInstagram.value = currentSection.widget.element.showInstagram !== undefined ? currentSection.widget.element.showInstagram : true;
          localShowTwitter.value = currentSection.widget.element.showTwitter !== undefined ? currentSection.widget.element.showTwitter : true;
          localShowWhatsapp.value = currentSection.widget.element.showWhatsapp !== undefined ? currentSection.widget.element.showWhatsapp : true;
          localFacebookAccount.value = currentSection.widget.element.facebookAccount || '';
          localInstagramAccount.value = currentSection.widget.element.instagramAccount || '';
          localTwitterAccount.value = currentSection.widget.element.twitterAccount || '';
          localWhatsappNumber.value = currentSection.widget.element.whatsappNumber || '';
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
          backgroundType: localBackgroundType.value,
          backgroundColor: localBackgroundColor.value,
          backgroundImage: localBackgroundImage.value,
          description: localDescription.value,
          pictures: localPictures.value,
          whiteTitle: localWhiteTitle.value,
          textColor: localTextColor.value,
          overlayColor: localOverlayColor.value,
          showActionButton: localShowActionButton.value,
          actionButtonText: localActionButtonText.value,
          actionButtonUrl: localActionButtonUrl.value,
          showFacebook: localShowFacebook.value,
          showInstagram: localShowInstagram.value,
          showTwitter: localShowTwitter.value,
          showWhatsapp: localShowWhatsapp.value,
          facebookAccount: localFacebookAccount.value,
          instagramAccount: localInstagramAccount.value,
          twitterAccount: localTwitterAccount.value,
          whatsappNumber: localWhatsappNumber.value
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
  
  function toggleBackgroundType() {
      localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
      saveChanges();
  }
  
  function updateBackgroundColor() {
      saveChanges();
  }
  
  function updateTextColor() {
      saveChanges();
  }
  
  function updateOverlayColor() {
      saveChanges();
  }
  
  function openBackgroundImageModal() {
      currentStore.setSectionId(props.id);
      currentStore.setSectionProp("backgroundImage");
      if (openGaleryImages) {
          openGaleryImages();
      } else {
          console.error('openGaleryImages function is not available');
      }
  }

  function openImageModal(index) {
  currentStore.setSectionId(props.id);
  currentStore.setSectionProp(`pictures[${index}].image`);
  if (openGaleryImages) {
    openGaleryImages();
  } else {
    console.error('openGaleryImages function is not available');
  }
}
  
  function addImage() {
      if (localPictures.value.length < 5) {
        localPictures.value.push({
            image: '/img/default-image.jpg',
          });
          saveChanges();
      }
  }
  
  function removeImage(index) {
    localPictures.value.splice(index, 1);
      saveChanges();
  }
  
  function handleActionClick() {
      if (localActionButtonUrl.value) {
          window.open(localActionButtonUrl.value, '_blank');
      }
  }
  
  function shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank');
  }
  
  function shareOnInstagram() {
        const text = `${localTitle.value} - ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Enlace copiado al portapapeles. Ahora puedes pegarlo en tu publicación de Instagram.');
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }
  
    function shareOnTwitter() {
        const text = encodeURIComponent(`${localTitle.value}`);
        const url = encodeURIComponent(window.location.href);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterUrl, '_blank');
    }
  
  function shareOnWhatsapp() {
      const text = encodeURIComponent(`${localTitle.value} - ${window.location.href}`);
      const url = `https://wa.me/?text=${text}`;
      window.open(url, '_blank');
  }
  
  watch(() => currentStore.selectedImage, (newImage) => {
  if (currentStore.sectionId === props.id) {
    if (currentStore.sectionProp === "backgroundImage") {
      localBackgroundImage.value = newImage;
      localBackgroundType.value = 'image';
    } else if (currentStore.sectionProp.startsWith("pictures[")) {
      const match = currentStore.sectionProp.match(/pictures\[(\d+)\]\.image/);
      if (match) {
        const index = parseInt(match[1]);
        localPictures.value[index] = { image: newImage };
      }
    }
    saveChanges();
  }
});
  
  onMounted(() => {
      // Aquí puedes agregar cualquier lógica que necesites ejecutar cuando el componente se monta
  });
  
  onUnmounted(() => {
      // Aquí puedes agregar cualquier lógica de limpieza cuando el componente se desmonta
  });
  </script>
<style lang="scss" scoped>
.article-section {
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
    z-index: 10;

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

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  h2 {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #2d3748;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50%;
      height: 3px;
      background-color: #818181;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    &.white-title {
      color: white;

      &::after {
        background-color: white;
      }
    }
  }

  .article-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  .images-container {
    width: 100%;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      width: 40%;
      float: right;
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }

  .article-image {
    position: relative;
    margin-bottom: 1rem;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      opacity: 0.5;
      transition: all 0.8s ease;
    }

    &:hover .image-overlay {
      height: 0;
      bottom: 50%;
      opacity: 0;
      border-radius: 100%;
    }
  }

  .text-content {
    flex: 1;
    text-align: justify;
    line-height: 1.6;
    padding: 1rem;

    @media (min-width: 768px) {
      overflow: hidden;
    }
  }

  .action-button {
    display: block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #8095a6;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
    cursor: pointer;
    float: right;

    &:hover {
      background-color: #3182ce;
    }
  }

  .share-section {
    margin-top: 3rem;
    text-align: center;
    clear: both;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .share-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .share-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      transition: transform 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      &.facebook {
        background-color: #1877f2;
      }

      &.instagram {
        background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
      }

      &.twitter {
        background-color: #1da1f2;
      }

      &.whatsapp {
        background-color: #25d366;
      }
    }
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
  z-index: 1000;

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        font-size: 1.25rem;
        color: #4299e1;
      }
    }

    .background-image-selector {
        display: flex;
        align-items: center;
        img {
            width: 40%;
        }
        button {
            padding: 0.75rem 1rem;
            font-size: 1rem;
            font-weight: bold;
            color: #4a5568;
            background: none;
            border: none;
            cursor: pointer;
            background-color: #48bb78;
            transition: all 0.3s ease;
            border-radius: 0.25rem;
            margin: 10px;
            color: white;
        }
    }

    .config-tabs {
      display: flex;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #e2e8f0;

      button {
        padding: 0.75rem 1rem;
        font-size: 1rem;
        font-weight: bold;
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

    .config-section {
      h3 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #2d3748;
      }

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        input[type="text"],
        input[type="color"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
        }

        input[type="color"] {
          width: 100%;
          height: 40px;
          padding: 0;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }
      }

      .background-type-buttons,
      .action-button-config,
      .share-option {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        button, label {
          flex: 1;
          padding: 0.5rem;
          text-align: center;
          background-color: #e2e8f0;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &.active, &:hover {
            background-color: #4299e1;
            color: white;
          }
        }
      }

      .image-config {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        .image-preview {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 0.25rem;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        button {
          padding: 0.5rem;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #3182ce;
          }

          &.remove-image-button {
            background-color: #f56565;

            &:hover {
              background-color: #e53e3e;
            }
          }
        }
      }

      .add-image-button {
        width: 100%;
        padding: 0.75rem;
        background-color: #48bb78;
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #38a169;
        }
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;

      button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.25rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;

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
      }
    }
  }
}

@media (max-width: 767px) {
  .config-modal .modal-content {
    padding: 1rem;
    width: 95%;
  }

  .config-modal .config-tabs button {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .config-modal .form-group input[type="text"],
  .config-modal .form-group input[type="color"],
  .config-modal .form-group textarea {
    font-size: 0.875rem;
  }

  .config-modal .modal-actions button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>