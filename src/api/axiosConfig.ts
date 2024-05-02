import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { useAuth0 } from '@auth0/auth0-vue';

// Access the base URL from Vite's environment-specific configuration
const baseURL = import.meta.env.API_BASE_URL;

let apiClient: AxiosInstance | undefined = undefined;

export const initApiClient = async () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  let accessToken = '';
  try {
    accessToken = await getAccessTokenSilently();
  } catch (error: any) {
    if (error.error !== 'login_required') {
      throw error;
    }
  }

  const axiosConfig: CreateAxiosDefaults = {
    baseURL: baseURL, // Use the dynamically assigned base URL
  };

  if (isAuthenticated.value && accessToken) {
    axiosConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  apiClient = axios.create(axiosConfig);
};

export const getApiClientInstance = async () => {
  if (!apiClient) {
    await initApiClient();
  }

  return apiClient as AxiosInstance;
};
