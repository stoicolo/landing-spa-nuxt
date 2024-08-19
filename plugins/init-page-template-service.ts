import PageTemplateService from '~/services/page_template';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  PageTemplateService.setBaseURL(config.public.apiBaseUrl);
  
  if (process.client) {
    PageTemplateService.initAuthToken();
  }
});