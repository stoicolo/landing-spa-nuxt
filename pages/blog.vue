<template>
    <div>
        <Blog />
    </div>
</template>

<script setup>
import Blog from '~/components/dashboard/blogHandling.vue';

definePageMeta({
    layout: 'dashboard',
});

// Puedes agregar cualquier lógica adicional aquí si es necesario
</script>

<style scoped>
/* Estilos específicos de la página si son necesarios */
</style>