<template>
    <header :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <h1><input class="styled-input-h1" :value="title" @input="onInput"></h1>
        <img :src="icon" alt="icon" />
    </header>
</template>

<script>
import { useTemplateStore } from '~/stores/template';

const templateStore = useTemplateStore();

export default {
    name: 'header',
    props: {
        id: {
            type: Number,
            required: 0
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
    },
    data() {
        return {
            debounceTimer: null,
            localTitle: this.title
        };
    },
    methods: {
        onInput(event) {
            this.localTitle = event.target.value;
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.updateStoreElement();
            }, 2000);
        },
        updateStoreElement() {
            templateStore.updateWidgetInSection(this.id, {
                    title: this.localTitle,
                    icon: this.icon,
                    backgroundImage: this.backgroundImage
                }
            );
        }
    }
};
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