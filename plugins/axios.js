import axios from 'axios';
import PageTemplateService from '~/services/page_template';
import { useCurrentStore } from '~/stores/current';

export default defineNuxtPlugin((nuxtApp) => {
  // Configuración base de Axios
  axios.defaults.baseURL = PageTemplateService.baseURL;
  const currentStore = useCurrentStore();

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    
    failedQueue = [];
  };

  // Interceptor de solicitud
  axios.interceptors.request.use(
    (config) => {
      if (process.client) {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
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
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry && process.client) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          }).then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = sessionStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          isRefreshing = false;
          redirectToLogin();
          return Promise.reject(error);
        }

        try {
          const response = await axios.post('/auth/refresh-tokens', {
            id: currentStore.userId,
            refreshToken: refreshToken,
          }, { _retry: true }); // Add this flag to avoid intercepting this specific request

          if (response.data.access && response.data.access.token && response.data.refresh.token) {
            localStorage.setItem('accessToken', response.data.access.token);
            sessionStorage.setItem('refreshToken', response.data.refresh.token);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access.token;
            
            processQueue(null, response.data.access.token);
            return axios(originalRequest);
          } else {
            processQueue(new Error('Failed to refresh token'), null);
            redirectToLogin();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          redirectToLogin();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  const redirectToLogin = () => {
    if (process.client) {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  };

  return {
    provide: {
      axios: axios
    }
  };
});