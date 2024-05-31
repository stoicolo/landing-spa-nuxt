<template>
    <div v-if="viewMode">
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput" disabled="disabled"></h1>
            <img :src="icon" alt="icon" />
        </header>
    </div>
    <div v-else>
        <header :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
            <h1><input class="styled-input-h1" :value="localTitle" @input="onInput"></h1>
            <img :src="icon" alt="icon" />
        </header>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTemplateStore } from '~/stores/template';

const props = defineProps({
    id: {
        type: Number,
        required: false // Cambiado de 0 a false
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
    }
});

const localTitle = ref(props.title);

function onInput(event) {
    localTitle.value = event.target.value;
    updateStoreElement();
}

const templateStore = useTemplateStore();

function updateStoreElement() {
    templateStore.updateWidgetInSection(props.id, {
        title: localTitle.value,
        icon: props.icon,
        backgroundImage: props.backgroundImage
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
