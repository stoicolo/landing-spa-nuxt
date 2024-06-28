import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.example.com";

// Axios client
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in requests
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Fetch client
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const fetchClient = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem("access_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export { axiosClient, fetchClient };
