<template>
    <div class="relative w-full py-16 overflow-hidden" :class="{ 'bg-cover': localBackgroundType === 'image' }"
        :style="backgroundStyle">
        <!-- Configuration button -->
        <button v-if="!viewMode" @click="openConfigModal"
            class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </button>

        <button v-if="!viewMode" @click="openModalVideo" class="video-button shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

        <div class="container mx-auto px-4">
            <!-- Section title with editable text and color -->
            <h2 v-if="localSectionTitle" class="text-3xl font-bold text-center mb-12" :style="{ color: localSectionTitleColor }">
                <span v-if="!viewMode" @input="updateSectionTitle($event)" @blur="saveChanges" contenteditable>{{ localSectionTitle }}</span>
                <span v-else>{{ localSectionTitle }}</span>
            </h2>

            <!-- Carousel container -->
            <div class="relative overflow-hidden container-carousel">
                <!-- Template 1 -->
                <div v-if="Number(localTemplate) === 1" class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div v-for="(slide, index) in localSlides" :key="index" class="w-full flex-shrink-0 px-4">
                        <div class="overflow-hidden flex flex-col md:flex-row">
                            <div v-if="slide.showImage" class="md:w-1/2 img-slide">
                                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover">
                            </div>
                            <div class="p-6 md:w-1/2 flex flex-col justify-center">
                                <!-- Navigation arrows -->
                                <div :class="{'flex justify-between mb-4': Number(localTemplate) === 1, 'flex justify-start mb-4': Number(localTemplate) === 2}">
                                    <div :class="{'order-2': Number(localTemplate) === 1, 'order-1': Number(localTemplate) === 2}" class="flex space-x-2">
                                        <button @click="prevSlide"
                                            class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300  transition-transform duration-300 hover:-translate-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button @click="nextSlide"
                                            class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 transition-transform duration-300 hover:translate-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <h3 v-if="slide.showTitle" class="text-2xl font-semibold mb-2" :style="{ color: slide.titleColor }">
                                    <span v-if="!viewMode" @input="updateSlideTitle($event, index)" @blur="saveChanges" contenteditable>{{ slide.title }}</span>
                                    <span v-else>{{ slide.title }}</span>
                                </h3>
                                <p v-if="slide.showDescription" class="mb-4" :style="{ color: slide.descriptionColor }">
                                    <span v-if="!viewMode" @input="updateSlideDescription($event, index)" @blur="saveChanges" contenteditable>{{ slide.description }}</span>
                                    <span v-else>{{ slide.description }}</span>
                                </p>
                                <div class="inline-flex">
                                    <a 
                                        v-if="slide.showButton" 
                                        :href="viewMode ? slide.buttonLink : '#'"
                                        @click.prevent="!viewMode"
                                        class="cursor-pointer w-auto inline-flex items-center text-center py-2 px-16 rounded-xl border transition-colors duration-300 whitespace-nowrap hover:brightness-125" 
                                        :style="{ 
                                            borderColor: slide.buttonColor,
                                            backgroundColor:  slide.buttonColor,
                                            color: slide.buttonTextColor 
                                        }"
                                        >
                                        <span 
                                            v-if="!viewMode" 
                                            @input="updateSlideButtonText($event, index)" 
                                            @blur="saveChanges" 
                                            contenteditable
                                        >
                                            {{ slide.buttonText }}
                                        </span>
                                        <span v-else>{{ slide.buttonText }}</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Template 2 -->
                <div v-if="Number(localTemplate) === 2" class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div v-for="(slide, index) in localSlides" :key="index" class="w-full flex-shrink-0 px-4">
                        <div class="overflow-hidden flex flex-col md:flex-row-reverse">
                            <div v-if="slide.showImage" class="md:w-1/2 img-slide">
                                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover">
                            </div>
                            <div class="p-6 md:w-1/2 flex flex-col justify-center">
                                <!-- Navigation arrows -->
                                <div :class="{'flex justify-between mb-4': Number(localTemplate) === 1, 'flex justify-start mb-4': Number(localTemplate) === 2}">
                                    <div :class="{'order-2': Number(localTemplate) === 1, 'order-1': Number(localTemplate) === 2}" class="flex space-x-2">
                                        <button @click="prevSlide"
                                            class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 transition-transform duration-300 hover:-translate-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button @click="nextSlide"
                                            class="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 transition-transform duration-300 hover:translate-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <h3 v-if="slide.showTitle" class="text-2xl font-semibold mb-2" :style="{ color: slide.titleColor }">
                                    <span v-if="!viewMode" @input="updateSlideTitle($event, index)" @blur="saveChanges" contenteditable>{{ slide.title }}</span>
                                    <span v-else>{{ slide.title }}</span>
                                </h3>
                                <p v-if="slide.showDescription" class="mb-4" :style="{ color: slide.descriptionColor }">
                                    <span v-if="!viewMode" @input="updateSlideDescription($event, index)" @blur="saveChanges" contenteditable>{{ slide.description }}</span>
                                    <span v-else>{{ slide.description }}</span>
                                </p>
                                <div class="inline-flex">
                                    <a 
                                        v-if="slide.showButton" 
                                        :href="viewMode ? slide.buttonLink : '#'"
                                        @click.prevent="!viewMode"
                                        class="w-auto inline-flex items-center text-center py-2 px-16 rounded-xl transition-colors duration-300 whitespace-nowrap hover:brightness-125" 
                                        :style="{ 
                                            backgroundColor: slide.buttonColor, 
                                            color: slide.buttonTextColor 
                                        }"
                                        >
                                        <span 
                                            v-if="!viewMode" 
                                            @input="updateSlideButtonText($event, index)" 
                                            @blur="saveChanges" 
                                            contenteditable
                                        >
                                            {{ slide.buttonText }}
                                        </span>
                                        <span v-else>{{ slide.buttonText }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Slide indicators -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 hidden sm:flex">
                    <button v-for="(slide, index) in localSlides" :key="index" @click="goToSlide(index)"
                        class="w-3 h-3 rounded-full transition-colors duration-300"
                        :class="currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'"></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Configuration modal -->
    <div v-if="showConfigModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
        <div class="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold mb-4">Carousel Configuration</h2>

            <!-- General configuration -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Color de Fondo</label>
                <div class="flex items-center space-x-4">
                    <button @click="toggleBackgroundType" class="px-4 py-2 border rounded"
                        :class="{ 'bg-blue-500 text-white': localBackgroundType === 'color', 'bg-white text-gray-700': localBackgroundType !== 'color' }">Color</button>
                    <button @click="toggleBackgroundType" class="px-4 py-2 border rounded"
                        :class="{ 'bg-blue-500 text-white': localBackgroundType === 'image', 'bg-white text-gray-700': localBackgroundType !== 'image' }">Imagen</button>
                </div>
                <input v-if="localBackgroundType === 'color'" v-model="localBackgroundColor"
                    @input="updateBackgroundColor" type="color" class="mt-2 p-1 w-full h-10 rounded-full">
                <div v-if="localBackgroundType === 'image'" class="mt-2 flex items-center">
                    <span class="inline-block h-12 w-12 overflow-hidden bg-gray-100">
                        <img v-if="localBackgroundImage" :src="localBackgroundImage" alt="Background"
                            class="h-full w-full object-cover">
                        <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <button @click="openBackgroundImageModal"
                        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cambiar Imagen
                    </button>
                </div>
            </div>


            <!-- Configuration modal additions -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Titulo de la sección (opcional)</label>
                <input v-model="localSectionTitle" @input="saveChanges" type="text" class="p-2 w-full border rounded" placeholder="Enter section title">
                <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Section title color</label>
                <input v-model="localSectionTitleColor" @input="saveChanges" type="color" class="p-1 w-full">
            </div>

            <!-- Slide list -->
            <div v-for="(slide, index) in localSlides" :key="index" class="mb-8 p-4 border rounded">
                <h3 class="text-lg font-semibold mb-2">Slide {{ index + 1 }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                        <div class="flex items-center">
                            <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <img v-if="slide.image" :src="slide.image" alt="Slide image"
                                    class="h-full w-full object-cover">
                                <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                            <button @click="openSlideImageModal(index)"
                                class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cambiar
                            </button>
                        </div>
                        <div class="mt-2">
                            <input type="checkbox" :id="`showImage${index}`" v-model="slide.showImage"
                                @change="saveChanges" class="mr-2">
                            <label :for="`showImage${index}`" class="text-sm text-gray-700">Mostrar imagen</label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input v-model="slide.title" @input="saveChanges" type="text" class="p-2 w-full border rounded" maxlength="50">
                        <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Color de título</label>
                        <input v-model="slide.titleColor" @input="saveChanges" type="color" class="p-1 w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea v-model="slide.description" @input="saveChanges" class="p-2 w-full border rounded" rows="3" maxlength="200"></textarea>
                        <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Color de descripción</label>
                        <input v-model="slide.descriptionColor" @input="saveChanges" type="color" class="p-1 w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
                        <input v-model="slide.buttonText" @input="saveChanges" type="text" class="p-2 w-full border rounded" maxlength="20">
                        <label class="block text-sm font-medium text-gray-700 mt-2 mb-1">Color del texto del botón</label>
                        <input v-model="slide.buttonTextColor" @input="saveChanges" type="color" class="p-1 w-full">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Color del botón</label>
                            <input v-model="slide.buttonColor" @input="saveChanges" type="color" class="p-1 w-full">
                        </div>
                        <div class="mt-2">
                            <input type="checkbox" :id="`showButton${index}`" v-model="slide.showButton"
                                @change="saveChanges" class="mr-2">
                            <label :for="`showButton${index}`" class="text-sm text-gray-700">Mostrar botón</label>
                        </div>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Dirección (URL)</label>
                        <input v-model="slide.buttonLink" @input="saveChanges" type="text"
                            class="p-2 w-full border rounded" placeholder="https://...">
                    </div>
                </div>
                <button @click="removeSlide(index)"
                    class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">
                    Eliminar Slide
                </button>
            </div>

            <!-- Button to add slide -->
            <button @click="addSlide"
                class="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">
                + Agregar Slide
            </button>

            <div class="flex justify-end mt-6">
                <button @click="closeConfigModal"
                    class="mr-4 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition-colors duration-300">
                    Cancelar
                </button>
                <button @click="saveChangesAndClose"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                    Guardar
                </button>
            </div>
        </div>
    </div>
    <modalViewVideos v-if="showModalVideo" :videoId="videoId" @close="closeModalVideo" />
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue';
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
    slides: {
        type: Array,
        default: []
    },
    localSectionTitleColor: {
        type: Boolean
    }
});

