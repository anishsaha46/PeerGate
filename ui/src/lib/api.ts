import axios from 'axios';

// Create an axios instance with the base URL pointing to our backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle file uploads
apiClient.interceptors.request.use((config) => {
  // Don't set Content-Type for FormData, let the browser set it with the correct boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

export default apiClient;
