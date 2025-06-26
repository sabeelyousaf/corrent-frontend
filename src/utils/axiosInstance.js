import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Interceptor to set headers dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const nonAuthenticatedEndpoints = ["/register", "/login"];
    
    // Add token
    if (!nonAuthenticatedEndpoints.includes(config.url)) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    // Automatically set Content-Type if not FormData
    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
