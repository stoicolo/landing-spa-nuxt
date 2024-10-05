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
        <!-- Título de la sección -->
        <h2 v-if="localSectionTitle" class="text-[32px] font-bold mb-6" :style="{ color: localTitleColor }">
          <span v-if="!viewMode" @input="updateSectionTitle($event)" @blur="saveChanges" contenteditable>{{ localSectionTitle }}</span>
          <span v-else>{{ localSectionTitle }}</span>
        </h2>
  
        <!-- Mensaje de instrucciones -->
        <p v-if="localInstructions" class="mb-8" :style="{ color: localInstructionsColor }">
          <span v-if="!viewMode" @input="updateInstructions($event)" @blur="saveChanges" contenteditable>{{ localInstructions }}</span>
          <span v-else>{{ localInstructions }}</span>
        </p>
  
        <div class="flex flex-wrap -mx-4">
          <!-- Formulario -->
          <div class="w-full lg:w-1/2 px-4 mb-8">
            <form @submit.prevent="submitForm" class="shadow-md rounded px-8 pt-6 pb-8 mb-4" :style="{ backgroundColor: localFormBackgroundColor }">
              <div class="mb-4">
                <label class="block text-sm font-bold mb-2" :style="{ color: localLabelColor }" for="name">
                  Nombre
                </label>
                <input 
                  class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                  :style="{ color: localInputTextColor, backgroundColor: localInputBackgroundColor }"
                  id="name" 
                  type="text" 
                  v-model="formData.name"
                  :class="{ 'border-red-500': errors.name }"
                >
                <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name }}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-bold mb-2" :style="{ color: localLabelColor }" for="email">
                  Email
                </label>
                <input 
                  class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                  :style="{ color: localInputTextColor, backgroundColor: localInputBackgroundColor }"
                  id="email" 
                  type="email" 
                  v-model="formData.email"
                  :class="{ 'border-red-500': errors.email }"
                >
                <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-bold mb-2" :style="{ color: localLabelColor }" for="phone">
                  Teléfono
                </label>
                <div class="flex">
                  <select 
                    class="shadow appearance-none border rounded-l w-1/4 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                    :style="{ color: localInputTextColor, backgroundColor: localInputBackgroundColor }"
                    v-model="formData.phoneCode"
                  >
                    <option v-for="code in phoneCodes" :key="code" :value="code">+{{ code }}</option>
                  </select>
                  <input 
                    class="shadow appearance-none border rounded-r w-3/4 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                    :style="{ color: localInputTextColor, backgroundColor: localInputBackgroundColor }"
                    id="phone" 
                    type="tel" 
                    v-model="formData.phone"
                    :class="{ 'border-red-500': errors.phone }"
                  >
                </div>
                <p v-if="errors.phone" class="text-red-500 text-xs italic">{{ errors.phone }}</p>
              </div>
              <div class="mb-6">
                <label class="block text-sm font-bold mb-2" :style="{ color: localLabelColor }" for="message">
                  Mensaje
                </label>
                <textarea 
                  class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                  :style="{ color: localInputTextColor, backgroundColor: localInputBackgroundColor }"
                  id="message" 
                  v-model="formData.message"
                  rows="4"
                  :class="{ 'border-red-500': errors.message }"
                ></textarea>
                <p v-if="errors.message" class="text-red-500 text-xs italic">{{ errors.message }}</p>
              </div>
              <div class="">
                <button 
                  class="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full" 
                  :style="{ backgroundColor: localSubmitButtonColor, color: localSubmitButtonTextColor }"
                  type="submit"
                >
                  {{ localSubmitButtonText }}
                </button>
                <a 
                  v-if="localShowWhatsAppButton"
                  :href="whatsappLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline block"
                >
                <font-awesome-icon icon="fa-brands fa-whatsapp"/> Contactar por WhatsApp
                </a>
              </div>
            </form>
          </div>
  
          <!-- Imagen lateral -->
          <div v-if="localShowImage" class="w-full lg:w-1/2 px-4 mb-8 flex justify-center items-center">
            <img :src="localImage" alt="Imagen de contacto" class="w-[70%] rounded">
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal de configuración -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
      <div class="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Configuración del Formulario de Contacto</h2>
  
        <!-- Configuración general -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Fondo de la sección</label>
          <div class="flex items-center space-x-4">
            <button @click="toggleBackgroundType" class="px-4 py-2 border rounded" :class="{'bg-blue-500 text-white': localBackgroundType === 'color', 'bg-white text-gray-700': localBackgroundType !== 'color'}">Color</button>
            <button @click="toggleBackgroundType" class="px-4 py-2 border rounded" :class="{'bg-blue-500 text-white': localBackgroundType === 'image', 'bg-white text-gray-700': localBackgroundType !== 'image'}">Imagen</button>
          </div>
          <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor" @input="saveChanges" type="color" class="mt-2 p-1 w-full h-10">
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Título de la sección</label>
          <input v-model="localSectionTitle" @input="saveChanges" type="text" class="p-2 w-full border rounded" placeholder="Ingrese el título de la sección">
          <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Cambiar color del texto del título</label>
          <input v-model="localTitleColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Instrucciones</label>
          <textarea v-model="localInstructions" @input="saveChanges" class="p-2 w-full border rounded" rows="3" placeholder="Ingrese las instrucciones"></textarea>
          <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Cambiar color del texto de las instrucciones</label>
          <input v-model="localInstructionsColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email receptor</label>
          <input v-model="localReceiverEmail" @input="saveChanges" type="email" class="p-2 w-full border rounded" placeholder="email@ejemplo.com">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Color de fondo del formulario</label>
          <input v-model="localFormBackgroundColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Color del texto de las etiquetas</label>
          <input v-model="localLabelColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Color del texto de los campos de entrada</label>
          <input v-model="localInputTextColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Color de fondo de los campos de entrada</label>
          <input v-model="localInputBackgroundColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
        </div>
  
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Botón de envío</label>
          <input v-model="localSubmitButtonText" @input="saveChanges" type="text" class="p-2 w-full border rounded mb-2" placeholder="Texto del botón">
          <label class="block text-sm font-medium text-gray-700 mb-1">Color de fondo del botón</label>
          <input v-model="localSubmitButtonColor" @input="saveChanges" type="color" class="p-1 w-full h-10 mb-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Color del texto del botón</label>
        <input v-model="localSubmitButtonTextColor" @input="saveChanges" type="color" class="p-1 w-full h-10">
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input type="checkbox" v-model="localShowImage" @change="saveChanges" class="form-checkbox h-5 w-5 text-blue-600">
          <span class="ml-2 text-sm text-gray-700">Mostrar imagen lateral</span>
        </label>
      </div>

      <div v-if="localShowImage" class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Imagen lateral</label>
        <div class="flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img v-if="localImage" :src="localImage" alt="Lateral image" class="h-full w-full object-cover">
            <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <button @click="openImageModal" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cambiar imagen
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input type="checkbox" v-model="localShowWhatsAppButton" @change="saveChanges" class="form-checkbox h-5 w-5 text-blue-600">
          <span class="ml-2 text-sm text-gray-700">Mostrar botón de WhatsApp</span>
        </label>
      </div>

      <div v-if="localShowWhatsAppButton" class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Número de WhatsApp</label>
        <input autocomplete="off" v-model="localWhatsAppNumber" @input="saveChanges" type="tel" class="p-2 w-full border rounded" placeholder="Número de WhatsApp (sin código de país)">
      </div>

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
import { ref, computed, watch, inject, onMounted } from 'vue';
import { useTemplateStore } from '~/stores/template';
import { useCurrentStore } from '~/stores/current';
import axios from 'axios';
import modalViewVideos from '~/components/helpers/modalViewVideos.vue';
import PageTemplateService from '~/services/page_template';

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
  sectionTitle: {
    type: String,
    default: 'Contáctenos'
  },
  instructions: {
    type: String,
    default: 'Por favor, complete el formulario a continuación para ponerse en contacto con nosotros.'
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
  receiverEmail: {
    type: String,
    default: ''
  },
  showImage: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  titleColor: {
    type: String,
    default: '#000000'
  },
  instructionsColor: {
    type: String,
    default: '#000000'
  },
  formBackgroundColor: {
    type: String,
    default: '#ffffff'
  },
  labelColor: {
    type: String,
    default: '#000000'
  },
  inputTextColor: {
    type: String,
    default: '#000000'
  },
  inputBackgroundColor: {
    type: String,
    default: '#ffffff'
  },
  submitButtonText: {
    type: String,
    default: 'Enviar'
  },
  submitButtonColor: {
    type: String,
    default: '#3b82f6'
  },
  submitButtonTextColor: {
    type: String,
    default: '#ffffff'
  },
  showWhatsAppButton: {
    type: Boolean,
    default: false
  },
  whatsAppNumber: {
    type: String,
    default: ''
  }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const showConfigModal = ref(false);
const localSectionTitle = ref(props.sectionTitle);
const localInstructions = ref(props.instructions);
const localBackgroundType = ref(props.backgroundType);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundImage = ref(props.backgroundImage);
const localReceiverEmail = ref(props.receiverEmail);
const localShowImage = ref(props.showImage);
const localImage = ref(props.image);
const localTitleColor = ref(props.titleColor);
const localInstructionsColor = ref(props.instructionsColor);
const localFormBackgroundColor = ref(props.formBackgroundColor);
const localLabelColor = ref(props.labelColor);
const localInputTextColor = ref(props.inputTextColor);
const localInputBackgroundColor = ref(props.inputBackgroundColor);
const localSubmitButtonText = ref(props.submitButtonText);
const localSubmitButtonColor = ref(props.submitButtonColor);
const localSubmitButtonTextColor = ref(props.submitButtonTextColor);
const localShowWhatsAppButton = ref(props.showWhatsAppButton);
const localWhatsAppNumber = ref(props.whatsAppNumber);
const showModalVideo = ref(false);
const videoId = ref('DUGKn2PAXUg');

const formData = ref({
  name: '',
  email: '',
  phoneCode: '',
  phone: '',
  message: ''
});

const errors = ref({});
const phoneCodes = ref([]);

const openGaleryImages = inject('openGaleryImages', () => {
  console.warn('openGaleryImages function is not available');
});

watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection && currentSection.widget.element) {
    localSectionTitle.value = currentSection.widget.element.sectionTitle || '';
    localInstructions.value = currentSection.widget.element.instructions || '';
    localBackgroundType.value = currentSection.widget.element.backgroundType || 'color';
    localBackgroundColor.value = currentSection.widget.element.backgroundColor || '#f3f4f6';
    localBackgroundImage.value = currentSection.widget.element.backgroundImage || '';
    localReceiverEmail.value = currentSection.widget.element.receiverEmail || '';
    localShowImage.value = currentSection.widget.element.showImage || false;
    localImage.value = currentSection.widget.element.image || '';
    localTitleColor.value = currentSection.widget.element.titleColor || '#000000';
    localInstructionsColor.value = currentSection.widget.element.instructionsColor || '#000000';
    localFormBackgroundColor.value = currentSection.widget.element.formBackgroundColor || '#ffffff';
    localLabelColor.value = currentSection.widget.element.labelColor || '#000000';
    localInputTextColor.value = currentSection.widget.element.inputTextColor || '#000000';
    localInputBackgroundColor.value = currentSection.widget.element.inputBackgroundColor || '#ffffff';
    localSubmitButtonText.value = currentSection.widget.element.submitButtonText || 'Enviar';
    localSubmitButtonColor.value = currentSection.widget.element.submitButtonColor || '#3b82f6';
    localSubmitButtonTextColor.value = currentSection.widget.element.submitButtonTextColor || '#ffffff';
    localShowWhatsAppButton.value = currentSection.widget.element.showWhatsAppButton || false;
    localWhatsAppNumber.value = currentSection.widget.element.whatsAppNumber || '';
  }
}, { deep: true, immediate: true });

