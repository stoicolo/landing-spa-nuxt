import axios from 'axios';
import PageTemplateService from '~/services/page_template';

export default defineNuxtPlugin((nuxtApp) => {
  // Configuración base de Axios
  axios.defaults.baseURL = PageTemplateService.baseURL;

  let refreshToken = null;

  // Interceptor de solicitud
  axios.interceptors.request.use(
    (config) => {
      if (process.client) {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        // Obtenemos el refreshToken aquí para asegurarnos de que esté disponible en el cliente
        refreshToken = localStorage.getItem('refreshToken');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta
  axios.interceptors.response.use(
    (response) => {
      console.log('Response:::::', response);
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401 && process.client) {
        debugger;
        // Token expirado o inválido
        try {
          const response = await axios.post('/auth/refresh-tokens', {
            refreshToken: refreshToken,
          });

          if (response.data && response.data.user && response.data.tokens) {
            // Save auth token to localStorage
            localStorage.setItem('accessToken', response.data.tokens.access.token);

            // Retry the original request with the new token
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.tokens.access.token}`;
            return axios(originalRequest);
          } else {
            // Si no se recibieron los tokens esperados, redirigir al login
            redirectToLogin();
          }
        } catch (refreshError) {
          console.error("Error getting refresh access token: ", refreshError);
          if (axios.isAxiosError(refreshError) && refreshError.response) {
            // Si el servidor respondió que el refresh token no fue encontrado, redirigir al login
            if (refreshError.response.status === 404 || 
                (refreshError.response.data && refreshError.response.data.message === 'Refresh token not found')) {
              redirectToLogin();
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );

  // Función para redirigir al login
  const redirectToLogin = () => {
    if (process.client) {
      // Limpiar tokens del localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Redirigir al login
      window.location.href = '/login'; // O usa el router de Nuxt si prefieres
    }
  };

  return {
    provide: {
      axios: axios
    }
  };
});