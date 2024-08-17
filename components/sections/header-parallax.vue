<template>
    <div class="parallax-hero" ref="heroRef">
      <!-- Template 1 -->
      <div v-if="Number(localTemplate) === 1" class="hero-content">
        <div class="background-image" ref="bgImageRef" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
        <div class="center-image" ref="centerImageRef">
          <img :src="centerImage" alt="Center Image">
        </div>
        <div class="text-container">
          <h1 class="title" ref="titleRef">
            <div 
              class="styled-input styled-input-h1" 
              :contenteditable="!viewMode"
              @input="onInputTitle"
              @blur="updateTitle"
              v-text="localTitle"
            ></div>
          </h1>
          <p class="description" ref="descriptionRef">
            <div 
              class="styled-input styled-input-p" 
              :contenteditable="!viewMode"
              @input="onInputDescription"
              @blur="updateDescription"
              v-text="localDescription"
            ></div>
          </p>
        </div>
        <div class="arrow-down" ref="arrowRef">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
  
      <!-- Template 2 -->
      <div v-else-if="Number(localTemplate) === 2" class="hero-content">
        <!-- Estructura similar a Template 1, pero con diferencias de diseño si es necesario -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import { useTemplateStore } from '~/stores/template';
  import Rellax from 'rellax';
  
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
      default: 'Título Impactante'
    },
    description: {
      type: String,
      default: 'Una breve descripción que capture la atención'
    },
    backgroundImage: {
      type: String
    },
    centerImage: {
      type: String
    }
  });
  
  const templateStore = useTemplateStore();
  
  const heroRef = ref(null);
  const bgImageRef = ref(null);
  const centerImageRef = ref(null);
  const titleRef = ref(null);
  const descriptionRef = ref(null);
  const arrowRef = ref(null);
  const isMobile = ref(false);
  
  const localTitle = ref(props.title);
  const localDescription = ref(props.description);
  
  let rellaxInstances = [];
  
  const localTemplate = computed(() => {
    let currentTemplate = "1";
    debugger;
    templateStore.structure.page_template.sections.forEach((section) => {
      if (section.id === props.id) {
        currentTemplate = section.widget.element.template;
      }
    });
    return currentTemplate;
  });
  
  onMounted(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
  
    const elements = [bgImageRef, centerImageRef, titleRef, descriptionRef, arrowRef];
    const speeds = [
        isMobile.value ? -7.5 : -15,
        isMobile.value ? -4.5 : -9,
        isMobile.value ? -1 : -2,
        isMobile.value ? -1 : -2,
        isMobile.value ? -0.5 : -1
    ];

    rellaxInstances = elements.map((el, index) => {
        if (el.value) {
        return new Rellax(el.value, { speed: speeds[index], center: true });
        }
        return null;
    }).filter(instance => instance !== null);
  });
  
  onBeforeUnmount(() => {
    rellaxInstances.forEach(instance => {
        if (instance && typeof instance === 'object' && 'destroy' in instance && typeof instance.destroy === 'function') {
            instance.destroy();
        }
    });
    window.removeEventListener('resize', checkIfMobile);
  });
  
  function checkIfMobile() {
    isMobile.value = window.innerWidth <= 768;
    updateRellaxSpeeds();
  }
  
  function onInputTitle(event) {
    localTitle.value = event.target.innerText;
  }
  
  function onInputDescription(event) {
    localDescription.value = event.target.innerText;
  }
  
  function updateTitle() {
    templateStore.updateWidgetInSection(props.id, {
      title: localTitle.value
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
  </script>
  
  <style scoped>
  .parallax-hero {
    width: 100%;
    height: 800px;
    position: relative;
    overflow: hidden;
    font-family: var(--menu-font);
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
  
  .center-image {
    position: relative;
    width: 350px;
    height: 530px;
    margin-bottom: -8rem;
  }
  
  .center-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
.text-container {
    width: 100%;
    max-width: 800px;
    padding: 0 20px;
    box-sizing: border-box;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Add this line */
}
  
  .title, .description {
    position: relative;
    width: 100%;
  }
  
  .styled-input {
    width: 100%;
    background: transparent;
    border: none;
    color: inherit;
    font-family: inherit;
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
  
  .arrow-down {
    width: 40px;
    height: 80px;
    position: relative;
  }
  
  .arrow-down svg {
    width: 100%;
    height: 100%;
  }
  
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
  }
  </style>