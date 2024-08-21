<template>
   <div>MENUS</div> 
</template>
<script setup>
import { useMenuStore } from '~/stores/menu';
import { useRoute } from 'vue-router';

const menuStore = useMenuStore();
const route = useRoute();

onMounted(async () => {
    changeActiveItemMenu();
});

function changeActiveItemMenu() {
    menuStore.setActiveMenu(route.path);
}

</script>
<style>
/* Si deseas añadir estilos adicionales */
</style>