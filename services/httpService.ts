// httpService.ts
import { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { axiosClient, fetchClient } from "./apiClient";
import { jwtDecode } from "jwt-decode";

// Define a custom FetchOptions type that extends RequestInit
type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

interface HttpService {
  get: <T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  patch: <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  delete: <T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;

  getFetch: <T>(url: string, options?: FetchOptions) => Promise<T>;
  postFetch: <T>(
    url: string,
    data?: unknown,
    options?: FetchOptions,
  ) => Promise<T>;
  putFetch: <T>(
    url: string,
    data?: unknown,
    options?: FetchOptions,
  ) => Promise<T>;
  patchFetch: <T>(
    url: string,
    data?: unknown,
    options?: FetchOptions,
  ) => Promise<T>;
  deleteFetch: <T>(url: string, options?: FetchOptions) => Promise<T>;

  setToken: (token: string) => void;
  getToken: () => string | null;
  removeToken: () => void;
  decodeToken: (token: string) => unknown | null;
}

const httpService: HttpService = {
  // Using Axios
  get: (url, config) => axiosClient.get(url, config),
  post: (url, data, config) => axiosClient.post(url, data, config),
  put: (url, data, config) => axiosClient.put(url, data, config),
  patch: (url, data, config) => axiosClient.patch(url, data, config),
  delete: (url, config) => axiosClient.delete(url, config),

  // Using Fetch
  getFetch: (url, options = {}) =>
    fetchClient(url, { method: "GET", ...options }),
  postFetch: (url, data, options = {}) =>
    fetchClient(url, {
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      ...options,
    }),
  putFetch: (url, data, options = {}) =>
    fetchClient(url, {
      method: "PUT",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      ...options,
    }),
  patchFetch: (url, data, options = {}) =>
    fetchClient(url, {
      method: "PATCH",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      ...options,
    }),
  deleteFetch: (url, options = {}) =>
    fetchClient(url, { method: "DELETE", ...options }),

  // Token management
  setToken: (token) => {
    localStorage.setItem("access_token", token);
  },

  getToken: () => {
    return localStorage.getItem("access_token");
  },

  removeToken: () => {
    localStorage.removeItem("access_token");
  },

  decodeToken: (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  },
};

export default httpService;
