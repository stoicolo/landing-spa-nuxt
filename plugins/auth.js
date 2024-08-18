import PageTemplateService from '~/services/page_template'

export default defineNuxtPlugin(() => {
  if (process.client) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      PageTemplateService.setAuthToken = token
    }
  }
})