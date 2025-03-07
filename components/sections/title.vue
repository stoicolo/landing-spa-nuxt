<template>
  <button v-if="!viewMode" @click="openConfigModal" class="config-button shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
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
  <div class="parallax-title" ref="componentRef" :style="parallaxTitleStyle">
    <div v-if="localBackgroundImage" class="background-image" ref="bgImageRef" :style="backgroundImageStyle"></div>
    <div v-else class="background-color" :style="{ backgroundColor: localBackgroundColor }"></div>
    <div class="title-container" ref="titleContainerRef" :style="titleContainerStyle">
      <h1 :style="titleStyle" class="title-text">
        <div
          class="styled-input"
          :contenteditable="!viewMode"
          @input="onInputTitle"
          @keydown.enter.prevent="handleEnterKey"
          @blur="updateTitle"
          ref="titleInput"
          v-html="formattedTitle"
        ></div>
      </h1>
    </div>
  </div>
  
  <div v-if="showConfigModal" class="config-modal">
    <div class="instruction-scroll">También puedes hacer scroll fuera del modal.</div>
    <div class="modal-content custom-modal">
      <h2>Configuración del Título</h2>

      <div class="config-item">
        <label for="fontSize">Tamaño de fuente: {{ localFontSize }}px</label>
        <input type="range" id="fontSize" v-model="localFontSize" min="16" max="72" step="1">
      </div>

      <div class="config-item">
        <label for="fontWeight">Peso de la fuente: {{ localFontWeight }}</label>
        <select id="fontWeight" v-model="localFontWeight">
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
      </div>

      <div class="config-item">
        <label for="height">Altura del componente: {{ localHeight }}px</label>
        <input type="range" id="height" v-model="localHeight" min="20" max="1000" step="10">
      </div>

      <div class="config-item">
        <label for="lineHeight">Altura de línea: {{ localLineHeight }}</label>
        <input type="range" id="lineHeight" v-model="localLineHeight" min="1" max="2" step="0.1">
      </div>

      <div class="config-item">
        <label for="textColor">Color del texto</label>
        <input type="color" id="textColor" v-model="localTextColor">
      </div>

      <div class="config-item">
        <label for="textAlign">Alineación del texto</label>
        <select id="textAlign" v-model="localTextAlign">
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>

      <div class="config-item">
        <label for="backgroundType">Tipo de fondo</label>
        <select id="backgroundType" v-model="localBackgroundType">
          <option value="image">Imagen</option>
          <option value="color">Color</option>
        </select>
      </div>

      <div v-if="localBackgroundType === 'image'" class="config-item">
        <label>Imagen de fondo</label>
        <div class="image-preview-container">
          <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background preview" class="image-preview">
          <div v-else class="image-preview-placeholder">Sin imagen</div>
        </div>
        <button @click="openImageModal" class="change-image-button">Cambiar imagen</button>
      </div>

      <div v-else class="config-item">
        <label for="backgroundColor">Color de fondo</label>
        <input type="color" id="backgroundColor" v-model="localBackgroundColor">
      </div>

      <div class="modal-actions">
        <button @click="closeConfigModal">Cancelar</button>
        <button @click="saveAndClose">Guardar cambios</button>
      </div>
    </div>
  </div>

  <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, inject, watch, nextTick } from 'vue';
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
  title: {
    type: String,
    default: 'Título por defecto'
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  height: {
    type: Number,
    default: 150
  },
  fontSize: {
    type: Number,
    default: 32
  },
  fontWeight: {
    type: [String, Number],
    default: 'normal'
  },
  lineHeight: {
    type: Number,
    default: 1.5
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  textAlign: {
    type: String,
    default: 'center'
  }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const componentRef = ref(null);
const bgImageRef = ref(null);
const titleContainerRef = ref(null);
const titleContainerHeight = ref(0);
const showModalVideo = ref(false);
const videoId = ref('ZvDn_VTNgtM');

const saveTemplate = inject('saveTemplate');

const localTitle = ref(props.title);
const titleInput = ref(null);
const localBackgroundImage = ref(props.backgroundImage);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundType = ref(props.backgroundImage ? 'image' : 'color');
const localFontSize = ref(props.fontSize);
const localLineHeight = ref(props.lineHeight);
const localTextColor = ref(props.textColor);
const localTextAlign = ref(props.textAlign);
const localHeight = ref(props.height);
const localFontWeight = ref(props.fontWeight);

let scrollListener = null;
let resizeObserver = null;

const showConfigModal = ref(false);

let rellaxInstanceTitle = null;

const parallaxTitleStyle = computed(() => {
  return {
    height: `${Math.max(localHeight.value, titleContainerHeight.value)}px`,
    minHeight: `${titleContainerHeight.value}px`
  }
});

watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection) {
    localTitle.value = currentSection.widget.element.title;
    localBackgroundImage.value = currentSection.widget.element.backgroundImage;
    localBackgroundColor.value = currentSection.widget.element.backgroundColor;
    localFontSize.value = currentSection.widget.element.fontSize || props.fontSize;
    localFontWeight.value = currentSection.widget.element.fontWeight || props.fontWeight;
    localLineHeight.value = currentSection.widget.element.lineHeight || props.lineHeight;
    localTextColor.value = currentSection.widget.element.textColor || props.textColor;
    localTextAlign.value = currentSection.widget.element.textAlign || props.textAlign;
    localBackgroundType.value = currentSection.widget.element.backgroundImage ? 'image' : 'color';
    localHeight.value = currentSection.widget.element.height || props.height;
  }
}, { deep: true });

