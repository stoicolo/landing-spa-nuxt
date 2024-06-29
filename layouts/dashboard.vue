<template>
  <div>
    <MobileSidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" />
    <DesktopSidebar />

    <div class="lg:pl-72">

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useCompanyStore } from '~/stores/company';
import { useMenuStore } from '~/stores/menu';
import MobileSidebar from '~/components/dashboard/mobileSidebar.vue';
import DesktopSidebar from '~/components/dashboard/desktopSidebar.vue';

const sidebarOpen = ref(false);
const companyStore = useCompanyStore();
const menuStore = useMenuStore();

const userNavigation = [
  { name: "Perfil", href: "#" },
  { name: "Salir", href: "#" },
];

onMounted(() => {
  menuStore.loadMenu();
});

const logout = () => {
  // Implementar lógica de logout
};
</script>