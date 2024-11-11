<template>
    <div class="fixed bottom-4 right-4 z-50">
      <div class="relative" ref="languageMenuRef">
        <button 
          @click="toggleLanguageMenu" 
          class="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border-2 border-gray-100 overflow-hidden"
        >
          <img 
            :src="languages[currentLanguage].flag" 
            :alt="languages[currentLanguage].name"
            class="w-full h-full object-cover"
          />
        </button>
  
        <div 
          v-if="showLanguageMenu" 
          class="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl py-2 min-w-[200px]"
        >
          <div 
            v-for="(lang, code) in languages" 
            :key="code"
            @click="changeLanguage(code)"
            class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
          >
            <img 
              :src="lang.flag" 
              :alt="lang.name"
              class="w-6 h-6 rounded-full mr-3"
            />
            <span>{{ lang.name }}</span>
          </div>
        </div>
      </div>
  
      <div id="google_translate_element2" class="hidden"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const showLanguageMenu = ref(false)
  const currentLanguage = ref('es')
  const languageMenuRef = ref(null)
  let translatorInitialized = false
  let initializationAttempts = 0
  const MAX_INITIALIZATION_ATTEMPTS = 3
  
  const languages = {
    'es': { 
      name: 'Español', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/es.svg'
    },
    'en': { 
      name: 'English', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/gb.svg'
    },
    'fr': { 
      name: 'Français', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/fr.svg'
    },
    'de': { 
      name: 'Deutsch', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/de.svg'
    },
    'it': { 
      name: 'Italiano', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/it.svg'
    },
    'pt': { 
      name: 'Português', 
      flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/pt.svg'
    }
  }
  
  const cleanupTranslator = () => {
    const scripts = document.querySelectorAll('script[src*="translate.google"]')
    scripts.forEach(script => script.remove())
    
    const elements = document.querySelectorAll('.goog-te-combo, .goog-te-banner-frame, .goog-te-menu-frame, .goog-te-menu-value')
    elements.forEach(el => el.remove())
    
    const container = document.getElementById('google_translate_element2')
    if (container) container.innerHTML = ''
    
    delete window.googleTranslateElementInit2
    delete window.google
    translatorInitialized = false
  }
  
  const waitForTranslator = () => {
    return new Promise((resolve, reject) => {
      let attempts = 0
      const maxAttempts = 50 // 5 segundos máximo (100ms x 50)
      
      const checkCombo = setInterval(() => {
        const combo = document.querySelector('.goog-te-combo')
        attempts++
        
        if (combo) {
          clearInterval(checkCombo)
          resolve(combo)
        }
        
        if (attempts >= maxAttempts) {
          clearInterval(checkCombo)
          reject('Timeout esperando al traductor')
        }
      }, 100)
    })
  }
  
  const initializeTranslator = () => {
    return new Promise((resolve, reject) => {
      if (initializationAttempts >= MAX_INITIALIZATION_ATTEMPTS) {
        reject(new Error('Se alcanzó el número máximo de intentos de inicialización'))
        return
      }
  
      initializationAttempts++
      cleanupTranslator()
  
      window.googleTranslateElementInit2 = function() {
        new google.translate.TranslateElement({
          pageLanguage: 'es',
          autoDisplay: false,
          includedLanguages: 'es,en,fr,de,it,pt',
        }, 'google_translate_element2')
        translatorInitialized = true
        resolve()
      }
  
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2'
      script.async = true
      script.onerror = () => {
        cleanupTranslator()
        reject(new Error('Error al cargar el script del traductor'))
      }
      document.body.appendChild(script)
    })
  }
  
  const checkTranslatorHealth = () => {
    const combo = document.querySelector('.goog-te-combo')
    return combo && typeof window.google !== 'undefined'
  }
  
  const toggleLanguageMenu = () => {
    showLanguageMenu.value = !showLanguageMenu.value
  }
  
  const setCookie = (name, value, days) => {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/'
  }
  
  const getCookie = (name) => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for(let i=0;i < ca.length;i++) {
      let c = ca[i]
      while (c.charAt(0)==' ') c = c.substring(1,c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
    }
    return null
  }
  
  const changeLanguage = async (lang) => {
    if (currentLanguage.value === lang) return
    
    try {
      // Establecer la cookie de Google Translate
      setCookie('googtrans', `/auto/${lang}`, 1)
      setCookie('googtrans', `/auto/${lang}`, 1, 'translate.google.com')
  
      currentLanguage.value = lang
      localStorage.setItem('selectedLanguage', lang)
  
      // Recargar la página para que se aplique la traducción
      location.reload()
    } catch (error) {
      console.error('Error cambiando el idioma:', error)
    }
  }
  
  watch(() => route.path, async () => {
    if (typeof window !== 'undefined') {
      await nextTick()
      const savedLanguage = localStorage.getItem('selectedLanguage')
      if (savedLanguage && savedLanguage !== 'es') {
        setCookie('googtrans', `/auto/${savedLanguage}`, 1)
        setCookie('googtrans', `/auto/${savedLanguage}`, 1, 'translate.google.com')
      } else if (savedLanguage === 'es') {
        setCookie('googtrans', '', -1)
        setCookie('googtrans', '', -1, 'translate.google.com')
      }
      location.reload()
    }
  })
  
  const handleClickOutside = (event) => {
    if (languageMenuRef.value && !languageMenuRef.value.contains(event.target)) {
      showLanguageMenu.value = false
    }
  }
  
  onMounted(async () => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('selectedLanguage')
      if (savedLanguage) {
        currentLanguage.value = savedLanguage
      }
  
      try {
        await initializeTranslator()
      } catch (error) {
        console.error('Error al inicializar el traductor:', error)
      }
  
      document.addEventListener('click', handleClickOutside)
    }
  })
  
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', handleClickOutside)
    }
  })
  </script>
  
  <style>
  /* Ocultar el tooltip específico de Google Translate */
  #goog-gt-tt {
    display: none !important;
  }
  
  /* Ocultar otros tooltips y elementos relacionados */
  .goog-tooltip, 
  .goog-tooltip:hover, 
  .goog-te-balloon-frame {
    display: none !important;
  }
  
  /* Evitar resaltados y estilos no deseados */
  .goog-text-highlight {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  /* Evitar que se muestren los atributos title en los elementos */
  *[title] {
    position: static !important;
  }
  
  /* Evitar que el texto sea resaltado o subrayado */
  body * {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    text-decoration: none !important;
  }
  
  /* Ajustar estilos para no ocultar elementos esenciales de Google Translate */
  .goog-te-banner-frame {
    display: none !important;
  }
  
  /* Ajustar el estilo del selector de idioma */
  .goog-te-combo {
    margin: 0 !important;
    font-size: 0 !important;
    opacity: 0;
  }
  
  /* Evitar que el cuerpo de la página se desplace */
  body {
    top: 0 !important;
    position: static !important;
  }
  </style>
  