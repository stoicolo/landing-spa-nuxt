<template>
    <div>
        <Admin />
    </div>
</template>

<script setup>
import Admin from '~/components/dashboard/adminHandling.vue';

definePageMeta({
    layout: 'dashboard',
    middleware: ['admin']
});

// Puedes agregar cualquier lógica adicional aquí si es necesario
</script>

<style scoped>
/* Estilos específicos de la página si son necesarios */
</style>