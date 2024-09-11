<template>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-fountain-blue-950 px-6 pb-4">
        <div class="flex h-28 shrink-0 items-center">
          <img class="h-20 w-auto" src="/img/logo-weblox.png" alt="Footprint initiative logo" />
          <span class="text-white ml-2 text-[30px]">WEBLOX</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in sortedNavigation" :key="item.menuName">
                  <template v-if="item.menuName !== 'Menu'">
                    <span 
                      v-if="item.href"
                      @click="navigateTo(item.href)"
                      :class="[
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 cursor-pointer',
                      ]"
                    >
                      <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                      {{ item.menuName }}
                    </span>
                    <span 
                    v-else
                    @click="executeInjectedMethod(item.method)"
                    class="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 cursor-pointer"
                    >
                      <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                      {{ item.menuName }}
                    </span>
                  </template>
                  <template v-else>
                    <div class="flex items-center justify-between">
                      <button @click="toggleMenu" class="w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
                        <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {{ item.menuName }}
                        <ChevronDownIcon
                          :class="[isMenuOpen ? 'rotate-180' : '', 'ml-auto h-5 w-5 shrink-0 transition-transform duration-200']"
                          aria-hidden="true"
                        />
                      </button>
                      <button @click="openAddMenuItemModal" class="text-gray-400 hover:text-white p-2">
                        <PlusIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <ul v-if="isMenuOpen" class="mt-1 space-y-1">
                        <li v-for="menuItem in sortedMenu" :key="menuItem.menuName">
                          <div class="flex items-center justify-between">

                            <span
                                  @click="navigateTo(menuItem.href)"
                                  :class="[
                                    menuItem.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 cursor-pointer',
                                  ]"
                                  :target="menuItem.target"
                                >
                                  {{ menuItem.menuName }}
                              </span>
                          </div>
                          <ul v-if="menuItem.subitems" class="mt-1 space-y-1">
                            <li v-for="subItem in menuItem.subitems" :key="subItem.menuName">
                                <span
                                  @click="navigateTo(item.href)"
                                  :class="[
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 cursor-pointer',
                                  ]"
                                  :target="subItem.target"
                                >
                                  {{ item.menuName }}
                              </span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </transition>
                  </template>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <AddMenuItemModal v-if="isAddMenuItemModalOpen" @close="closeAddMenuItemModal" :parentItem="selectedParentItem" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import { useMenuStore } from '~/stores/menu';
  import {
    HomeIcon,
    FolderIcon,
    CursorArrowRippleIcon,
    DocumentDuplicateIcon,
    Bars3Icon,
    ChevronDownIcon,
    SquaresPlusIcon,
    PlusIcon,
    PencilSquareIcon,
    UsersIcon,
    PhotoIcon
  } from "@heroicons/vue/24/outline";
  import AddMenuItemModal from '~/components/helpers/addMenuItemModal.vue';
  
  const menuStore = useMenuStore();
  
  const sortedNavigation = computed(() => menuStore.sortedNavigation);
  const sortedMenu = computed(() => menuStore.sortedMenu);
  
  const iconMap = {
    HomeIcon,
    FolderIcon,
    CursorArrowRippleIcon,
    Bars3Icon,
    SquaresPlusIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    UsersIcon,
    PhotoIcon
  };

//IMPORTANTE: todos los metodos se proveen en layouts/dashboard.vue
// Objeto para almacenar los métodos inyectados
const injectedMethods: { [key: string]: Function } = {};

// Inyectar los métodos durante la configuración
sortedNavigation.value.forEach(item => {
  if (item.method) {
    const method = inject(item.method, () => {
      console.warn(`Method ${item.method} not provided`);
    });
    if (typeof method === 'function') {
      injectedMethods[item.method] = method;
    }
  }
});

const executeInjectedMethod = (methodName: string | undefined) => {
  if (methodName && injectedMethods[methodName]) {
    injectedMethods[methodName]();
  } else {
    console.warn(`Method ${methodName} not found or not a function`);
  }
};
  
  const getIcon = (iconName: string | undefined) => {
    return iconMap[iconName as keyof typeof iconMap];
  };
  
  const isMenuOpen = ref(false);
  const isAddMenuItemModalOpen = ref(false);
  const selectedParentItem = ref(null);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const openAddMenuItemModal = () => {
    selectedParentItem.value = null;
    isAddMenuItemModalOpen.value = true;
  };
  
  const openAddSubItemModal = (parentItem: any) => {
    selectedParentItem.value = parentItem;
    isAddMenuItemModalOpen.value = true;
  };
  
  const closeAddMenuItemModal = () => {
    isAddMenuItemModalOpen.value = false;
  };
  
  </script>