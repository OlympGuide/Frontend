import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-vue';

// Access the base URL from Vite's environment-specific configuration
const baseURL = import.meta.env.API_BASE_URL;

export const apiClient = async () => {
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = await getAccessTokenSilently();
  console.log(accessToken);

  return axios.create({
    baseURL: baseURL, // Use the dynamically assigned base URL
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
