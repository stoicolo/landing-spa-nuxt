<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Configuración</h2>
      
      <div>
        <!-- Logo Upload Section -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2" for="logo-upload">
            Subir Logo
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg v-if="!logoPreview" class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div v-if="logoPreview" class="mt-4 h-24 logo">
                <img :src="logoPreview" alt="Logo Preview" class="max-h-32 mx-auto">
              </div>
              <div class="flex text-sm text-gray-600">
                  <button @click="handleLogoUpload(index)" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Agregar imagen del dispositivo
                  </button>
              </div>
              <p class="text-xs text-gray-500">
                PNG, JPG, menos de 5MB
              </p>
            </div>
          </div>
        </div>
    
        <!-- Font Selection Section -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-2" for="font-select">
            Seleccione el tipo de fuente principal
          </label>
          <select
            id="font-select"
            v-model="selectedFont"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Elija una fuente</option>
            <option value="Work Sans">Work Sans</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
    
        <!-- Preview Section -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-700 mb-2">Vista Previa</h3>
          <div
            class="p-4 border rounded-md"
            :style="{ fontFamily: selectedFont || 'sans-serif' }"
          >
            <p class="text-lg">
              Así se ve tu fuente.
            </p>
            <p class="text-sm mt-2">
              Este es un texto de prueba para mostrar cómo se vería tu fuente seleccionada.
            </p>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center bg-white">
        <Spinner />
      </div>
  
      <!-- Save Button -->
      <button
        @click="saveConfiguration"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Guardar Configuración
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, inject, watch } from 'vue';
  import PageTemplateService from '~/services/page_template';
  import { useCurrentStore } from '~/stores/current';
  import Spinner from '@/components/helpers/spinner.vue';
  
  const logoPreview = ref(null)
  const selectedFont = ref('')
  const currentStore = useCurrentStore();
  const config = ref({});
  const isLoading = ref(false);

  onMounted(async () => {
    config.value = await PageTemplateService.getWebSite(currentStore.websiteId); 

    if(Object.keys(config.value.websiteGlobalConfig).length > 0){
      if(config.value.websiteGlobalConfig.logo){
        logoPreview.value = config.value.websiteGlobalConfig.logo;
      } else {
        logoPreview.value = currentStore.lastACurrentImg;
      }
      selectedFont.value = config.value.websiteGlobalConfig.fontFamily;
    }
  });

  const openGaleryImages = inject('openGaleryImages', () => {
    console.warn('openGaleryImages function is not available');
  });

  watch(() => currentStore.lastACurrentImg, (newLogoUrl) => {
    logoPreview.value = newLogoUrl;
  });

  const handleLogoUpload = (event) => {
    currentStore.setSectionId("config");
    if (openGaleryImages) {
      openGaleryImages();
    } else {
      console.error('openGaleryImages function is not available');
    }
  }
  
  const saveConfiguration = async () => {
    isLoading.value = true;
    await PageTemplateService.updateWebSite(config.value.websiteName, {"fontFamily": selectedFont.value, "logo": logoPreview.value}, currentStore.websiteId);
    const domain = currentStore.domain;
    const publishHistoryId = currentStore.publishHistoryId;
    const isActive = true;
    const publishedAt = JSON.stringify(Date());
    await PageTemplateService.changeActiveSite(
                publishHistoryId,
                domain,
                isActive,
                true,
                publishedAt
            );
    console.log('Configuration saved');
    isLoading.value = false;
  }
  </script>
  <style>
    .logo img{
      max-height: 75px;
    }
  </style>