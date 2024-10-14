<template>
    <footer ref="footerRef" class="relative overflow-hidden bg-gray-900 text-white">
      <div class="footer-content" ref="wrapperRef">
        <div class="w-full" :style="backgroundStyle">
          <!--Template 1-->
          <div v-if="Number(localTemplate) === 1" class="py-10 px-20">
              <!-- Main title -->
              <h2 ref="titleFooterRef" class="text-8xl font-bold mb-8 text-left animated-element big-title">
                <div 
                  class="styled-input styled-input-h2" 
                  :contenteditable="!viewMode" 
                  @input="onInputTitle" 
                  @blur="updateTitle" 
                  :style="{ color: localTitleColor }"
                  v-text="localTitle"
                ></div>
              </h2>
              
              <!-- Columns container -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8 footer-columns">
                <!-- Important Links -->
                <div ref="linksRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputLinksTitle"
                      :style="{ color: localTextColor }"
                      v-text="localLinksTitle"
                    ></div>
                  </h3>
                  <ul>
                    <li v-for="(link, index) in localLinks" :key="index" class="mb-2">
                      <a 
                        :href="link.url" 
                        class="hover:underline"
                        :style="{ color: localTextColor }"
                        v-if="viewMode"
                      >
                        <div 
                          class="styled-input" 
                          :contenteditable="!viewMode" 
                          @input="(event) => onInputLinkText(event, index)" 
                          @blur="(event) => updateLinkText(event, index)" 
                          v-text="link.text"
                        ></div>
                      </a>
                      <div 
                          class="styled-input hover:underline" 
                          :contenteditable="!viewMode" 
                          :style="{ color: localTextColor }"
                          @input="(event) => onInputLinkText(event, index)" 
                          @blur="(event) => updateLinkText(event, index)" 
                          v-text="link.text"
                          v-if="!viewMode"
                        ></div>
                    </li>
                  </ul>
                </div>
                
                <!-- Contact Info -->
                <div ref="contactFooterRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputContactTitle" 
                      @blur="updateContactTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localContactTitle"
                    ></div>
                  </h3>
                  <div 
                    class="styled-input" 
                    :contenteditable="!viewMode" 
                    @input="onInputContactInfo" 
                    @blur="updateContactInfo" 
                    :style="{ color: localTextColor }"
                    v-text="localContactInfo"
                  ></div>
                </div>
                
                <!-- Description -->
                <div ref="descriptionFooterRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputDescriptionTitle" 
                      @blur="updateDescriptionTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localDescriptionTitle"
                    ></div>
                  </h3>
                  <div 
                    class="styled-input" 
                    :contenteditable="!viewMode" 
                    @input="onInputDescription" 
                    @blur="updateDescription" 
                    :style="{ color: localTextColor }"
                    v-text="localDescription"
                  ></div>
                </div>
                
                <!-- Social Media -->
                <div ref="socialRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputSocialTitle" 
                      @blur="updateSocialTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localSocialTitle"
                    ></div>
                  </h3>
                  <div class="flex space-x-4 text-4xl">
                    <a v-for="(social, index) in localSocialMedia" :key="index" :href="social.url" :style="{ color: localTextColor }" class="hover:text-gray-300 transition-transform duration-300 hover:-translate-y-1">
                      <font-awesome-icon v-if="social.icon" :icon="social.icon"/>
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Divider line -->
              <div ref="dividerRef" class="divider animated-element bg-white my-8"></div>
              
              <!-- Copyright -->
              <p ref="copyrightRef" class="text-center">
                <div 
                  class="styled-input" 
                  :contenteditable="!viewMode" 
                  @input="onInputCopyright" 
                  @blur="updateCopyright" 
                  :style="{ color: localTextColor }"
                  v-text="localCopyright"
                ></div>
              </p>

          </div>
          <!--Template 2-->
          <div v-if="Number(localTemplate) === 2" class="py-10 px-20">
              <!-- Columns container -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8 footer-columns">
                <!-- Important Links -->
                <div ref="linksRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputLinksTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localLinksTitle"
                    ></div>
                  </h3>
                  <ul>
                    <li v-for="(link, index) in localLinks" :key="index" class="mb-2">
                      <a 
                        :href="link.url" 
                        class="hover:underline"
                        :style="{ color: localTextColor }"
                        v-if="viewMode"
                      >
                        <div 
                          class="styled-input" 
                          :contenteditable="!viewMode" 
                          @input="(event) => onInputLinkText(event, index)" 
                          @blur="(event) => updateLinkText(event, index)" 
                          v-text="link.text"
                        ></div>
                      </a>
                      <div 
                          class="styled-input hover:underline" 
                          :contenteditable="!viewMode" 
                          :style="{ color: localTextColor }"
                          @input="(event) => onInputLinkText(event, index)" 
                          @blur="(event) => updateLinkText(event, index)" 
                          v-text="link.text"
                          v-if="!viewMode"
                        ></div>
                    </li>
                  </ul>
                </div>
                
                <!-- Contact Info -->
                <div ref="contactFooterRef" class="animated-element footer-column">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputContactTitle" 
                      @blur="updateContactTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localContactTitle"
                    ></div>
                  </h3>
                  <div 
                    class="styled-input" 
                    :contenteditable="!viewMode" 
                    @input="onInputContactInfo" 
                    @blur="updateContactInfo" 
                    :style="{ color: localTextColor }"
                    v-text="localContactInfo"
                  ></div>
                </div>
                <!-- Social Media -->
                <div ref="socialRef" class="animated-element footer-column template-2-social">
                  <h3 class="text-xl font-semibold mb-4">
                    <div 
                      class="styled-input styled-input-h3" 
                      :contenteditable="!viewMode" 
                      @input="onInputSocialTitle" 
                      @blur="updateSocialTitle" 
                      :style="{ color: localTextColor }"
                      v-text="localSocialTitle"
                    ></div>
                  </h3>
                  <div class="flex space-x-4 text-4xl">
                    <a v-for="(social, index) in localSocialMedia" :key="index" :href="social.url" :style="{ color: localTextColor }" class="hover:text-gray-300 transition-transform duration-300 hover:-translate-y-1">
                      <font-awesome-icon v-if="social.icon" :icon="social.icon"/>
                    </a>
                  </div>
                </div>

                <!-- Image Footer -->
                <div ref="imageFooterRef" class="animated-element footer-column relative overflow-hidden h-48 p-5">
                  <img 
                    :src="localFooterImage" 
                    alt="Footer Image" 
                    class="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
                    :class="{'animate-float': hasAnimatedIn}"
                  >
                </div>
                
              </div>
              
              <!-- Divider line -->
              <div class="divider animated-element bg-white my-8"></div>
              
              <!-- Copyright -->
              <p class="text-center">
                <div 
                  class="styled-input" 
                  :contenteditable="!viewMode" 
                  @input="onInputCopyright" 
                  @blur="updateCopyright" 
                  :style="{ color: localTextColor }"
                  v-text="localCopyright"
                ></div>
              </p>

          </div>
        </div>
      </div>
  
     <!-- Botón de configuración -->
     <button v-if="!viewMode" @click="openConfigModal" class="config-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6  text-gray-900">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
    <button v-if="!viewMode" @click="openModalVideo" class="video-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-900">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    </footer>
  
    <!-- Modal de configuración -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
  <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
  <div class="bg-white p-6 rounded-lg w-3/4 max-w-4xl my-8 custom-modal">
    <h2 class="text-2xl font-bold mb-4">Configuración del Footer</h2>

    <div class="pr-4">
      <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Fondo de la sección</label>
          <div class="flex items-center space-x-4">
            <button @click="toggleBackgroundType" class="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-400">
              Usar {{ localBackgroundType === 'imagen' ? 'color de fondo' : 'imágen de fondo' }}
            </button>
          </div>
          <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor" @input="updateBackgroundColor" type="color" class="mt-2 p-1 w-full h-10">
          <div v-if="localBackgroundType === 'imagen'" class="mt-2 flex items-center">
            <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background" class="h-full w-full object-cover">
              <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button @click="updateBackgroundImage" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Seleccionar imagen
            </button>
          </div>
        </div>
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <input type="text" id="title" v-model="localTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="mb-4">
        <label for="titleColor" class="block text-sm font-medium text-gray-700">Color del Título</label>
        <input type="color" id="titleColor" v-model="localTitleColor"
          class="mt-1 block rounded-md border-gray-300 shadow-sm w-full">
      </div>

      <div class="mb-4">
        <label for="textColor" class="block text-sm font-medium text-gray-700">Color del Texto</label>
        <input type="color" id="textColor" v-model="localTextColor"
          class="mt-1 block rounded-md border-gray-300 shadow-sm w-full">
      </div>

      <div class="mb-4">
        <label for="linksTitle" class="block text-sm font-medium text-gray-700">Título de Enlaces</label>
        <input type="text" id="linksTitle" v-model="localLinksTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Enlaces</label>
        <small>Debes tener otras páginas creadas y usar la URL respectiva, o bien utilizar una URL de un sitio externo como https://www.otraweb.com.</small>
        <div v-for="(link, index) in localLinks" :key="index" class="flex items-center mt-2">
          <input type="text" v-model="link.text" placeholder="Texto del enlace"
            class="mr-2 block w-1/2 rounded-md border-gray-300 shadow-sm">
          <input type="text" v-model="link.url" placeholder="URL del enlace"
            class="block w-1/2 rounded-md border-gray-300 shadow-sm">
        </div>
      </div>

      <div class="mb-4">
        <label for="contactTitle" class="block text-sm font-medium text-gray-700">Título de Contacto</label>
        <input type="text" id="contactTitle" v-model="localContactTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="mb-4">
        <label for="contactInfo" class="block text-sm font-medium text-gray-700">Información de Contacto</label>
        <textarea id="contactInfo" v-model="localContactInfo" rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>

      <div class="mb-4">
        <label for="descriptionTitle" class="block text-sm font-medium text-gray-700">Título de Descripción</label>
        <input type="text" id="descriptionTitle" v-model="localDescriptionTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" v-model="localDescription" rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>

      <div class="mb-4">
        <label for="socialTitle" class="block text-sm font-medium text-gray-700">Título de Redes Sociales</label>
        <input type="text" id="socialTitle" v-model="localSocialTitle"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Redes Sociales</label>
        <div v-for="(social, index) in localSocialMedia" :key="index" class="flex items-center mt-2">
          <input type="text" v-model="social.icon" placeholder="Clase del ícono"
            class="mr-2 block w-1/2 rounded-md border-gray-300 shadow-sm">
          <input type="text" v-model="social.url" placeholder="URL de la red social"
            class="block w-1/2 rounded-md border-gray-300 shadow-sm">
        </div>
      </div>

      <div class="mb-4">
        <label for="copyright" class="block text-sm font-medium text-gray-700">Copyright</label>
        <input type="text" id="copyright" v-model="localCopyright"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

        <div v-if="Number(localTemplate) === 2" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Imagen flotante a la derecha</label>
          <div class="flex items-center">
            <div class="w-10 h-10 mr-4 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
              <img v-if="localFooterImage" :src="localFooterImage" alt="Footer Image Preview" class="w-full h-full object-cover">
              <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <button @click="updateFooterImage" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Seleccionar imagen
            </button>
          </div>
        </div>
    </div>

    <div class="flex justify-end mt-6">
      <button @click="closeConfigModal"
        class="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
        Cancelar
      </button>
      <button @click="saveChangesBtn"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
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
    textColor: {
        type: String,
        default: '#000000'
    },
    title: {
        type: String,
        default: 'Contáctanos'
    },
    titleColor: {
        type: String,
        default: '#000000'
    },
    backgroundType: {
        type: String,
        default: 'color'
    },
    backgroundColor: {
        type: String,
        default: '#f3f4f6'
    },
    backgroundImage: {
        type: String,
        default: ''
    },
    links: {
        type: Array,
        default: () => [
            { text: 'Inicio', url: '#' },
            { text: 'Servicios', url: '#' },
            { text: 'Acerca de', url: '#' },
            { text: 'Contacto', url: '#' }
        ]
    },
    linksTitle: {
        type: String,
        default: 'Enlaces importantes'
    },
    contactInfo: {
        type: String,
        default: 'info@example.com\n+1 234 567 890'
    },
    contactTitle: {
        type: String
    },
    description: {
        type: String,
        default: 'Somos una empresa dedicada a proporcionar soluciones innovadoras...'
    },
    descriptionTitle: {
        type: String,
        default: 'Descripción'
    },
    socialMedia: {
        type: Array,
        default: () => [
            { icon: 'fa-brands fa-square-facebook', url: '#' },
            { icon: 'fa-brands fa-square-instagram', url: '#' },
            { icon: 'fa-brands fa-square-twitter', url: '#' },
            { icon: 'fa-brands fa fa-twitter-square', url: '#' }
        ]
    },
    socialTitle: {
        type: String
    },
    copyright: {
        type: String,
        default: '© 2024 Tu Empresa. Todos los derechos reservados.'
    },
    footerImage: {
      type: String,
      default: ''
    }
});

