<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div class="bg-white rounded-lg w-11/12 max-w-6xl h-[90vh] flex overflow-hidden">
        <!-- Sidebar con categorías -->
        <div class="w-1/4 bg-gray-100 p-4 flex flex-col overflow-y-auto">
          <h2 class="text-2xl font-bold mb-4">Galería de Plantillas</h2>
          <nav class="space-y-2">
            <button 
              v-for="category in categories" 
              :key="category.name"
              @click="activeCategory = category.name" 
              :class="{
                'bg-blue-500 text-white': activeCategory === category.name,
                'bg-gray-200 text-gray-700 hover:bg-gray-300': activeCategory !== category.name
              }"
              class="w-full py-2 px-4 rounded text-left transition-colors"
            >
              {{ category.name }}
            </button>
          </nav>
        </div>
  
        <!-- Main Content Area -->
        <div class="flex-1 p-6 overflow-y-auto">
          <div v-if="!isLoading">
            <div v-if="filteredTemplates.length === 0" class="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p class="text-gray-500 mb-4">No hay plantillas disponibles en esta categoría</p>
            </div>
    
            <div v-else class="grid grid-cols-3 gap-4 mb-4">
              <div v-for="template in filteredTemplates" :key="template.id" class="relative">
                <img 
                  :src="template.image"
                  :alt="template.name"
                  @click="selectTemplate(template)"
                  class="w-full h-40 object-cover rounded cursor-pointer" 
                  :class="{ 'ring-2 ring-blue-500': template === selectedTemplate }"
                >
                <p class="mt-2 text-center">{{ template.name }}</p>
              </div>
            </div>
          </div>
  
          <div v-if="isLoading" class="flex items-center justify-center h-[200px]">
            <Spinner />
          </div>
  
          <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        </div>
  
        <!-- Footer -->
        <div class="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-end space-x-4">
          <button @click="handleUseTemplate" :disabled="!selectedTemplate" class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors">Usar Plantilla</button>
          <button @click="close" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  
    <!-- Diálogo de confirmación -->
    <ConfirmationModal 
      v-if="showConfirmDialog"
      title="Confirmar cambio de plantilla"
      description="¿Está seguro de que desea cambiar la plantilla? Esto borrará cualquier cambio hecho en esta página y será reemplazado por la nueva plantilla."
      :cancelBtn="'cancelar'"
      :acceptBtn="'aceptar'"
      @confirm="confirmUseTemplate"
      @cancel="showConfirmDialog = false"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { useCurrentStore } from '~/stores/current'
  import PageTemplateService from '@/services/page_template';
  import Spinner from '@/components/helpers/spinner.vue'
  import ConfirmationModal from '~/components/helpers/confirmationModal.vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  })
  
  const emit = defineEmits(['close'])
  
  const templates = ref([])
  const selectedTemplate: any = ref(null)
  const categories: any = ref([])
  const activeCategory = ref('Todas')
  const isLoading = ref(true)
  const errorMessage = ref('')
  const showConfirmDialog = ref(false)
  
  const templateStore = useTemplateStore()
  const currentStore = useCurrentStore()
  
  const filteredTemplates: any = computed(() => {
    return activeCategory.value === 'All'
      ? templates.value
      : templates.value.filter((template: any) => template.categories.some((cat: any) => cat.name === activeCategory.value))
  })
  
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      loadTemplates()
    }
  })
  
  const loadTemplates = async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const response = await fetch('/mocks/templates_mock.json')
      const data = await response.json()
      templates.value = data.templates
      const uniqueCategories = new Set(data.templates.flatMap((template: any) => template.categories.map((cat: any) => cat.name)))
      categories.value = [ ...Array.from(uniqueCategories).map(name => ({ name }))]
    } catch (error) {
      console.error('Error loading templates:', error)
      errorMessage.value = 'Error al cargar las plantillas. Por favor, intente de nuevo.'
    } finally {
      isLoading.value = false
    }
  }
  
  const selectTemplate = (template: any) => {
    selectedTemplate.value = template === selectedTemplate.value ? null : template
  }
  
  const handleUseTemplate = () => {
    if (selectedTemplate.value) {
      showConfirmDialog.value = true
    }
  }
  
  const confirmUseTemplate = async () => {
    showConfirmDialog.value = false
    try {
      await PageTemplateService.updatePageTemplate(currentStore.pageTemplateId, selectedTemplate.value.sections)
      emit('close')
    } catch (error) {
      console.error('Error updating template:', error)
      errorMessage.value = 'Error al actualizar la plantilla. Por favor, intente de nuevo.'
    }
  }
  
  const close = () => {
    emit('close')
  }
  
  onMounted(() => {
    if (props.isOpen) {
      loadTemplates()
    }
  })
  </script>