// middleware/auth.global.ts
import PageTemplateService from '~/services/page_template'

export default defineNuxtRouteMiddleware((to, from) => {
  debugger;
  if (process.client) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      PageTemplateService.setAuthToken = token
    }
  }
})