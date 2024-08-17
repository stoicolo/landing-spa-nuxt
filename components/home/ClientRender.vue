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
         <div v-else class="loading">Cargando...</div>
       </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import Menu from '@/components/helpers/mainMenuClient.vue'
  import PageTemplateService from '@/services/page_template';
  
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
      
      // Aquí iría la llamada real a tu API
    //   website.value = {
    //     "id": 1,
    //     "websiteId": 1,
    //     "websiteDomain": "localhost:3000",
    //     "websiteSlug": "weblox-inicio",
    //     "content": {
    //         "menu": [
    //             {
    //                 "menuName": "Contactenos",
    //                 "slug": "contactenos",
    //                 "iconName": null,
    //                 "order": 0
    //             },
    //             {
    //                 "menuName": "Inicio",
    //                 "slug": "inicio",
    //                 "iconName": null,
    //                 "order": 0
    //             }
    //         ],
    //         "pages": [
    //             {
    //                 "id": 1,
    //                 "pageName": "Inicio",
    //                 "slug": "inicio",
    //                 "sections": [
    //                     {
    //                         "id": "lhluy0lwr",
    //                         "position": 0,
    //                         "widget": {
    //                             "id": "c0knmqu1r",
    //                             "name": "header-parallax",
    //                             "element": {
    //                                 "title": "Weblox",
    //                                 "description": "Es una experiencia",
    //                                 "backgroundImage": "/img/background-header-weblox.png",
    //                                 "centerImage": "/img/woman-jump.png",
    //                                 "template": "1"
    //                             }
    //                         }
    //                     },
    //                     {
    //                         "id": "sixzior1c",
    //                         "position": 1,
    //                         "widget": {
    //                             "id": "c45t3ujdv",
    //                             "name": "header-parallax",
    //                             "element": {
    //                                 "title": "Alucinante",
    //                                 "description": "El mundo es tuyo",
    //                                 "backgroundImage": "/img/background-header-weblox.png",
    //                                 "centerImage": "/img/woman-jump.png",
    //                                 "template": "1"
    //                             }
    //                         }
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 2,
    //                 "pageName": "Contactenos",
    //                 "slug": "contactenos",
    //                 "sections": [
    //                     {
    //                         "id": "dkwpkv47m",
    //                         "position": 0,
    //                         "widget": {
    //                             "id": "egan70jyt",
    //                             "name": "header",
    //                             "element": {
    //                                 "backgroundImage": "img/header1.png",
    //                                 "title": "Header",
    //                                 "icon": "https://via.placeholder.com/150",
    //                                 "template": "0"
    //                             }
    //                         }
    //                     },
    //                     {
    //                         "id": "p2psgt1bq",
    //                         "position": 1,
    //                         "widget": {
    //                             "id": "f8s5445fh",
    //                             "name": "header",
    //                             "element": {
    //                                 "backgroundImage": "img/header1.png",
    //                                 "title": "Body",
    //                                 "icon": "https://via.placeholder.com/150",
    //                                 "template": "0"
    //                             }
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     "isPublic": true,
    //     "isActive": true,
    //     "publishedAt": "2024-08-16T23:24:33.000Z",
    //     "createdAt": "2024-08-14",
    //     "updatedAt": "2024-08-16"
    // };

    } catch (error) {
      console.error('Error fetching website data:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }
  
  // Llamar a fetchWebsiteData al montar el componente
  onMounted(fetchWebsiteData)
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  const currentPageSections = computed(() => {
    debugger;
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