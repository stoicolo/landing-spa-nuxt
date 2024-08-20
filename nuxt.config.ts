// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      concurrency: 1, // Reduce la concurrencia para evitar problemas con muchas rutas a la vez
      failOnError: false, // No falla en caso de errores de prerenderizado
    }
  },
  telemetry: false,
  devtools: { enabled: true },
  ssr: true, // o false, dependiendo de tus necesidades

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
        },
      ],
    },
  },

  router: {
    options: {
      strict: false
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NODE_ENV === 'production'
        ? process.env.RENDER_API_SERVER
        : process.env.VITE_API_SERVER,
    },
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    }],
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
  ],

  plugins: [
    '~/plugins/toaster.js',
    '~/plugins/init-page-template-service'
  ],

  i18n: {
    defaultLocale: "en",
  },

  components: true,
  compatibilityDate: "2024-08-12",
  css: [
    '@/assets/css/global-theme.css'
  ]
});