<template>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-fountain-blue-950 px-6 pb-4">
        <div class="flex h-28 shrink-0 items-center">
          <img class="h-20 w-auto" src="/img/footprint_initiative_white.png" alt="Footprint initiative logo" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in sortedNavigation" :key="item.name">
                  <template v-if="item.name !== 'Menu'">
                    <a :href="item.href" :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    ]">
                      <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </template>
                  <template v-else>
                    <div class="flex items-center justify-between">
                      <button @click="toggleMenu" class="w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
                        <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                        {{ item.name }}
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
                        <li v-for="menuItem in sortedMenu" :key="menuItem.name">
                          <div class="flex items-center justify-between">
                            <a :href="menuItem.href" :target="menuItem.target" :class="[
                              menuItem.current
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 pl-11 w-full',
                            ]">
                              {{ menuItem.name }}
                            </a>
                            
                          </div>
                          <ul v-if="menuItem.subitems" class="mt-1 space-y-1">
                            <li v-for="subItem in menuItem.subitems" :key="subItem.name">
                              <a :href="subItem.href" :target="subItem.target" :class="[
                                subItem.current
                                  ? 'bg-gray-600 text-white'
                                  : 'text-gray-300 hover:bg-gray-600 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 pl-16',
                              ]">
                                {{ subItem.name }}
                              </a>
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
  import { ref, computed } from 'vue';
  import { useMenuStore } from '~/stores/menu';
  import {
    HomeIcon,
    FolderIcon,
    CursorArrowRippleIcon,
    Bars3Icon,
    ChevronDownIcon,
    SquaresPlusIcon,
    PlusIcon
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
    SquaresPlusIcon
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