const BACKGROUND_TYPES = {
  COLOR: 'color',
  IMAGE: 'imagen',
};

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const wrapperRef = ref(null);
const footerRef = ref(null);
const titleFooterRef = ref(null);
const linksRef = ref(null);
const contactFooterRef = ref(null);
const descriptionFooterRef = ref(null);
const socialRef = ref(null);
const dividerRef = ref(null);
const copyrightRef = ref(null);
const imageFooterRef = ref(null);
const showModalVideo = ref(false);
const videoId = ref('vj5UgeFStOo');

const saveTemplate = inject('saveTemplate');

const animatedElements = ref([]);
const isAnimatingIn = ref(true);
const lastScrollTop = ref(0);
const hasAnimatedIn = ref(false);

const localTextColor = ref(props.textColor);
const localTitle = ref(props.title);
const localTitleColor = ref(props.titleColor);
const localBackgroundType = ref(props.backgroundType);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundImage = ref(props.backgroundImage);
const localLinks = ref(props.links);
const localLinksTitle = ref(props.linksTitle);
const localContactInfo = ref(props.contactInfo);
const localContactTitle = ref(props.contactTitle);
const localDescription = ref(props.description);
const localDescriptionTitle = ref(props.descriptionTitle);
const localSocialMedia = ref(props.socialMedia);
const localSocialTitle = ref(props.socialTitle);
const localCopyright = ref(props.copyright);
const localTemplate = ref(props.template);
const localFooterImage = ref(props.footerImage);

