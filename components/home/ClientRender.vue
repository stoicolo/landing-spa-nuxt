<template>
  <div>
    <!-- Menú responsive -->
    <Menu :menuItems="website?.content?.menu" :logoSrc="logoSrc || 'img/weblox-logo-name.png'" />

    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>

    <!-- Contenido de la página -->
    <div v-else-if="website?.isActive">
      <template v-for="(section, index) in currentPageSections" :key="section.id" v-memo="[section.position, viewMode]">
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
    </div>

    <!-- Página de mantenimiento -->
    <div v-else class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="w-full max-w-4xl">
        <div class="bg-white rounded-lg p-6 md:p-10 shadow-2xl dashed-border">
          <div class="flex flex-col md:flex-row items-center">
            <div class="w-full md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                class="w-full max-w-[200px] mx-auto h-auto float" id="colorChangingIcon">
                <path fill="currentColor"
                  d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
            </div>
            <div class="w-full md:w-2/3 text-center md:text-left">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 gradient-text">Sitio en Mantenimiento</h2>
              <p class="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Estamos dedicados a mejorar continuamente la experiencia de usuario. Nuestro equipo está creando la
                magia detrás de escena.
              </p>
              <p class="text-base md:text-lg font-semibold text-blue-600 mb-4">
                Estaremos de vuelta en: menos de 8h
              </p>
              <p class="text-sm md:text-base text-gray-600 italic">
                Así que tomate un café y disfruta la tarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Menu from '@/components/helpers/mainMenuClient.vue'
import PageTemplateService from '@/services/page_template'
import Spinner from '@/components/helpers/spinner.vue'

const website = ref(null)
const viewMode = ref('preview')
const isLoading = ref(true)
const config = ref({})
const fontFamily = ref('');
const logoSrc = ref('');

const route = useRoute()

const fetchWebsiteData = async () => {
  isLoading.value = true
  try {
    const encriptedDomain = await PageTemplateService.fetchClientSiteByDomain(window.location.host);
    const decoded = decodeJWT(encriptedDomain);
    console.log("decoded", decoded);
    website.value = decoded.data[0];
  } catch (error) {
    console.error('Error fetching website data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => { 
  await fetchWebsiteData();
  
  config.value = website.value.websiteGlobalConfig;
  fontFamily.value = config.value.fontFamily;
  logoSrc.value = config.value.logo;
  setInterval(changeIconColor, 8000)
})

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

watch(fontFamily, (newFont) => {
  document.documentElement.style.setProperty('--dynamic-font-family', newFont);
})

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

let colorIndex = 0
const colors = [
  "hsl(46, 50%, 50%)",  // Oro
  "hsl(0, 0%, 75%)",    // Plata
  "hsl(0, 0%, 50%)"     // Gris
]

function getNextColor() {
  const color = colors[colorIndex]
  colorIndex = (colorIndex + 1) % colors.length
  return color
}

function changeIconColor() {
  const icon = document.getElementById('colorChangingIcon')
  if (icon) {
    const newColor = getNextColor()
    icon.style.transition = 'color 8s ease'
    icon.style.color = newColor
  }
}
</script>

<style>
body {
  font-family: var(--dynamic-font-family), sans-serif;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text {
  background: linear-gradient(90deg, #999595, #9d8758, #d6c362, #b7a21d);
  background-size: 300% 300%;
  animation: gradientAnimation 10s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashed-border {
  background-image: 
    linear-gradient(90deg, #969494 50%, transparent 50%),
    linear-gradient(90deg, #969494 50%, transparent 50%),
    linear-gradient(0deg, #969494 50%, transparent 50%),
    linear-gradient(0deg, #969494 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: 0px 0px, 200px 100%, 0px 200px, 100% 0px;
  animation: border-dance 28s infinite linear;
}

@keyframes border-dance {
  0% { background-position: 0px 0px, 200px 100%, 0px 200px, 100% 0px; }
  100% { background-position: 200px 0px, 0px 100%, 0px 0px, 100% 200px; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.float {
  animation: float 3s ease-in-out infinite;
}

</style>