const templateStore = useTemplateStore();
const currentStore = useCurrentStore();

const showConfigModal = ref(false);
const localSectionTitle = ref(props.sectionTitle);
const localBackgroundType = ref(props.backgroundType);
const localBackgroundColor = ref(props.backgroundColor);
const localBackgroundImage = ref(props.backgroundImage);
const localSlides = ref(props.slides);
const currentSlide = ref(0);
const localSectionTitleColor = ref(props.localSectionTitleColor);
const showModalVideo = ref(false);
  const videoId = ref('');

const localTemplate = computed(() => {
    let currentTemplate = props.template;
    templateStore.structure.page_template.sections.forEach((section) => {
        if (section.id === props.id) {
            currentTemplate = section.widget.element.template;
        }
    });
    return currentTemplate;
});

// Inject the function to open the image gallery modal
const openGaleryImages = inject('openGaleryImages', () => {
    console.warn('openGaleryImages function is not available');
});

// Update the watch function to include new properties
watch(() => templateStore.structure.page_template.sections, (newSections) => {
  const currentSection = newSections.find(section => section.id === props.id);
  if (currentSection && currentSection.widget.element) {
    localSectionTitle.value = currentSection.widget.element.sectionTitle || '';
    localBackgroundType.value = currentSection.widget.element.backgroundType || 'color';
    localBackgroundColor.value = String(currentSection.widget.element.backgroundColor || '#f3f4f6');
    localBackgroundImage.value = currentSection.widget.element.backgroundImage || '';
    localSectionTitleColor.value = currentSection.widget.element.sectionTitleColor || '#000000';
    localSlides.value = currentSection.widget.element.slides || [];
  }
}, { deep: true, immediate: true });

