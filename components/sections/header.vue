<template>
    <div v-if="viewMode">
        <!--Template 1-->
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')', backgroundSize:'100%' }" v-if="Number(localTemplate) === 0">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput" disabled="disabled"></h1>
            <img :src="icon" alt="icon" />
        </header>
        <!--Template 2-->
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')', backgroundSize:'100%' }" v-if="Number(localTemplate) === 1">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput" disabled="disabled"> - Plantilla 2</h1>
            <img :src="icon" alt="icon" />
        </header>
    </div>
    <div v-else>
        <!--Template 1-->
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')', backgroundSize:'100%' }" v-if="Number(localTemplate) === 0">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput"></h1>
            <img :src="icon" alt="icon" />
        </header>
        <!--Template 2-->
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')', backgroundSize:'100%' }" v-if="Number(localTemplate) === 1">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput"></h1>
            <p>- Plantilla 2</p>
            <img :src="icon" alt="icon" />
        </header>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTemplateStore } from '~/stores/template';

const props = defineProps({
    id: {
        type: Number,
        required: false
    },
    viewMode: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Header Title'
    },
    icon: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    backgroundImage: {
        type: String,
        default: 'https://via.placeholder.com/1200x300'
    },
    template: {
        type: Number,
        default: 0
    }
});

const templateStore = useTemplateStore();
const localTitle = ref(props.title);

const localTemplate = computed(() => {
    var currentTemplate = "0";
    templateStore.structure.page_template.sections.forEach((section, index) => {
        if (section.id === props.id) {
            currentTemplate = section.widget.element.template;
        }
    });
    return currentTemplate;
});

function onInput(event) {
    localTitle.value = event.target.value;
    updateTitle();
}

function updateTitle() {
    templateStore.updateWidgetInSection(props.id, {
        title: localTitle.value
    });
}
</script>

<style scoped>
/* Añade tus estilos aquí si es necesario */
header {
    min-height: 300px;
    /* Altura mínima para visualización */
}

.styled-input-h1 {
    font-size: 2em;
    font-weight: bold;
    border: none;
    outline: none;
    background: none;
    width: 100%;
    color: inherit;
}

.styled-input-h1:focus {
    --tw-ring-color: hsla(240,7%,62%,0);
}
</style>