const showConfigModal = ref(false);

onMounted(() => {
  updateAnimatedElements();
  window.addEventListener('scroll', handleScroll);

  if(!props.viewMode) {
    animateElements(true);
  } else {
    animateElements(false);
  }
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

const resetAnimations = () => {
  hasAnimatedIn.value = false;
  isAnimatingIn.value = true;
  animatedElements.value.forEach(element => {
    element.classList.remove('animate-in', 'animate-out');
  });
};

const updateAnimatedElements = () => {
  animatedElements.value = [
    titleFooterRef.value,
    linksRef.value,
    contactFooterRef.value,
    descriptionFooterRef.value,
    socialRef.value,
    dividerRef.value,
    copyrightRef.value,
    imageFooterRef.value
  ].filter(Boolean); // Filtra elementos null o undefined
};

watch(() => localTemplate.value, (newTemplate, oldTemplate) => {
  if (newTemplate !== oldTemplate) {
    // Espera a que el DOM se actualice antes de reiniciar las animaciones
    nextTick(() => {
      updateAnimatedElements();
      resetAnimations();
      // Forzar un reflow para asegurar que las animaciones se reinicien
      animatedElements.value.forEach(el => el && el.offsetHeight);
      // Iniciar las animaciones de entrada
      animateElements(true);
    });
  }
});

const onInputTitle = (event) => {
  localTitle.value = event.target.innerText;
  saveChanges();
};

const onInputLinksTitle = (event) => {
  localLinksTitle.value = event.target.innerText;
  saveChanges();
};

const onInputContactTitle = (event) => {
  localContactTitle.value = event.target.innerText;
  saveChanges();
};

const onInputContactInfo = (event) => {
  localContactInfo.value = event.target.innerText;
  saveChanges();
};

const onInputDescriptionTitle = (event) => {
  localDescriptionTitle.value = event.target.innerText;
  saveChanges();
};

const onInputDescription = (event) => {
  localDescription.value = event.target.innerText;
  saveChanges();
};

const onInputSocialTitle = (event) => {
  localSocialTitle.value = event.target.innerText;
  saveChanges();
};

const onInputCopyright = (event) => {
  localCopyright.value = event.target.innerText;
  saveChanges();
};

const updateFooterImage = () => {
  currentStore.setSectionProp("footerImage");
  if (openGaleryImages) {
    openGaleryImages();
  } else {
    console.error('openGaleryImages function is not available');
  }
};

const toggleBackgroundType = () => {
  const types = Object.values(BACKGROUND_TYPES);
  const nextIndex = (backgroundTypeIndex.value + 1) % types.length;
  localBackgroundType.value = types[nextIndex];
  saveChanges();
};

const backgroundTypeIndex = computed(() => 
  Object.values(BACKGROUND_TYPES).indexOf(localBackgroundType.value)
);

const backgroundStyle = computed(() => {
  switch (localBackgroundType.value) {
    case BACKGROUND_TYPES.IMAGE:
      return { 
        backgroundImage: `url(${localBackgroundImage.value})`, 
        backgroundSize: 'cover' 
      };
    case BACKGROUND_TYPES.COLOR:
    default:
      return { backgroundColor: localBackgroundColor.value };
  }
});

function updateBackgroundColor() {
  saveChanges();
}

const handleScroll = () => {
  const footer = footerRef.value;
  if (!footer) return;

  const footerRect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Verificar si el scroll es hacia abajo o hacia arriba
  const isScrollingDown = scrollTop > lastScrollTop.value;
  lastScrollTop.value = scrollTop;

  const footerMidpoint = footerRect.top + footerRect.height / 2;

  if (footerMidpoint <= windowHeight) {
    if (!hasAnimatedIn.value || (isScrollingDown && !isAnimatingIn.value)) {
      isAnimatingIn.value = true;
      hasAnimatedIn.value = true;
      animateElements(true);
    }
  } else if (!isScrollingDown && isAnimatingIn.value) {
    isAnimatingIn.value = false;
    animateElements(false);
  }
};

const animateElements = (animateIn) => {
  animatedElements.value.forEach((element, index) => {
    setTimeout(() => {
      if (animateIn) {
        element.classList.add('animate-in');
        element.classList.remove('animate-out');
      } else {
        element.classList.remove('animate-in');
        element.classList.add('animate-out');
      }
    }, index * 200); // 200ms de retraso entre cada elemento
  });
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

const updateBackgroundImage = () => {
    currentStore.setSectionProp("backgroundImage");
    if (openGaleryImages) {
        openGaleryImages();
    } else {
        console.error('openGaleryImages function is not available');
    }
};

const saveChangesBtn = () => {
    saveChanges();
    closeConfigModal();
    saveTemplate();
};

const saveChanges = () => {
    templateStore.updateWidgetInSection(props.id, {
        textColor: localTextColor.value,
        title: localTitle.value,
        titleColor: localTitleColor.value,
        backgroundType: localBackgroundType.value,
        backgroundColor: localBackgroundColor.value,
        backgroundImage: localBackgroundImage.value,
        links: localLinks.value,
        linksTitle: localLinksTitle.value,
        contactInfo: localContactInfo.value,
        contactTitle: localContactTitle.value,
        description: localDescription.value,
        descriptionTitle: localDescriptionTitle.value,
        socialMedia: localSocialMedia.value,
        socialTitle: localSocialTitle.value,
        copyright: localCopyright.value,
        footerImage: localFooterImage.value,
        template: localTemplate.value,
    });
};

watch(() => templateStore.structure.page_template.sections, (newSections) => {
    const currentSection = newSections.find(section => section.id === props.id);
    if (currentSection) {
        localTextColor.value = currentSection.widget.element.textColor;
        localTitle.value = currentSection.widget.element.title;
        localTitleColor.value = currentSection.widget.element.titleColor;
        localBackgroundType.value = currentSection.widget.element.backgroundType;
        localBackgroundColor.value = currentSection.widget.element.backgroundColor;
        localBackgroundImage.value = currentSection.widget.element.backgroundImage;
        localLinks.value = currentSection.widget.element.links;
        localLinksTitle.value = currentSection.widget.element.linksTitle;
        localContactInfo.value = currentSection.widget.element.contactInfo;
        localContactTitle.value = currentSection.widget.element.contactTitle;
        localDescription.value = currentSection.widget.element.description;
        localDescriptionTitle.value = currentSection.widget.element.descriptionTitle;
        localSocialMedia.value = currentSection.widget.element.socialMedia;
        localSocialTitle.value = currentSection.widget.element.socialTitle;
        localCopyright.value = currentSection.widget.element.copyright;
        localTemplate.value = currentSection.widget.element.template;
        localFooterImage.value = currentSection.widget.element.footerImage;
    }
}, { deep: true });

// Watch for changes in the selected image

watch(() => currentStore.selectedImage, (newImage) => {
  if (currentStore.sectionId === props.id) {   
    if (currentStore.sectionProp === "backgroundImage") {
      localBackgroundImage.value = newImage;
      localBackgroundType.value = 'imagen';
    } else if (currentStore.sectionProp === "footerImage") {
      localFooterImage.value = newImage;
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
<style scoped>
.footer {
    position: relative;
    overflow: hidden;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content-container {
    position: relative;
    z-index: 10;
}

.styled-input {
    background: transparent;
    border: none;
    color: inherit;
    width: 100%;
}

.styled-input:focus {
    outline: none;
    border-bottom: 1px solid white;
}

.social-icon {
    transition: transform 0.3s ease;
}

.social-icon:hover {
    transform: scale(1.2);
}

.divider {
  height: 1px;
  width: 100%;
  transition: width 1s ease-in-out;
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

.animated-element {
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.animate-out {
  opacity: 0;
  transform: translateX(-100%);
}

/* Estilos existentes... */

/* Nuevos estilos para los bordes de las columnas */
.footer-columns {
  position: relative;
}

.footer-column {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
}

.footer-column::after {
  content: '';
  position: absolute;
  top: 30%;
  right: 0;
  height: 50%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
}

.footer-column:last-child::after {
  display: none;
}

.template-2-social::after {
  display: none;
}

/* Ajuste responsive */
@media (max-width: 768px) {
  .footer-column::after {
    display: none;
  }
  .template-1-social::after {
    display: none;
  }
  .big-title {
    font-size: 24px !important;
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

@keyframes floatAnimation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: floatAnimation 3s ease-in-out infinite;
}

.fade-in-up {
    animation: fadeInUp 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

.custom-modal {
  left: 40px;
  position: absolute;
  top: 20px;
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