const titleClass = computed(() => {
    return {
        'text-white': localBackgroundType.value === 'image' && localWhiteTitle.value,
        'text-gray-900': !(localBackgroundType.value === 'image' && localWhiteTitle.value)
    };
});

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

function addSlide() {
    localSlides.value.push({
        image: '/img/slide-placeholder.jpg',
        title: `Slide ${localSlides.value.length + 1}`,
        description: `Description for slide ${localSlides.value.length + 1}`,
        buttonText: 'Learn More',
        buttonColor: '#3b82f6',
        buttonLink: '#',
        showImage: true,
        showTitle: true,
        showDescription: true,
        showButton: true
    });
    saveChanges();
}

function removeSlide(index) {
    localSlides.value.splice(index, 1);
    saveChanges();
}

function saveChanges() {
    templateStore.updateWidgetInSection(props.id, {
        sectionTitle: localSectionTitle.value,
        backgroundType: localBackgroundType.value,
        backgroundColor: localBackgroundColor.value,
        backgroundImage: localBackgroundImage.value,
        slides: localSlides.value,
        sectionTitleColor: localSectionTitleColor.value,
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

function updateSlideTitle(event, index) {
  localSlides.value[index].title = event.target.innerText;
  saveChanges();
}

function updateSlideDescription(event, index) {
  localSlides.value[index].description = event.target.innerText;
  saveChanges();
}

function updateSlideButtonText(event, index) {
  localSlides.value[index].buttonText = event.target.innerText;
  saveChanges();
}

function updateBackgroundColor() {
    saveChanges();
}

// Function to open the image modal for the background image
function openBackgroundImageModal() {
    currentStore.setSectionId(props.id);
    currentStore.setSectionProp("backgroundImage");
    if (openGaleryImages) {
        openGaleryImages();
    } else {
        console.error('openGaleryImages function is not available');
    }
}

// Function to open the image modal for a slide image
function openSlideImageModal(index) {
    currentStore.setSectionId(props.id);
    currentStore.setSectionProp(`slides[${index}].image`);
    if (openGaleryImages) {
        openGaleryImages();
    } else {
        console.error('openGaleryImages function is not available');
    }
}

// Watcher to update images when selected in the modal
watch(() => currentStore.selectedImage, (newImage) => {
    if (currentStore.sectionId === props.id) {
        if (currentStore.sectionProp === "backgroundImage") {
            localBackgroundImage.value = newImage;
            localBackgroundType.value = 'image';
        } else if (currentStore.sectionProp.startsWith("slides[")) {
            const match = currentStore.sectionProp.match(/slides\[(\d+)\]\.image/);
            if (match) {
                const index = parseInt(match[1]);
                localSlides.value[index].image = newImage;
            }
        }
        saveChanges();
    }
});

// Function to toggle between color and image background
function toggleBackgroundType() {
    localBackgroundType.value = localBackgroundType.value === 'color' ? 'image' : 'color';
    saveChanges();
}

// Carousel navigation functions
function nextSlide() {
    currentSlide.value = (currentSlide.value + 1) % localSlides.value.length;
}

function prevSlide() {
    currentSlide.value = (currentSlide.value - 1 + localSlides.value.length) % localSlides.value.length;
}

function goToSlide(index) {
    currentSlide.value = index;
}

const openModalVideo = () => {
    showModalVideo.value = true;
};

const closeModalVideo = () => {
showModalVideo.value = false;
}
</script>

<style scoped>
/* Add any necessary scoped styles here */
.img-slide {
    max-width: 350px;
    max-height: 600px;
}
.container-carousel {
    min-height: 350px;
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
</style>