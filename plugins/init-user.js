import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore(nuxtApp.$pinia)

  // Inicializar el store desde localStorage
  userStore.initializeFromStorage()

  // Opcional: Configurar un listener para guardar en localStorage cuando cambie el estado
  if (process.client) {
    userStore.$subscribe((mutation, state) => {
      localStorage.setItem('user', JSON.stringify(state))
    })
  }
})