<template>
    <div>
      <!-- Menú responsive -->
      <Menu :menuItems="website?.content?.menu" :logoSrc="'img/weblox-logo-name.png'" />
  
      <!-- Contenido de la página -->
       <div>
         <template v-if="website" v-for="(section, index) in currentPageSections" :key="section.id" v-memo="[section.position, viewMode]">
           <div class="weblox-wrapper">
             <component 
               v-if="section.widget && section.widget.element"
               :is="getComponent(section.widget.name, section.widget.element)" 
               v-bind="section.widget.element" 
               :viewMode="viewMode" 
               :id="Number(section.id)" 
             />
           </div>
         </template>
         <!-- Mensaje de carga -->
         <Spinner v-else />
       </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import Menu from '@/components/helpers/mainMenuClient.vue'
  import PageTemplateService from '@/services/page_template'
  import Spinner from '@/components/helpers/spinner.vue'
  
  const website = ref(null)
  const viewMode = ref('preview')
  const isMenuOpen = ref(false)
  
  const route = useRoute()
  
  // Función para obtener los datos del sitio web
  const fetchWebsiteData = async () => {
    console.log(window.location.host);
    debugger;
    try {
      website.value = await PageTemplateService.fetchClientSiteByDomain(window.location.host);

    } catch (error) {
      console.error('Error fetching website data:', error)
    }
  }
  
  // Llamar a fetchWebsiteData al montar el componente
  onMounted(fetchWebsiteData)
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  const currentPageSections = computed(() => {
    if (!website.value) return []
    const currentSlug = route.params.id || 'inicio'
    const currentPage = website.value.content?.pages?.find(page => page.slug === currentSlug)
    return currentPage?.sections || []
  })
  
  function getComponent(widgetName, element) {
    return defineAsyncComponent(() =>
      import(`@/components/sections/${widgetName}.vue`)
        .catch(error => {
          console.error('Failed to load component:', error)
          // Asumiendo que tienes un plugin de notificaciones instalado
          $toaster.show({
            title: "Error",
            description: "Falló al cargar el componente, refresque el navegador.",
            delay: 3,
            position: "top-right",
            type: "error"
          })
        })
    )
  }
  </script>