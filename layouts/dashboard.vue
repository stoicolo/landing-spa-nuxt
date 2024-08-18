<template>
  <div>
    <!-- <MobileSidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" /> -->
    <DesktopSidebar />

    <div class="lg:pl-72">
      <slot />
    </div>

    <GalleryImagesModal ref="galleryImagesModalRef"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import MobileSidebar from '~/components/dashboard/mobileSidebar.vue';
import DesktopSidebar from '~/components/dashboard/desktopSidebar.vue';
import GalleryImagesModal from '~/components/helpers/galleryImagesModal.vue';

const sidebarOpen = ref(false);
const galleryImagesModalRef = ref<InstanceType<typeof GalleryImagesModal> | null>(null);

const userNavigation = [
  // { name: "Perfil", href: "#" },
  // { name: "Salir", href: "#" },
];

onMounted(() => {

});

const openGaleryImages = () => {
  if (galleryImagesModalRef.value) {
    galleryImagesModalRef.value.open();
  } else {
    console.error('GalleryImagesModal reference is not available');
  }
};

provide('openGaleryImages', openGaleryImages);

const logout = () => {
  // Implementar lógica de logout
};
</script>