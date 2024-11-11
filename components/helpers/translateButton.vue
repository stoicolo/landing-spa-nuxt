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
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const showLanguageMenu = ref(false)
  const currentLanguage = ref('es')
  const languageMenuRef = ref(null)
  let translatorInitialized = false
  
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
  
  const initializeTranslator = () => {
    return new Promise((resolve) => {
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
      document.body.appendChild(script)
    })
  }
  
  const toggleLanguageMenu = () => {
    showLanguageMenu.value = !showLanguageMenu.value
  }
  
  const changeLanguage = async (lang) => {
    if (currentLanguage.value === lang) return
    
    try {
      if (!translatorInitialized) {
        await initializeTranslator()
        await new Promise(resolve => setTimeout(resolve, 500))
      }
  
      const combo = document.querySelector('.goog-te-combo')
      if (combo) {
        combo.value = lang
        combo.dispatchEvent(new Event('change'))
      }
  
      currentLanguage.value = lang
      localStorage.setItem('selectedLanguage', lang)
    } catch (error) {
      console.error('Error changing language:', error)
    }
    
    showLanguageMenu.value = false
  }
  
  const handleClickOutside = (event) => {
    if (languageMenuRef.value && !languageMenuRef.value.contains(event.target)) {
      showLanguageMenu.value = false
    }
  }
  
  // Reset to Spanish on route change
  watch(() => route.path, async () => {
    currentLanguage.value = 'es'
    cleanupTranslator()
    translatorInitialized = false
  })
  
  onMounted(async () => {
    if (typeof window !== 'undefined') {
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
  #goog-gt-tt {
    display: none !important;
  }
  
  .goog-tooltip, 
  .goog-tooltip:hover, 
  .goog-te-balloon-frame {
    display: none !important;
  }
  
  .goog-text-highlight {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  *[title] {
    position: static !important;
  }
  
  body * {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    text-decoration: none !important;
  }
  
  .goog-te-banner-frame {
    display: none !important;
  }
  
  .goog-te-combo {
    margin: 0 !important;
    font-size: 0 !important;
    opacity: 0;
  }
  
  body {
    top: 0 !important;
    position: static !important;
  }
  
  .skiptranslate {
    display: none !important;
  }
  
  .goog-te-menu-frame {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  </style>