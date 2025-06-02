// src/services/api.ts
import axios, { type AxiosResponse } from "axios";
import { sessionTokenManager } from "../utils/sessionToken";

// Configure base URL
const API_BASE_URL = "https://dev.backend-api.goldady.com/user-api";

const { getToken } = sessionTokenManager();

const token = getToken();
// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Session token management
const getSessionToken = (): string => {
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    // Generate new 64-character hex token if not exists
    const newToken = generateSessionToken();
    localStorage.setItem("sessionToken", newToken);
    return newToken;
  }
  return token;
};

const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

// Request interceptor to add token
apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) {
    config.params = {
      ...config.params,
      token: token,
    };
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    // Handle errors
    const errorMessage =
      error.response?.data?.message || error.message || "Request failed";

    // You can add specific status code handling here
    if (error.response?.status === 401) {
      // Handle unauthorized (though token should always exist)
      console.error("Session error:", errorMessage);
    }

    return Promise.reject(errorMessage);
  }
);

export interface cartItems {
  bar_id: string;
}
// API methods
const api = {
  get: <T>(url: string, params?: object): Promise<T> =>
    apiClient.get(url, { params }),

  post: <T>(url: string, data: cartItems): Promise<T> =>
    apiClient.post(url, "", { params: { bar_id: data.bar_id, action: data.action } }),

  // Add other methods if needed
  delete: <T>(url: string): Promise<T> => apiClient.delete(url),
};

export default api;