watch(() => localTitle.value, (newValue) => {
  if (titleInput.value && titleInput.value.innerHTML !== newValue) {
    titleInput.value.innerHTML = newValue;
  }
});

watch([localTitle, localFontSize, localLineHeight], () => {
  nextTick(() => {
    updateTitleContainerHeight();
  });
});

onMounted(() => {
  if (titleInput.value) {   
    titleInput.value.innerHTML = convertEntityToBr(localTitle.value);
  }
  
  if (localBackgroundImage.value && bgImageRef.value) {
    scrollListener = window.addEventListener('scroll', handleScroll);
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);
  }

  updateTitleContainerHeight();
});

onBeforeUnmount(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', handleScroll);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const convertEntityToBr = (htmlString) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = htmlString;
  let decodedString = textarea.value;
  
  decodedString = decodedString.replace(/<br>/gi, '<br>');
  
  return decodedString;
}

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

const backgroundImageStyle = computed(() => {
  return {
    backgroundImage: `url(${localBackgroundImage.value})`,
    transition: 'transform 0.5s ease-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '1500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
});

const openModalVideo = () => {
  showModalVideo.value = true;
};

const closeModalVideo = () => {
  showModalVideo.value = false;
}

const titleContainerStyle = computed(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: localTextAlign.value,
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
  }
});

const titleStyle = computed(() => {
  return {
    fontSize: `${localFontSize.value}px`,
    lineHeight: localLineHeight.value,
    color: localTextColor.value,
    fontWeight: localFontWeight.value,
    margin: 0,
    padding: '10px',
    maxWidth: '80%',
    textAlign: localTextAlign.value,
  }
});

function handleEnterKey(event) {
  event.preventDefault();
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const br = document.createElement('br');

  range.deleteContents();
  range.insertNode(br);
  range.setStartAfter(br);
  range.setEndAfter(br);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);

nextTick(() => {
  localTitle.value = titleInput.value.innerHTML;
  updateTitle();
});
}

function onInputTitle(event) {
localTitle.value = event.target.innerHTML;
}

function updateTitle() {
if (titleInput.value) {
  const cleanHTML = titleInput.value.innerHTML
    .replace(/<div>/g, '<br>')
    .replace(/<\/div>/g, '')
    .replace(/<br><br>/g, '<br>');
  localTitle.value = cleanHTML;
  templateStore.updateWidgetInSection(props.id, {
    title: localTitle.value
  });
}
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

function openImageModal() {
currentStore.setSectionProp("backgroundImage");
if (openGaleryImages) {
  openGaleryImages();
} else {
  console.error('openGaleryImages function is not available');
}
}

const saveAndClose = () => {
saveChanges();
saveTemplate();
closeConfigModal();
}

function saveChanges() {
const height = Math.max(localHeight.value, titleContainerHeight.value);
templateStore.updateWidgetInSection(props.id, {
  title: localTitle.value,
  backgroundImage: localBackgroundType.value === 'image' ? localBackgroundImage.value : '',
  backgroundColor: localBackgroundType.value === 'color' ? localBackgroundColor.value : '',
  fontSize: localFontSize.value,
  lineHeight: localLineHeight.value,
  textColor: localTextColor.value,
  textAlign: localTextAlign.value,
  height: height,
  fontWeight: localFontWeight.value
});

if (localBackgroundType.value === 'image') {
  if (!scrollListener) {
    scrollListener = window.addEventListener('scroll', handleScroll);
  }
} else {
  if (scrollListener) {
    window.removeEventListener('scroll', handleScroll);
    scrollListener = null;
  }
}
}

const updateTitleContainerHeight = () => {
if (titleContainerRef.value) {
  titleContainerHeight.value = titleContainerRef.value.offsetHeight;
}
};
</script>

<style lang="scss" scoped>
.parallax-title {
width: 100%;
position: relative;
overflow: hidden;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.styled-input {
width: 100%;
background: transparent;
border: none;
color: inherit;
word-wrap: break-word;
overflow-wrap: break-word;
white-space: pre-wrap;
min-height: 1em;
text-align: inherit;

&:focus {
  outline: none;
  border-bottom: 1px solid currentColor;
}

&[contenteditable] {
  cursor: text;
  
  &:empty:before {
    content: attr(placeholder);
    color: #aaa;
  }
}
}

.background-image,
.background-color {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 800px;
}

.background-image {
background-size: cover;
background-position: center;
will-change: transform;
}

h1 {
position: relative;
z-index: 1;
text-align: inherit;
margin: 0;
padding: 10px;
max-width: 80%;
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
top: 61px;
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

.config-modal {
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
}

.modal-content {
background-color: white;
padding: 20px;
border-radius: 8px;
width: 80%;
max-width: 500px;
max-height: 80vh;
overflow-y: auto;
}

.config-item {
margin-bottom: 15px;

label {
  display: block;
  margin-bottom: 5px;
}

input[type="range"],
input[type="color"],
select {
  width: 100%;
}
}

.image-preview-container {
width: 100%;
height: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: #f0f0f0;
margin-bottom: 10px;
border-radius: 4px;
overflow: hidden;
}

.image-preview {
max-width: 100%;
max-height: 100%;
object-fit: contain;
}

.image-preview-placeholder {
color: #999;
}

.change-image-button {
width: 100%;
padding: 8px 16px;
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

.modal-actions {
display: flex;
justify-content: flex-end;
margin-top: 20px;

button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #f0f0f0;
  }

  &:last-child {
    background-color: #007bff;
    color: white;
  }
}
}

@media only screen and (max-width: 767px) {
.title-text {
  font-size: 24px !important;
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