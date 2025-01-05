// plugins/tenant-config.js
import { defineNuxtPlugin } from '#app'

export const tenantConfig = {
  1: {  // websiteId: 1
    seo: {
      title: "Weblox - Crea páginas web sin saber programar",
      description: "Weblox es una aplicación que te permite crear páginas web de forma fácil, económica y rápida, sin necesidad de saber programar.",
      ogImage: "/img/weblox_logo.png",
    },
    analytics: {
      id: 'G-TQLFYKPMRK'
    }
  },
  26: {
    seo: {
      title: "Taitii Tours - Golfo Dulce Costa Rica",
      description: "We are a Costa Rican company born from the need to promote the local economy and preserve our natural heritage through eco-tourism, using funds for the maintenance and protection of nature in Golfo Dulce.",
      ogImage: "/img/tenant2_logo.png",
    },
    analytics: {
      id: 'G-XXXXXXXXX2'
    }
  }
  // Agregar más tenants según necesites
}

export default defineNuxtPlugin((nuxtApp) => {
  // Inicializar Google Analytics
  if (process.client) {
    const initializeGA = (gaId) => {
      // Remover script anterior si existe
      const existingScript = document.querySelector('script[src*="googletagmanager"]')
      if (existingScript) {
        existingScript.remove()
      }

      // Limpiar dataLayer existente
      window.dataLayer = []

      // Crear nuevo script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date())
      gtag('config', gaId)
    }

    return {
      provide: {
        initTenantConfig: (websiteId) => {
          let config = tenantConfig[websiteId]
          if (!config) {
            console.warn(`No configuration found for tenant ${websiteId}`)
            config = tenantConfig[1];
          }

          // Inicializar Google Analytics
          if (config.analytics?.id) {
            initializeGA(config.analytics.id)
          }

          return config
        }
      }
    }
  }
})