import axios, { AxiosInstance } from 'axios';
import { useAuth0 } from '@auth0/auth0-vue';

// Access the base URL from Vite's environment-specific configuration
const baseURL = import.meta.env.API_BASE_URL;

let apiClient: AxiosInstance | undefined = undefined;

export const getApiClientInstance = async () => {
  if (!apiClient) {
    const { getAccessTokenSilently } = useAuth0();
    const accessToken = await getAccessTokenSilently();

    apiClient = axios.create({
      baseURL: baseURL, // Use the dynamically assigned base URL
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });    
  }

  return apiClient!;
};