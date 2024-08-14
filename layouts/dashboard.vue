<template>
  <div>
    <MobileSidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" />
    <DesktopSidebar />

    <div class="lg:pl-72">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MobileSidebar from '~/components/dashboard/mobileSidebar.vue';
import DesktopSidebar from '~/components/dashboard/desktopSidebar.vue';

const sidebarOpen = ref(false);

const userNavigation = [
  // { name: "Perfil", href: "#" },
  // { name: "Salir", href: "#" },
];

onMounted(() => {

});

const logout = () => {
  // Implementar lógica de logout
};
</script>