const backgroundStyle = computed(() => {
  if (localBackgroundType.value === 'image') {
    return { backgroundImage: `url(${localBackgroundImage.value})` };
  } else {
    return { backgroundColor: localBackgroundColor.value };
  }
});

const whatsappLink = computed(() => {
  if (localWhatsAppNumber.value && formData.value.phoneCode) {
    const fullNumber = formData.value.phoneCode + localWhatsAppNumber.value;
    return `https://wa.me/${fullNumber}`;
  }
  return '#';
});

function openConfigModal() {
  showConfigModal.value = true;
}

function closeConfigModal() {
  showConfigModal.value = false;
}

function saveChanges() {
  templateStore.updateWidgetInSection(props.id, {
    sectionTitle: localSectionTitle.value,
    instructions: localInstructions.value,
    backgroundType: localBackgroundType.value,
    backgroundColor: localBackgroundColor.value,
    backgroundImage: localBackgroundImage.value,
    receiverEmail: localReceiverEmail.value,
    showImage: localShowImage.value,
    image: localImage.value,
    titleColor: localTitleColor.value,
    instructionsColor: localInstructionsColor.value,
    formBackgroundColor: localFormBackgroundColor.value,
    labelColor: localLabelColor.value,
    inputTextColor: localInputTextColor.value,
    inputBackgroundColor: localInputBackgroundColor.value,
    submitButtonText: localSubmitButtonText.value,
    submitButtonColor: localSubmitButtonColor.value,
    submitButtonTextColor: localSubmitButtonTextColor.value,
    showWhatsAppButton: localShowWhatsAppButton.value,
    whatsAppNumber: localWhatsAppNumber.value
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

function updateInstructions(event) {
  localInstructions.value = event.target.innerText;
  saveChanges();
}

function toggleBackgroundType() {
  localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
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
  if (currentStore.sectionId === props.id) {
    if (currentStore.sectionProp === "backgroundImage") {
      localBackgroundImage.value = newImage;
      localBackgroundType.value = 'image';
    } else if (currentStore.sectionProp === "image") {
      localImage.value = newImage;
    }
    saveChanges();
  }
});

async function submitForm() {
  errors.value = {};

  // Validaciones
  if (!formData.value.name) {
    errors.value.name = 'El nombre es requerido';
  }
  if (!formData.value.email) {
    errors.value.email = 'El email es requerido';
  } else if (!/^\S+@\S+\.\S+$/.test(formData.value.email)) {
    errors.value.email = 'El email no es válido';
  }
  if (!formData.value.phone) {
    errors.value.phone = 'El teléfono es requerido';
  } else if (!/^\d+$/.test(formData.value.phone)) {
    errors.value.phone = 'El teléfono debe contener solo números';
  }
  if (!formData.value.message) {
    errors.value.message = 'El mensaje es requerido';
  }

  if (Object.keys(errors.value).length === 0) {
    try {
      const domain = window.location.hostname;

      await PageTemplateService.sendEmailContactForm(localReceiverEmail.value, formData.value.email, formData.value.name, formData.value.phone, formData.value.message, domain);

      alert('Mensaje enviado con éxito');

    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    }
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=idd');
    phoneCodes.value = response.data
      .map(country => {
        const root = country.idd.root?.replace('+', '');
        const suffix = country.idd.suffixes ? country.idd.suffixes[0] : '';
        return root && suffix ? `${root}${suffix}` : root;
      })
      .filter(Boolean)
      .sort((a, b) => parseInt(a) - parseInt(b));
    
    // Obtener el código de área por defecto según la IP
    const ipResponse = await axios.get('https://ipapi.co/json/');
    const countryCode = ipResponse.data.country_code;
    const countryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const country = countryResponse.data[0];
    if (country && country.idd && country.idd.root) {
      const root = country.idd.root.replace('+', '');
      const suffix = country.idd.suffixes ? country.idd.suffixes[0] : '';
      formData.value.phoneCode = `${root}${suffix}`;
    }
  } catch (error) {
    console.error('Error al obtener los códigos de teléfono:', error);
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