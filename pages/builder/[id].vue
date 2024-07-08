<template>
    <div>
        <Builder @change-to-full-screen="updateLayout" />
    </div>
</template>

<script setup>
import Builder from '~/components/dashboard/builder.vue';
import { useRoute } from 'vue-router'

function updateLayout(fullscreen) {
    if(fullscreen) {setPageLayout('site'); return};
    setPageLayout('dashboard');
}

definePageMeta({
    layout: 'dashboard',
});

const route = useRoute()
const id = route.params.id
// console.log("ID PAGE", id);

// Puedes agregar cualquier lógica adicional aquí si es necesario
</script>

<style scoped>
/* Estilos específicos de la página si son necesarios */
</style>