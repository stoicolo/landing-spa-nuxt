<template>
    <div>
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="closeSidebar">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>
  
          <div class="fixed inset-0 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                  enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="closeSidebar">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <!-- Sidebar component -->
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div class="flex h-16 shrink-0 items-center">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company" />
                  </div>
                  <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" class="-mx-2 space-y-1">
                          <li v-for="item in menuStore.navigation" :key="item.menuName">
                            <template v-if="item.menuName !== 'Menu'">
                              <a @click="navigateTo(item.href)" :class="[
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              ]">
                                <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                {{ item.menuName }}
                              </a>
                            </template>
                            <template v-else>
                              <div class="flex items-center justify-between">
                                <button @click="toggleMenu"
                                  class="text-left text-gray-400 hover:bg-gray-800 hover:text-white group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
                                  <component :is="getIcon(item.iconName)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {{ item.menuName }}
                                  <ChevronDownIcon
                                    :class="[isMenuOpen ? 'rotate-180' : '', 'ml-auto h-5 w-5 shrink-0 transition-transform duration-200']"
                                    aria-hidden="true" />
                                </button>
                                <button @click.stop="openAddMenuItemModal()"
                                  class="p-2 text-gray-400 hover:text-white">
                                  <PlusIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                              <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <ul v-if="isMenuOpen" class="mt-1 space-y-1">
                                  <li v-for="menuItem in menuStore.menu" :key="menuItem.menuName">
                                    <div class="flex items-center justify-between">
                                      <a @click="navigateTo(menuItem.href)" :target="menuItem.target" :class="[
                                        menuItem.current
                                          ? 'bg-gray-700 text-white'
                                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 pl-11',
                                      ]">
                                        {{ menuItem.menuName }}
                                      </a>
                                      <button @click.stop="openAddMenuItemModal(menuItem)"
                                        class="p-2 text-gray-400 hover:text-white">
                                        <PlusIcon class="h-4 w-4" aria-hidden="true" />
                                      </button>
                                    </div>
                                    <ul v-if="menuItem.subitems" class="mt-1 space-y-1">
                                      <li v-for="subItem in menuItem.subitems" :key="subItem.menuName">
                                        <a :href="subItem.href" :target="subItem.target" :class="[
                                          subItem.current
                                            ? 'bg-gray-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-600 hover:text-white',
                                          'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 pl-16',
                                        ]">
                                          {{ subItem.menuName }}
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
                      <li class="mt-auto">
                        <a href="#"
                          class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                          <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                          Configuración
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="openSidebar">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
  
        <!-- Separator -->
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
  
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex-1"></div>
          <form v-show="false" class="relative flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true" />
            <input id="search-field"
              class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..." type="search" name="search" />
          </form>
          <div class="flex items-center gap-x-4 justify-self-end lg:gap-x-6">
            <button v-show="false" type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
  
            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
  
            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
  
                <HomeIcon class="h-6 w-6" aria-hidden="true" />
  
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                    companyStore.name }}</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <button @click.prevent="logout" :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]">
                      {{ item.name }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
  
      <slot />
  
      <AddMenuItemModal v-if="isAddMenuItemModalOpen" :parentItem="selectedParentItem" @close="closeAddMenuItemModal" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    CursorArrowRippleIcon,
    DocumentDuplicateIcon,
    FolderArrowDownIcon,
    FolderIcon,
    HomeIcon,
    SquaresPlusIcon,
    XMarkIcon,
    PlusIcon,
  } from "@heroicons/vue/24/outline";
  import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
  import { useMenuStore } from '~/stores/menu';
  import { useCompanyStore } from '~/stores/company';
  import AddMenuItemModal from '~/components/helpers/addMenuItemModal.vue';
  
  //TODO: Crear un modelo separado
  interface MenuItem {
    menuName: string;
    href?: string;
    iconName?: string;
    target?: string;
    order: number;
    current?: boolean;
    slug?: string;
    subitems?: MenuItem[];
  }
  
  const sidebarOpen = ref(false);
  const companyStore = useCompanyStore();
  const menuStore = useMenuStore();
  
  const userNavigation = [
    // { name: "Perfil", href: "#" },
    // { name: "Salir", href: "#" },
  ];
  
  const iconMap = {
    HomeIcon,
    FolderIcon,
    CursorArrowRippleIcon,
    FolderArrowDownIcon,
    SquaresPlusIcon,
    Cog6ToothIcon,
    Bars3Icon,
    DocumentDuplicateIcon
  };
  
  const getIcon = (iconName: string | undefined) => {
    return iconMap[iconName as keyof typeof iconMap];
  };
  
  const isMenuOpen = ref(false);
  const isAddMenuItemModalOpen = ref(false);
  const selectedParentItem = ref<MenuItem | null>(null);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const openSidebar = () => {
    sidebarOpen.value = true;
  };
  
  const closeSidebar = () => {
    sidebarOpen.value = false;
  };
  
  const openAddMenuItemModal = (parentItem: MenuItem | null = null) => {
    selectedParentItem.value = parentItem;
    isAddMenuItemModalOpen.value = true;
  };
  
  const closeAddMenuItemModal = () => {
    isAddMenuItemModalOpen.value = false;
    selectedParentItem.value = null;
  };
  
  const logout = () => {
    // Implementar lógica de logout
  };
  </script>