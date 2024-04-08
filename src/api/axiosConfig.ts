import axios from 'axios';

// Access the base URL from Vite's environment-specific configuration
const baseURL = import.meta.env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL, // Use the dynamically assigned base URL
});

export { apiClient };
