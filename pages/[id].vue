<!-- pages/[id].vue -->
<template>
    <div>
        <ClientRender />
    </div>
</template>

<script setup>
import ClientRender from '~/components/home/ClientRender.vue';
import { useRoute } from 'vue-router';
import { useMenuStore } from '~/stores/menu';
import { useCurrentStore } from '~/stores/current';

definePageMeta({
    layout: 'site',
});

const route = useRoute();
const menuStore = useMenuStore();
const currentStore = useCurrentStore();

// Función para obtener el pageId a partir del slug
async function getPageIdBySlug(slug) {
    //TODO: necesitamos llamar otro metodo que no necesite token, porque son paginas publicas
    const menu = await menuStore.getMenuBySlug(slug);
    if (menu) {
        return menu.pageId;
    }
    return null;
}

// Obtiene el pageId a partir del slug o del parámetro de ruta
let pageId = 0;
let slug = route.params.id;
let userId = 1; //TODO: debe obtenerse segun el dominio
let websiteId = 1; //TODO: debe obtenerse segun el dominio
let headerMenuId = 1; //TODO: debe obtenerse segun el dominio
debugger;
if (slug) {

    currentStore.setUserId(userId);
    currentStore.setWebsiteId(websiteId);
    currentStore.setMenuHeaderId(headerMenuId);
    pageId = await getPageIdBySlug(slug, );

    if (pageId) {
        // Actualiza el currentStore con el nuevo pageId
        currentStore.setPageId(pageId);
    } else {
        // Redirige a una página de error 404 o a la página de inicio
        navigateTo('/');
    }
} else {
    // Actualiza el currentStore con el pageId obtenido de la ruta
    currentStore.setPageId(pageId);
}

// Puedes agregar cualquier lógica adicional aquí si es necesario
</script>

<style scoped>
/* Estilos específicos de la página si son necesarios */
</style>